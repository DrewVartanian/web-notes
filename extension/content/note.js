GLOBALS_WEB_NOTES.buildNote = function(note,team){
    var self = this;
    var $thisNote = $('<div></div>');

    var colors = ['yellow','red', 'pink', 'white', 'green', 'blue', 'orange', 'purple'];
    $thisNote.attr({
        // 'class': 'webnote',
        'id': note._id,
        'data-team-name': team.name,
        'data-team-id': team._id,
        'color': colors
    });
    $thisNote.addClass( "web-notes-id-class" );

    $thisNote.css({
        'padding': '10px',
        'background-color': note.color,
        'left': note.position.x+'px',
        'top': note.position.y+'px',
        'height': note.size.y+'px',
        'width': note.size.x + 'px',
        'zIndex': 2147483647,
        'position': 'absolute',
        'box-sizing': "border-box",
        'font-family': 'Gloria Hallelujah',
        'font-size': '15px',
         // '-moz-transform': 'rotate(4deg)',
         //  '-webkit-transform': 'rotate(4deg)',
         // '-o-transform': 'rotate(4deg)',
         // '-ms-transform': 'rotate(4deg)',
         //  'transform': 'rotate(4deg)',
        'box-shadow': '0px 4px 6px #333',
        '-moz-box-shadow': '0px 4px 6px #333',
        '-webkit-box-shadow': '0px 4px 6px #333',
        'opacity': '0.8'
    });


    $thisNote.draggable({
        cursor: 'move',
        //type: 'rotation',
         //revert: true
        // drag: function(event, ui){
        // var rotateCSS = 'rotate(' + ui.position.left + 'deg)';

        // $(this).css({
        //  '-moz-transform': rotateCSS,
        // '-webkit-transform': rotateCSS
        // });
        });
//     iconURL = chrome.extension.getURL("/icons/rotate-symbol.png");

//     var $rotateSym = $('<div></div>');
//     $rotateSym.appendTo($thisNote).attr('id','handle').css({
//     //'position': 'absolute',
//     'height': 16,
//     'width': 16,
//     'cursor': 'pointer',
//     'left': 2 + 'px',
//     'bottom': 2 + 'px',
//     'background-image': `url("${iconURL}")`
//     });

//     // var imgURL = chrome.extension.getURL("http://www.fontsaddict.com/images/icons/png/5002.png");
//     // document.getElementById("handle").src = imgURL;

//     $rotateSym.draggable({
//     handle: '#handle',
//     opacity: 0.01,
//      helper: 'clone',
//     drag: function(event, ui){
//         var rotateCSS = 'rotate' + ui.position.left + 'deg)';
//         $(this).parent().css({
//             '-moz-transform': rotateCSS,
//             '-webkit-transform': rotateCSS
//         });
//     }
// });

    $thisNote.resizable({
         minWidth: 200,
         minHeight: 200,
         //alsoResize: "#noteform"
         });

    $thisNote.mouseup(function() {
        //save position here

        console.log("this.position() ", $(this).position());
        console.log("original note position", note.position);
        console.log("attempting to save the position");
        // console.log("event.x and event.y", event.x, event.y);
        // $thisNote.css({
        //     'offset.left':  event.x + "px",
        //     'offset.top': event.y+'px'
        // });
        // console.log("what is note?", note);
        note.position.x = $(this).position().left;
        note.position.y = $(this).position().top;
        self.saveNotePosition(note, team);
    });

    $('body').append($thisNote);
    return $thisNote;
};

GLOBALS_WEB_NOTES.renderNote = function(note,team)
{
    console.log("renderNote", note, team);
    var self = this;
    var $thisNote = this.buildNote(note,team);
    var message = note.message ? note.message : "";
    $thisNote.html(message);
    $thisNote.click(function(){
        console.log("clicked renderNote");
        self.unrenderNote(note._id);
        self.renderNoteForm(note,team);
    });

};

