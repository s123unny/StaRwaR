var skillsEditor={

    draggables:[],
    currentElement:null,
    selectedElement:null,
    startPoint:{x:0,y:0},
    panel:null,
    grid:false,
    /**
     * The function that initializes the editor. Should be called once on page load.
     */


    initDrag:function(){
        this.draggables = $('[draggable]');
        this.draggables.each(function(){
            this.onmousedown=skillsEditor.startDrag; // Making sure the drag event is only one.
        });
    },

    newnode_dialog:null,
    init:function(){

        this.initDrag();

        $(window)
            .on('mousedown',skillsEditor.unselect)
            .on('mouseup',skillsEditor.stopDrag)
            .on('mousemove',skillsEditor.drag);

        $('#jsonimport').on('mousedown',function(e){
            e.stopPropagation();
            console.log('Import');
        });

        $('#jsonexport').on('mousedown',function(e){
            e.stopPropagation();
            $('#copypaste').show().find('#values').html(JSON.stringify(skilltree.buildJSON()));
        });

        $('#copypaste').on('mousedown',function(e){e.stopPropagation();});

        $('#creanode').on('mousedown',function(e){
            e.stopPropagation();
            var newnode_dialog = $('#creanode_dialog');
            var id_field = newnode_dialog.find('#new_node_id').val('')[0];
            var title_field = newnode_dialog.find('#new_node_name').val('')[0];
            var err = newnode_dialog.find('.err').html('');

            newnode_dialog.each(function(){
                $(this).find('#new_node_cancel').on('click',function(){newnode_dialog.hide();});



                    $(this).find('#new_node_create').on('click',function(){



                        if(typeof $('[skillid='+id_field.value+']')[0]!='undefined'){
                            err.html('Node with same ID ('+id_field.value+') already exists.');
                        }
                        else if(title_field.value == '' || id_field.value==''){
                            err.html('Both name and id are required');
                        }
                        else{
                            skillsEditor.create_node(id_field.value,title_field.value);
                            newnode_dialog.hide();
                        }

                    })
                })
            .show();
        });


        $('#delnode').on('mousedown',function(e){
            e.stopPropagation();
            if(confirm('Delete the '+skillsEditor.selectedElement.attr('id')+' node?')){
                skillsEditor.del();
            }
        });

        // -- Sprite selection panel

        skillsEditor.spritePanel = $('#sprite_selector').hide();
        skillsEditor.spritePanel.e={
            area:skillsEditor.spritePanel.find('.area')[0],
            selector:skillsEditor.spritePanel.find('.selector'),
            appl:skillsEditor.spritePanel.find('a')[0]
        };

        skillsEditor.spritePanel.e.appl.onmousedown = function(e){
            e.stopPropagation();
            skillsEditor.spritePanel.hide();
            skillsEditor.spritePanel.activeSprite.attr('sprite-x',skillsEditor.spritePanel.e.x).attr('sprite-y',skillsEditor.spritePanel.e.y);

            skillsEditor.selectedElement.attr('sprite',skillsEditor.spritePanel.e.x+'x'+skillsEditor.spritePanel.e.y).removeClass('nosprite');
            skilltree.render(skillsEditor.selectedElement);
            skillsEditor.drawSpriteCell(skillsEditor.spritePanel.activeSprite);
        };

        skillsEditor.spritePanel.e.area.onmousedown = function(event){
            event.stopPropagation();

            var coords = $(this).offset();

            var x = Math.floor((event.clientX-coords.left)/$(this).width()*10);
            var y = Math.floor((event.clientY-coords.top)/$(this).height()*10);
            $.extend(skillsEditor.spritePanel.e,{x:x,y:y});

            skillsEditor.spritePanel.e.selector.css({left:(x*10)+'%',top:(y*10)+'%'});
            $(skillsEditor.spritePanel.e.appl).html('Ok ('+x+'x'+y+')');

        };

        // -- Option panel definition

        skillsEditor.panel = $('#propanel');

        skillsEditor.panel.e = {
            title:$('#title'),
            id:$('#elid'),
            abbr:$('#abbr'),
            hints:$('#hints'),
            sprite:$('#sprite_image')
        };

        skillsEditor.panel.on('mousedown',function(event){
            event.stopPropagation();
        });

        skillsEditor.panel.e.sprite.on('mousedown',function(){
            skillsEditor.spritePanel.activeSprite = $(this);
            skillsEditor.spritePanel.show();
        });

        skillsEditor.unselect();

        var showgrid = $('#showgrid');
        skillsEditor.grid=showgrid[0].checked;
        $('#grid').toggle(skillsEditor.grid);
        showgrid.change(function(){skillsEditor.grid=this.checked;$('#grid').toggle(this.checked)});

    },
    del:function(){
        skillsEditor.selectedElement.remove();
        skillsEditor.unselect();
        skilltree.renderAll();
    },

    create_node:function(id,title){
        var new_node = new skill(id).name(title).pos(20,20).param('draggable','draggable').$();
        skilltree.generateAbbr(new_node);
        skilltree.render(new_node);
        new_node[0].onmousedown=skillsEditor.startDrag;
    },

    dragLocked:true,

    /**
     * An event that is fired when any element is started being clicked
     * @param event The mouse event
     */

    startDrag:function(event){

        event.stopPropagation();
        event.preventDefault();

        if(skillsEditor.currentElement!=null){
            skillsEditor.stopDrag();
            return;
        }

        // Preventing node movement on selection

        skillsEditor.dragLocked = true;
        setTimeout(function(){skillsEditor.dragLocked=false;},200);

        skillsEditor.unselect();
        skillsEditor.select($(this));

        skillsEditor.currentElement = $(this).css({'z-index':100000,'position':'absolute'});
        skillsEditor.startPoint = {
            x:event.clientX - this.offsetLeft,
            y:event.clientY - this.offsetTop
        };
    },

    /**
     * The function that is triggered when the element is dragged
     * @param event Mouse event
     */
    drag:function(event){
        if(skillsEditor.currentElement==null || skillsEditor.dragLocked)return;

        var c = {
            x:event.clientX - skillsEditor.startPoint.x,
            y:event.clientY - skillsEditor.startPoint.y
        };
        if(skillsEditor.grid){c={
            x:skillsEditor.okr(c.x,10),
            y:skillsEditor.okr(c.y,10)
        }}

        skillsEditor.currentElement.css({
            left: c.x + 'px',
            top: c.y+'px'
        });

    },

    /**
     * The function that is triggered when the mouse is released
     */
    stopDrag:function(){
        if(skillsEditor.currentElement==null)return;
        skillsEditor.currentElement.css('z-index','');
        skillsEditor.currentElement=null;
    },

    /**
     * The function that selects new element
     * @param element jQuery object - an element to select
     */
    select:function(element){
        skillsEditor.selectedElement = element;
        skillsEditor.selectedElement.addClass('selected');

        skillsEditor.panel.show();

        var elementData = skilltree.buildJSONOfElement(element);

        skillsEditor.panel.e.title.val(element.attr('name'));
        skillsEditor.panel.e.id.val(element.attr('id'));
        skillsEditor.panel.e.abbr.val(element.attr('abbr'));

        console.log(elementData);

        skillsEditor.panel.e.hints.html('<label for="hints">Sprite hint</label><div class="group">No hints set <a href="#" onclick="skillsEditor.newHint()">(Add New)</a></div>');
        if(elementData.hint) {
            skillsEditor.panel.e.hints.html('<label for="hints">Hints <a onclick="skillsEditor.newHint();">Add New</a> </label>');
            elementData.hint.forEach(function (e) {
                var lvl = e.level;
                if(lvl==undefined)lvl='';
                skillsEditor.panel.e.hints.append('<div class="group"><label>Levels</label><input type="text" value="' + lvl + '"><label>Hint text</label><textarea>'+e.text+'</textarea></div>');
            });
        }

        if(elementData.sprites){
            for(var lvl in elementData.sprites){
                console.log(elementData.sprites[lvl]);
            }
        }

        $('#delnode').show();
    },

    /**
     * The function that is triggered when no-element is clicked
     * @param event Mouse event
     */
    unselect:function(event){
        if(skillsEditor.selectedElement) {
            skillsEditor.selectedElement.removeClass('selected');
            skillsEditor.selectedElement = null;
        }
        skillsEditor.spritePanel.hide();
        $('#copypaste').hide();
        $('#delnode').hide();
        skillsEditor.panel.hide();
    },

    newHint:function(){
        console.log('Hey');
    },

    /**
     * The function that draws ('renders') sprite cell background
     * @param element jQuery object element
     */
    drawSpriteCell: function (element) {
        var x = element.attr('sprite-x');
        var y = element.attr('sprite-y');
        if(!x || !y)return;
        element.css('background','url("../sprite.jpg") '+skilltree.getSpriteBackgroundPosition(x,y))
    },

    /**
     * The function rounds num to base of to
     * @param num
     * @param to
     * @returns {number}
     */
    okr:function(num,to){
        return Math.round(num/to)*to;
    }
};