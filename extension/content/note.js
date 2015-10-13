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
        'opacity': '0.8',
        'white-space': 'pre-wrap',
        'word-wrap': 'break-word'
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
        // handles: 'se'
        //alsoResize: "#noteform"
    });

    // var resizeIcon = chrome.extension.getURL("/icons/resize.png");
    // var $buttonResize = $('<div></div>');
    // $buttonResize.addClass('ui-resizable-handle ui-resizable-se');
    // $buttonResize.css({
    //     'height': '30px',
    //     'width': '30px',
    //     'cursor': 'se-resize',
    //     'background': 'url('+resizeIcon+')',
    //     'position': 'absolute',
    //     'right': '-15px',
    //     'bottom': '-15px',
    //     // 'display': 'none'
    // });
    // $thisNote.hover(function() {
    //     $buttonResize.css({'display': 'block'});
    // }, function() {
    //     $buttonResize.css({'display': 'none'});
    // });
    // $thisNote.append($buttonResize);


    $thisNote.mouseup(function() {
        // console.log("this.position() ", $(this).position());
        // console.log("original note position", note.position);
        // console.log("attempting to save the position");
        // console.log("event.x and event.y", event.x, event.y);
        // $thisNote.css({
        //     'offset.left':  event.x + "px",
        //     'offset.top': event.y+'px'
        // });
        // console.log("what is note?", note);
        console.log("original size", note.size.x, " ", note.size.y);
        console.log("new size", $(this).outerWidth(), " ", $(this).outerHeight());

        note.size.x = $(this).outerWidth(),
        note.size.y = $(this).outerHeight(),
        note.position.x = $(this).position().left;
        note.position.y = $(this).position().top;
        self.saveNoteSizePosition(note, team);
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
    // console.log(message);
    $thisNote.html('<span>'+message+'</span>');
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
        'background-color': $thisNote.css('background-color'),
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
    $teamSelect.attr("id", "selectTeam");
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
        'border-style': 'none',
        // 'border-color': 'black',
        'box-shadow': 'none',
        'background': 'transparent',
        '-webkit-appearance': 'none',
        'text-align': 'center'
    });
    $colorSelect.attr("id", "selectColor");
    var $colorCurrent = $('<option></option>');
    $colorCurrent.attr('value', note.color);
    $colorCurrent.html(note.color);
    $colorSelect.append($colorCurrent);
    colors.forEach(function(color){
        if(color===note.color) return;

        var $optionColor = $('<option></option>');
        $optionColor.css({
            // 'class': 'colors',
             // 'value': note.color,
             // 'selected': note.color,
             'display': "inline-block"
        });
        $optionColor.attr('value', color);
        $optionColor.html(color);
        $colorSelect.append($optionColor);
    });


    var saveIcon = chrome.extension.getURL("/icons/save.png");
    var $buttonSave = $('<button></button>');
    $buttonSave.css({
        'height': '30px',
        'width': '30px',
        'cursor': 'pointer',
        'background': 'url('+saveIcon+')',
        'border': '0px',
        'position': 'absolute',
        'right': '15px',
        'bottom': '15px',
        // 'display': 'none'
    });
    $buttonSave.attr('type', 'submit');
    // $thisNote.hover(function() {
    //     $buttonSave.css({'display': 'block'});
    // }, function() {
    //     $buttonSave.css({'display': 'none'});
    // });

    $form.submit(function(e){
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
                name: $("#selectTeam option:selected").html()
            },
            team);
    });

    //$teamSelect.option($teamSelect.selectedIndex).html()
    // unable to get font-awesome to load
    // var $buttonCancel = $('<i class="fa fa-floppy-o"></i>');

    var cancelIcon = chrome.extension.getURL("/icons/cancel.png");
    var $buttonCancel = $('<div></div>');
    // $buttonCancel.attr("'class': 'webnote'");
    $buttonCancel.css({
        // '-webkit-appearance': 'push-$button'
        'height': '30px',
        'width': '30px',
        'cursor': 'pointer',
        'background-image': 'url('+cancelIcon+')',
        'position': 'absolute',
        'right': '55px',
        'bottom': '15px',
    });
    // $buttonCancel.html('Cancel');
    $buttonCancel.click(function(){
        self.unrenderNote(note._id);
        self.renderNote(note,team);
    });

    var deleteIcon = chrome.extension.getURL("/icons/delete.png");
    var $buttonDestroy = $('<div></div>');
    // $buttonDestroy.attr("'class': 'webnote'");
    $buttonDestroy.css({
        // '-webkit-appearance': 'push-$button',
        'height': '30px',
        'width': '30px',
        'cursor': 'pointer',
        'background-image': 'url('+deleteIcon+')',
        'position': 'absolute',
        'left': '-15px',
        'top': '-15px',
        'display': 'none'
    });

    // $buttonDestroy.html('Destroy');
    $buttonDestroy.click(function(){
        self.destroyNote(note._id);
    });

    $thisNote.hover(function() {
        $buttonDestroy.css({'display': 'block'});
    }, function() {
        $buttonDestroy.css({'display': 'none'});
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

GLOBALS_WEB_NOTES.saveNoteSizePosition = function(note, team){
    var self = this;
    chrome.runtime.sendMessage({
        title: "saveNoteSizePosition",
        noteId: note._id,
        position: note.position,
        size: note.size,
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
