MAX_PLAYER = 5;
/* Define game state. */

/*****/
var display_tree = {
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
var password = ["meow", "beep", "wang", "woof", "oops"];
var username = ["Player1", "Player2", "Player3", "Player4", "Player5"];
var playerid = [0, 0, 0, 0, 0]
var money = [0, 0, 0, 0, 0];
var fs = require("fs");
var updateFunction = require("./update")
var Skill = require("./skill")

Controller = function(io, model) {
	var io = io;
	var Update = new updateFunction(io)
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
	/* Listen new connection */
	io.on("connection", (player) => {

	console.log("New connection.");

		player.on("login", (id, name, psw) => {
			// login password check
			if (id == 87 && psw == "csie") {
				console.log("admin login!");
			} else if (id >= 0 && id < 5 && psw == password[id]) {
				console.log("Player " + id + " login.");
			} else {
				console.log("Wrong login!")
				return;
			}
			console.log(player.id);
			// socket io start
			if(id != 87 && id >= 0 && id <= 4) {
				username[id] = name;
				playerid[id] = player.id;
				login_msg = "玩家 " + name + "上線了！ 大家跟他打聲招呼吧！"
				Update.Chatting(login_msg, "SYSTEM");
				Update.Leaderboard(username, money)
				console.log(player.id)
				io.sockets.to(player.id).emit('chatting', 'this is only for you' + username[id],"SYSTEM");
				player.on('chat_message', (msg) => Update.Chatting(msg, username[id])); // listen to chatting msg
			}
			else{
				player.on('chat_message', (msg) => Update.Chatting(msg,"SYSTEM"));	// listen to chatting msg
			}
		})
	});
}
module.exports = Controller;
