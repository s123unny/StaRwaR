//'skillsAfterRender'

skilltree.toURL = function(json){
    var urlString = '';
    for(name in json){
        urlString+=name+json[name];
    }
    location.hash=urlString;
}

skilltree.buildJsonFromString = function(url){
    var json={};
    names = url.split(/[0-9]+/g);
    var objnumber=0;
    url.replace(/[0-9]+/g,
        function(number,pos,url){
            json[names[objnumber]] = number;
            objnumber++;
        }
    );
    return json;
}

$(document).on('skillsAfterChange',function(that){

    skilltree.toURL(JSON.parse(skilltree.export()));

});

$(document).on('skillsAfterInit',function(that){

    skilltree.import(skilltree.buildJsonFromString(location.hash.substr(1)));

});