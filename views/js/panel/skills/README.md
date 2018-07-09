![Funny picture](http://imgs.xkcd.com/comics/manuals.png)

Skills
======

This will be a clickable rpg-like skill/talent tree.

Inspired by [dungeons and developers](http://www.dungeonsanddevelopers.com)

## Requirements

 - jQuery is required
 - also, browsers that support CSS3
 - also, straight hands and cold heart

## Basic Usage

Pretty easy. See index.html for example.

Each skill is a div with "skill" class:

    <div class="skill"></div>

You can add attributes to it - "current" and "max"

    <div class="skill boots" max="3" current="1"></div>

This will produce a skill that is clickable 3 times and already clicked once.

[Optional] You can set skillpoints dependency:
	var skilltree = {
	buttons: '',
	skillpoints_dependency: true,
	skillpoints: 4,

## Sprite

You can set a skill sprite by setting "sprite" parameter like this:

    <div class="skill" sprite="5x7"></div>

Where 5x7 means sixth sprite in eighth row of sprite.jpg file

## Dependant skills

Also you can create skills that are depending on other ones. This can be done easily:

    <div class="skill" skillid="foo"></div>
    <div class="skill" musthave="foo"></div>

In this example there is a skill with id "foo" and the second one, which can be clicked only
if "foo" was clicked

## Advanced dependency

It is possible to make skill level dependant from several other skills levels.

    <div class="skill angel" skillid="quo" max="3" dependency="1:{foo:2,bar:3,baz:1}"></div>

In this example the skill can be upgraded to level 1 only if there is a skill "foo" with at least level 2,
"bar" with at least level 3 and "baz" with at least level 1.

The value is eval-ed, so be careful. Just in case. Also if the syntax is wrong - the object will end up with
no dependency (or with "musthave" one). Note that if there is an advanced dependency defined - the simple,
"musthave" one is ignored.

## Level-dependant sprites

It is possible for each level to have specific sprite. For example:

    <div class="skill" max="3" sprites="0:[2,1],1:[5,6],2:[9,2],3:[4,2]"></div>

## Skill Description

To add a description - simply put another div inside skill item:

    <div class="skill boots">
        <div>
            <h3>Skill name/h3>
            <p>The skill will help you do awesome things!</p>
        </div>
    </div>

Additionally, each element in that div can have "showlevel" attribute - when it is set the
element will be shown only on certain level of skill

    <div class="skill boots">
        <div>
            <h3>Skill name/h3>
            <p showlevel="0">This will be visible only if the skill wasnt upgraded yet</p>
            <p showlevel="1">This will be visible if the skill was already upgraded</p>
        </div>
    </div>

Of course, you can add "max" to the skill and create hints for, say, level 2 or 3 et cetera.

Also note that if you are going to show multiple elements of text on certain level - it is recommended to wrap them
with span. For example:

    <div class="skill">
        <div>
            <h3>jQuery</h3>
            <p>jQuery is a JS library</p>

            <span showlevel=0">
                <p><i>In order to advance with this you must:</i></p>
                <p>Learn JavaScript</p>
                <p>Get an IDE</p>
                <p>Get jQuery</p>
            </span>
        </div>
    </div>

This way you can hint users which skills are required for advancement in something.

## JS Layout generator

Layout generator is used to define trees with JS only. Also, in future, it will be capable of exporting trees as json.
The best way to get how it works is to see the bottom of layout.html file.

To create a skill node - type:

    skill();

This will return an object containing skill node. Of course, you can assign this return to some variable, if you want.
To do so - type one of following:

    var node = skill();
    var node = new skill();

There are two methods to return the node content. First one, "_" , will return it as text:

    var nodetext = skill()._();
    $('body').append(nodetext);

The second one, $, will append (using jQuery) it to element

    skill().$();                // This will append to <body> element of a page
    skill().$('#skilltree');    // This will append node to $('#skilltree');

Next, there are various functions to customize and specify the node behavior. First of all, each node is recommended
to have unique ID. There are two ways to specify an ID of a node:

    skill('node');
    skill().id('node');

Max allows to set the maximum level available

    skill.max(10);

Hint method adds a paragraph of text to help div. The second, optional parameter is level or level rane on which the
paragraph should be shown. For example:

    skill().hint('This skill does something');

    // This one will be shown only on level 0:
    skill().hint('To proceed to level 1 you must first advance another skill',0);

    // This one will be shown on levels 0-9
    skill().max(20).hint('There is nothing to talk about until you are at least level 10','0-9');

HintBody allows to directly add text to hint div.

    skill().hintBody('<span showlevel="0">
                    <h4>Skills required:</h4>
                    <p>- skill1 - level 2</p>
                    <p>- skill2- level 3</p>
                </span>');

Name will set the name of the node and also set the title of the hover hint:

    skill().name('My Awesome Skill');

Pos method will set the node absolute position:

    skill().pos(25,25);

Sprite method will set the sprite image coordinates. See the sprite.jpg. Coordinates are starting from 0.
Sprites method allows to change sprites on specific level and requires object

    skill().sprite(5,0);         // Select sixth sprite in first row
    skill().sprites({3:[6,5]});  // Change sprite to seventh sprite in sixth row

mustHave sets simple dependency and dependency method sets complex dependency. Note that it reieves an object.

    skill.mustHave('otherNode');
    skill.dependency({1:{'otherNode':2},2:{'otherNode':5});

mustNotHave is purely the inverse of mustHave.
	skill.mustNotHave({1:{'otherNode':2},2:{'otherNode':5});

group_dependency: Skill can be dependant from a quantity of selected skills into a group.
	skill.group_dependency({1:{'group1':2},2:{'group2':5});


There is a hint shown in the description for skills which dependency is not met. To disable the hint for the particular
element - use "nohint" property

    skill.nohint();

className adds a class to list of classes (.skill is already there)

    skill.className('theclass');

param sets the parameter for node's html elemenet. Note that "class" and "style" params will be overwritten.

    skill.param('title','The title');

Method calls to the node can be chained:

    skill('spear')
            .pos(200,150)
            .sprite(6,1)
            .max(20)
            .mustHave('melee')
            .name('Spear skill')
            .hint('Spears are awesome')
            .hint('Now you can also throw spear','10-20')
    .$();

## JSON wrapper

There is a way to build a tree automatically with data obtained from JSON:

    $(function(){
        skilltree.buildFromJSON('trees/php.json');
    })

The JSON needs to be valid and to have following format:

    {
        "html":{
            "name":"HTML",
            "max":3,
            "pos":[200,200],
            "hint":[
                {               "text":"All levels see this"},
                {"level":1,     "text":"Only level 1 sees this"},
                {"type":"raw",  "text":"<h4>I am the raw text. I am added without wrapping.</h4>"},
                {               "text":"This is another paragraph"},
                {"level":"1-2", "text":"This one is visible on levels 1-2"}
            ],
            "sprites":{
                "2":[1,0],
                "3":[2,0]
            },
            "className":["test","test2"],
            "param":{"param1":"value"}
        },
        "css":{
            "name":"CSS",
            "max":3,
            "pos":[300,200],
            "sprite":[3,5],
            "hint":[
                {"text":"Cascade Styling Stuff"}
            ],
            "musthave":"html",
            "dependency":{
                "1":{
                    "html":2
                }
            }
        }
    }

Possible JSON values are:

 - name - string
 - max - integer number
 - pos - an [x, y] array
 - group - string
 - hint - an array of objects. Each object have "text" parameter. Additionally it cah have string or integer level OR "type":"raw".
 - sprite - an [x,y] array
 - sprites - an object, each property of which is a number having an [x,y] array value.
 - className - an array of strings
 - param - an name:value object ("param":{"border":"none","title":"Hello"}
 - musthave - a string
 - mustnothave - a string
 - dependency - an level:dependency object, where dependency is "skill id":level object.
 - group dependency - an group level:dependency object, where dependency is "total skills selected in group":level object
 - nohint - true if you dont want autohint to be shown

## Importing and exporting data

There is a way to export the results of "advancement" when you are happy with them:

    skilltree.export();

This will return the JSON string you can import back via skilltree.import() later:

    skilltree.import(jsonObjectSkilltreeExportResult);

Note that only skills that have an id set will be saved. Everything else will be set to 0 on import.

## URL storing

The URL module. When active it allows you to save progress as hash part of the URL.  Use letter-only ids if you want URL
module to work.

## Hacking notes

 - The stylesheet is generated from LESS file. If you are going to modify the css - consider using
[LESS preprocessor](http://lesscss.org) Otherwise it will be a mess. If you are unfamiliar with LESS - please, call
the seniors. To select sprite from sprite picture - set its coordinates in .bg mixin (see style.less for examples)

## Editor

Will be added later

## Plans for future

 - Avatars and primary skills
 - Aliases
 - Merge arrows to editors
 - Non-interactable objects : skill-depending objects like arrows and stuff (medals?), auto-updating non-clickable skills