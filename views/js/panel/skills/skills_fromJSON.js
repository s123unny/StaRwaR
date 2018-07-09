skilltree.fromJSON = function (jsonObject, parentElement) {
	var group_parentElement = false;
    for (var id in jsonObject) {

        var elem = jsonObject[id];
        var node = skill(id);
        if (typeof elem.hint != 'undefined') {
            for (var idx in elem.hint) {
                var temp = elem.hint[idx];
                if (temp.type == 'raw')node.hintBody(temp.text);
                else node.hint(temp.text, temp.level);

            }
        }

        if (typeof elem.name != 'undefined')node.name(elem.name);
        if (typeof elem.max != 'undefined')node.max(elem.max);
        if (typeof elem.nohint != 'undefined')node.nohint(elem.nohint);
        if (typeof elem.sprite != 'undefined')node.sprite(elem.sprite[0], elem.sprite[1]);
        if (typeof elem.sprites != 'undefined')node.sprites(elem.sprites);
        if (typeof elem.pos != 'undefined')node.pos(elem.pos[0], elem.pos[1]);
        if (typeof elem.current != 'undefined')node.current(elem.current);
        if (typeof elem.mustHave != 'undefined')node.mustHave(elem.mustHave);
        if (typeof elem.dependency != 'undefined')node.dependency(elem.dependency);
		if (typeof elem.mustNotHave != 'undefined')node.mustNotHave(elem.mustNotHave);
        if (typeof elem.className != 'undefined')for (var idx in elem.className)node.className(elem.className[idx]);
        if (typeof elem.param != 'undefined')for (var idx in elem.param)node.param(idx, elem.param[idx]);
        if (typeof elem.abbr != 'undefined')node.abbr(elem.abbr);
        if (typeof elem.abbr_color != 'undefined')node.abbr_color(elem.abbr_color);
        if (typeof elem.group != 'undefined'){
			node.group(elem.group);
			group_parentElement = elem.group;
			if ( !$( "#" + group_parentElement ).length ) {
				$( "#st" ).append( '<div id="' + group_parentElement + '" class="skill_group"><h2>'+group_parentElement+'</h2></div>' );
			}
			parentElement = $( '#' + group_parentElement);
		}
		if (typeof elem.group_dependency != 'undefined')node.group_dependency(elem.group_dependency);
		if (typeof elem.unavailable != 'undefined')node.unavailable(elem.unavailable);
		if (typeof elem.subgroup != 'undefined')node.subgroup(elem.subgroup);
		
        node.$(parentElement);
    }
    return this;
};

//TODO: Add abbr

skilltree.buildFromJSON = function(url,parentElement){

    if(typeof url == "object")
        skilltree.fromJSON(url, parentElement).init(parentElement);

    $.getJSON(url)
        .done(function( jsonObject ) {
            skilltree.fromJSON(jsonObject, parentElement).init(parentElement);
        })
        .fail(function( jqxhr, textStatus, error ) {
            console.error( "JSON request Failed: " + textStatus + ", " + error );
        }
    );

};

skilltree.buildJSONOfElement = function(element){
    var json = {};

    ['name','max','sprite','current','mustHave', 'mustNotHave','abbr','abbr_color','group','subgroup','unavailable'].forEach(function(el){
        if(element.attr(el))json[el]=element.attr(el);
    });

    var hints = skilltree.buildHintsOfElement(element);
    if(hints)json.hint=hints;

    var spriteObj = skilltree.buildObjFromString(element.attr('sprites'));
    if(spriteObj)json.sprites=spriteObj;

    var depObj = skilltree.buildObjFromString(element.attr('dependency'));
    if(depObj)json.dependency=depObj;

    json.pos=[element.offset().left - parseInt(element.css('margin-left')),element.offset().top - parseInt(element.css('margin-top'))];

    return json;
};

skilltree.buildHintsOfElement = function (element) {
    var paragraphs = $(element).find('div p');
    if(typeof paragraphs[0]!='undefined'){
        var hints = [];
        paragraphs.each(function(){
            var hint = {text:$(this).html()};
            var l = $(this).attr('showlevel');
            if(l)hint.level=l;
            hints.push(hint);
        });
        return hints;
    }
    return false;
};

skilltree.buildObjFromString = function(str){
    if(typeof str == 'undefined')return false;
    try {
        eval('var evalResult = {' + str + '}');
    }
    catch(e){
        return false;
    }
    return evalResult;
};

skilltree.buildJSON = function(element){
    if(typeof element == 'undefined')element = $('body');
    var json = {};
    element.find('.skill').each(function(el){
        json[$(this).attr('id')] = skilltree.buildJSONOfElement($(this));
    });
    return json;
};