GLOBALS_WEB_NOTES.renderNoteForm = function(note,team)
{
    console.log("renderNoteForm");
    var self = this;
    var $thisNote = this.buildNote(note,team);
    var $form = $('<form></form>');
    $form.css({
        'width': '95%',
        'height': '90%'
    });
    // $form.attr({
    //     'class': 'webnote colors'
    // });
    var $messageInput = $('<textarea></textarea>');
    //  $messageInput.attr({
    //     'id': 'noteform'
    // });
    $messageInput.attr('rows','10');
    $messageInput.css({
        'width': '100%',
        'height': '80%',
        'resize': 'none',
        'backgroundColor': $thisNote.css('backgroundColor'),
        'border-style': 'none',
        'box-sizing': "border-box",
    });

    var message = note.message ? note.message : "";
    $messageInput.html(message);
    var $teamSelect = $('<select></select>');
    $teamSelect.css({
        // 'class': 'webnote',
        //'padding': '5px 8px',
        'width': '37%',
         'height': '15%',
        'border': 'none',
        'box-shadow': 'none',
        'background': 'transparent',
        '-webkit-appearance': 'none',
        'text-align': 'center'
        // 'border': '2px solid purple',
        //  'width': '200px;',
        // '-webkit-border-radius': '5px',
        // '-moz-border-radius': '5px',
        // 'border-radius': '5px'
    });
    // $teamSelect.attr("id", "selectTeam");
    var $optionCurrent = $('<option></option>');
    $optionCurrent.attr('value', team._id);
    $optionCurrent.html(team.name);
    $teamSelect.append($optionCurrent);
    GLOBALS_WEB_NOTES.teamList.forEach(function(teamOp){
        if(teamOp._id===team._id) return;
        var $option = $('<option></option>');
        $option.css({
            // 'class': 'webnote',
            'display': "inline-block"
        });
        $option.attr('value', teamOp._id);
        $option.html(teamOp.name);
        $teamSelect.append($option);
    });
   //color
   var colors = ['yellow','red', 'pink', 'white', 'green', 'blue', 'orange', 'purple'];
    var $colorSelect = $('<select></select>');
    $colorSelect.css({
        'class': 'colors',
        'width': '37%',
        'height': '15%',
        // 'border-style': 'solid',
        // 'border-color': 'black',
        'box-shadow': 'none',
        'background': 'transparent',
        '-webkit-appearance': 'none',
        'text-align': 'center'
    });
    $colorSelect.attr("id", "selectColor");
    colors.forEach(function(color){
        var $optionColor = $('<option></option>');
        $optionColor.css({
            // 'class': 'colors',
             'value': note.color,
             'selected': note.color,
             'display': "inline-block"
        });
        $optionColor.attr('value', color);
        $optionColor.html(color);
        $colorSelect.append($optionColor);
    });


    var $buttonSave = $('<button></button>');
    $buttonSave.css({
        'width': '25%',
        'height': '15%',
        '-webkit-appearance': 'push-button',
        'display': "inline-block",
        'text-align': "center"
    });
    $buttonSave.attr('type', 'submit');
    $buttonSave.text('Save');
    $form.submit(function(e){
        console.log("height and weight is",$thisNote.height(),$thisNote.width());
        e.preventDefault();
        self.saveNote(note._id,
            $messageInput.val(),
            {
                x: $thisNote.outerWidth(),
                y: $thisNote.outerHeight()
            },
            $("#selectColor option:selected").html(),
            {
                _id: $teamSelect.val(),
                // to debug
                name: $("#selectTeam option:selected").html()
            },
            team);
    });

//$teamSelect.option($teamSelect.selectedIndex).html()



    var $buttonCancel = $('<button></button>');
    // $buttonCancel.attr("'class': 'webnote'");
    $buttonCancel.css('-webkit-appearance','push-$button');
    $buttonCancel.html('Cancel');
    $buttonCancel.click(function(){
        self.unrenderNote(note._id);
        self.renderNote(note,team);
    });
    var $buttonDestroy = $('<button></button>');
    // $buttonDestroy.attr("'class': 'webnote'");
    $buttonDestroy.css('-webkit-appearance','push-$button');
    $buttonDestroy.html('Destroy');
    $buttonDestroy.click(function(){
        self.destroyNote(note._id);
    });
    $form.append($messageInput);
    $form.append($teamSelect);
    $form.append($colorSelect);
    $form.append($buttonSave);
    $thisNote.append($buttonCancel);
    $thisNote.append($buttonDestroy);


    $thisNote.append($form);
};

GLOBALS_WEB_NOTES.unrenderNote = function(noteId){
    console.log("unrenderNote");

    $('#'+noteId).remove();
};

GLOBALS_WEB_NOTES.destroyNote = function(noteId){
    var self = this;
    chrome.runtime.sendMessage({title: "destroyNote",noteId: noteId},function(confirmation){
        if(confirmation==='deleted'){
            self.unrenderNote(noteId);
        }
    });
};

GLOBALS_WEB_NOTES.saveNotePosition = function(note, team){
    var self = this;
    console.log("note.position saveNotePosition ", note.position);
    chrome.runtime.sendMessage({
        title: "saveNotePosition",
        noteId: note._id,
        position: note.position,
        team: team._id
    });

};


GLOBALS_WEB_NOTES.saveNote = function(noteId, message, size, color, newTeam, oldTeam){
    var self = this;
    chrome.runtime.sendMessage({
        title: "saveNote",
        noteId: noteId,
        size: size,
        color: color,
        message: message,
        newTeam: newTeam._id,
        oldTeam: oldTeam._id
    },function(changedNote){
        console.log(changedNote);
        self.unrenderNote(noteId);
        self.renderNote(changedNote,newTeam);
    });
};

GLOBALS_WEB_NOTES.clearNotes = function(noteId){
    $('.web-notes-id-class').remove();
};
