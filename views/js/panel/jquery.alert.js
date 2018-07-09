(function($){

    $.alert = function(params){
	console.log('?');

        var buttonHTML = '';
        $.each(params.buttons,function(name,obj){
            // Generating the markup for the buttons:
            buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'<span></span></a>';
        });

        var markup = [
            '<div id="confirmOverlay">',
            '<div id="confirmBox">',
            '<p>',params.message,'</p>',
            '<div id="confirmButtons">',
            buttonHTML,
            '</div></div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        var buttons = $('#confirmBox .button'),
            i = 0;

        $.each(params.buttons,function(name,obj){
	    
            buttons.click(function(){

                // Calling the action attribute when a
                // click occurs, and hiding the confirm.

                $.alert.hide();
                return false;
            });
        });
    }

    $.alert.hide = function(){
        $('#confirmOverlay').fadeOut(function(){
            $(this).remove();
        });
    }

})(jQuery);
