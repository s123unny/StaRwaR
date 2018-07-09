
var express = require("express");
var app = express();
var port = 7122;
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var logger = require('morgan');
var fs = require("fs");
// var timer = require("./timer")
// var day = require("./day")

app.use(logger('dev'));

// usage of day and time ticker 
// 1. new a class object
// 2. object.click
// Noted: All you have to do is to change the console.log()
//        in the class method to the code which can eject to html
/*
TOTAL_DAY = 20
var day_counter = new day(TOTAL_DAY);
day_counter.tick();
// For time-ticker, paralle is also fine !
LEFT_TIME = 5
var timer1 = new timer(LEFT_TIME * 1000);
timer1.tick();
var timer2 = new timer(LEFT_TIME * 1000);
timer2.tick();
*/


// usage: display (點亮技能的時候，專門用來emit給前端用的)
display_tree = {
	'old_king':['validation', 'employment'], 
	'validation':['ensemble', 'oil_gas', 'AUTO_DEBUGGER'], 
	'ensemble':['deep_learning'], 
	'deep_learning':['laplas'], 
	'oil_gas':['deep_learning', 'ssh'], 
	'ssh':['ADMIN', 'no_people'], 
	'AUTO_DEBUGGER':['no_people'], 
	'employment':['people_consumption', 'GPU'], 
	'people_consumption':['AUTO_DEBUGGER', 'god_of_crypto'], 
	'GPU':['god_of_crypto', 'fiftyone'], 
	'god_of_crypto':['attack', 'quantum'],
	'fiftyone':['DDOS'],
};

// define Skill_ability -> {skill_name:[required, type, method]}
Skill_ability = {
	'old_king':[1, 'General', function(){return;}], 
	'validation':[1, 'ML', function(pay){if(this.learned){return 1.1 * pay;} else{return pay;}}],
	'ensemble':[1, 'ML', function(pay){if(this.learned){return 1.1 * pay;} else{return pay;}}], 
	'deep_learning':[2, 'ML', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}}], 
	'laplas':[3, 'General', function(){return this.learned;}], 
	'oil_gas':[1, 'General', function(money){if(this.learned){return 1.1 * money;} else{return money;}}], 
	'ssh':[3, 'ML', function(){return this.learned;}], 
	'ADMIN':[2, 'General', function(){return this.learned;}],
	'no_people':[2, 'General', function(){return this.learned;}],
	'AUTO_DEBUGGER':[2, 'General', function(){return this.learned;}],
	'employment':[1, 'General', function(pay){return this.learned;}],
	'people_consumer':[1, 'General', function(money){if(this.learned){return 0.9 * money;} else{return money;}}],
	'god_of_crypto':[1, 'MINOR', function(money){if(this.learned){return 1.4 * money;} else{return money;}}],
	'attack':[1, 'MINOR', function(){return this.learned;}],
	'quantum':[3, 'General', function(day){if(this.learned){return day - 1;} else{return day;}}],
	'fiftyone':[3, 'MINOR', function(){return this.learned;}],
	'DDOS':[3, 'MINOR', function(){return this.learned;}],
	'GPU':[1, 'MINOR', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}}]
};

class Skill{
	constructor(require, type, method){
		this.required = 1;
		this.current = 0;
		this.learned = false;
		this.type = type;
		this.method = method;
	}
}


// initiate all players' skills
var Player_skill = []
for (var i = 0; i < 5; i++){
	var single_user_skill = {};
	for (var skill_name in Skill_ability){
		var require = Skill_ability[skill_name][0];
		var type = Skill_ability[skill_name][1];
		var method = Skill_ability[skill_name][2];
		single_user_skill[skill_name] =  new Skill(require, type, method);
	}
	Player_skill.push(single_user_skill);
}
console.log(Player_skill[0])
// use method
var pay = 10;
Player_skill[0]['validation'].learned = true;
console.log(Player_skill[0]['validation'].method(pay));
http.listen(port, function(){
	console.log("XD")
});
module.exports = Skill;