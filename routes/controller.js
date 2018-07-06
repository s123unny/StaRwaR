MAX_PLAYER = 5;
/* Define game state. */

/*****/

var password = ["meow", "beep", "wang", "woof", "oops"];
var username = ["Player1", "Player2", "Player3", "Player4", "Player5"];
var playerid = [0, 0, 0, 0, 0]
var money = [0, 0, 0, 0, 0];
var fs = require("fs");
var updateFunction = require("./update")

Controller = function(io, model) {
	var io = io;
	var Update = new updateFunction(io)
	
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
