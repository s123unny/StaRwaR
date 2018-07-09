(function($){

    $.confirm = function(params){
	console.log('?');

        if($('#confirmOverlay').length){
            // A confirm is already shown on the page:
            return false;
        }

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


socket.on("adminStartButton", adminbutton);
function adminbutton() {
    console.log("enable start button");
	$.confirm({
	    'message'   : "night is coming",
	    'buttons'   : {
		'Start'    : {
		    'class' : 'no_option',
		    'action': function(){
				console.log('admin say start');
				socket.emit("adminSayStart");
			}
		}
	    }
	});
}
