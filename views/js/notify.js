(function($){

    $.confirm = function(params){
	console.log('?');

        //if($('#confirmOverlay').length){
            // A confirm is already shown on the page:
        //    return false;
        //}

        var buttonHTML = '';
        $.each(params.buttons,function(name,obj){

            // Generating the markup for the buttons:

            buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>';

            if(!obj.action){
                obj.action = function(){};
            }
        });

        var markup = [
            '<div id="confirmOverlay">',
            '<div id="confirmBox">',
            '<h1>',params.title,'</h1>',
            '<p>',params.message,'</p>',
            '<div id="confirmButtons">',
            buttonHTML,
            '</div></div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        var buttons = $('#confirmBox .button'),
            i = 0;

        $.each(params.buttons,function(name,obj){
            buttons.eq(i++).click(function(){

                // Calling the action attribute when a
                // click occurs, and hiding the confirm.

                obj.action();
                $.confirm.hide();
                return false;
            });
        });
    }

    $.confirm.hide = function(){
        $('#confirmOverlay').fadeOut(function(){
            $(this).remove();
        });
    }

})(jQuery);

(function($){

    $.notify = function(params){
    console.log('?');

        //if($('#confirmOverlay').length){
            // A confirm is already shown on the page:
        //    return false;
        //}

        var buttonHTML = '';
        $.each(params.buttons,function(name,obj){

            // Generating the markup for the buttons:

            buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>';

            if(!obj.action){
                obj.action = function(){};
            }
        });

        var markup = [
            '<div id="AdminBox">',
            '<h1>',params.title,'</h1>',
            '<p>',params.message,'</p>',
            '<div id="AdminButtons">',
            buttonHTML,
            '</div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        var buttons = $('#AdminBox .button'),
            i = 0;

        $.each(params.buttons,function(name,obj){
            buttons.eq(i++).click(function(){

                // Calling the action attribute when a
                // click occurs, and hiding the confirm.

                obj.action();
                $.notify.hide();
                return false;
            });
        });
    }

    $.notify.hide = function(){
        $('#AdminBox').fadeOut(function(){
            $(this).remove();
        });
    }

})(jQuery);

// for five team
socket.on('notify', (msg)  => addNotifyAlert(msg));

// for admin
socket.on("adminStartButton", () => Admin_Notify("Night is coming"));
socket.on("adminDayButton", () => Admin_Notify("New day is coming"));

function addNotifyAlert(msg) {
    console.log("enable start button");
	$.confirm({
	    'message'   : msg,
	    'buttons'   : {
		'Got it'    : {
		    'class' : 'no_option',
		    'action': function(){return;}
            }
	    }
	});
}

function Admin_Notify(msg) {
    console.log("enable day start button");
	$.notify({
	    'message'   : msg,
	    'buttons'   : {
		'GO'    : {
		    'class' : 'no_option',
		    'action': function(){
                if (msg == "New day is coming"){
                    console.log('admin say day start');
                    socket.emit("adminDay");
                }
                else{
                    console.log('admin say night is coming');
                    socket.emit("adminSayStart");
                }

			}
		}
	    }
	});
}
