'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var nodemailer = require('nodemailer');
module.exports = router;

var Note = mongoose.model('Note');
var Page = mongoose.model('Page');
var Team = mongoose.model('Team');
var User = mongoose.model('User');


// set req.team
router.param('id', function(req, res, next, id) {
  Team.findById(id).exec()
    .then(function(team) {
      if (!team) throw new Error('Team not found');
      req.team = team;
      next();
    })
    .then(null, next);
});

// GET all users in a team
// api/team/:id/users
router.get('/:id/users', function(req, res, next) {
  console.log("what is req.team", req.team);
  Team.findById(req.team._id)
    .populate('users')
    .then(function(team) {
      res.status(200).json(team);
    })
    .then(null, next);
});

// POST new team
router.post('/', function(req, res, next) {
  console.log("what is post team req body ", req.body);
  Team.create({name: req.body.teamName, users: [req.user._id]})
    .then(function(team) {
        res.status(201).json(team);
    })
    .then(null, next);
});

// PUT update team (name, users)
router.put('/:id', function(req, res, next) {

  console.log("what is the request body", req.body);
  if(req.body.userEmail){
    User.findOne({email: req.body.userEmail}).then(function(user){
    if(!user) {
        console.log('req.body.email:',req.body.userEmail);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'websharepostit@gmail.com',
                pass: 'capstone'
            }
        });
        transporter.sendMail({
            from: 'do-not-reply@webshare.com',
            to: req.body.userEmail,
            subject: req.user.email + ' has added you to team '+ req.body.name + ' on WebShare!',
            html: '<p>Hello '+req.body.userEmail +',</p><p>Have you heard about webShare yet? get the wonderful extension today!</p><p><a href="">insert link to extension here!</a></p>'
        });
        User.create({
          email: req.body.userEmail,
          password: 'default',
          isPending: true
        })
        .then(function(user){
           req.team.users.push(user._id);
           req.team.save()
        .then(function() {
        res.status(201).send("user emailed and created!");
        });
        });
        return;
      } 
    if(user && req.team.users.indexOf(user._id) === -1) req.team.users.push(user._id);
    if(req.body.name) req.team.name = req.body.name;

     //if user does not exist, put invitation to email logic here
      req.team.save()
      .then(function(team) {
        res.status(200).json(team);
      })
      .then(null, next);
    });
  }


  else{
     _.extend(req.team, req.body);  
    req.team.save()
    .then(function(team) {
      res.status(200).json(team);
    })
    .then(null, next);
  }

     
});
  
     
  //})
  //req.team.users.push(req.body.)
  

// DELETE specific team
router.delete('/:id', function(req, res, next) {
  req.team.remove()
    .then(function() {
      res.sendStatus(204);
    })
    .then(null, next);
});

router.delete('/:id/users/:userId', function(req, res, next) {


  var users = req.team.users;
  console.log("what are the users", users);
   console.log("params ", req.params.userId);
  users = users.filter(function(user){
    return user != req.params.userId;
  });


  console.log("what happened to the users after delete", users);
  req.team.users = users;
  req.team.save()
    .then(function() {
      res.status(204).json(req.team);
    })
    .then(null, next);
});


