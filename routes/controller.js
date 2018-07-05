MAX_PLAYER = 5;
/* Define game state. */

/*****/

var password = ["meow", "beep", "wang", "woof", "oops"];

var fs = require("fs");

Controller = function(io, model) {
	var io = io;
	
	function chatPlayer(msg,id){
		io.emit('chatting', msg ,id);
		console.log(msg);
	}

	/* Listen new connection */
	io.on("connection", (player) => {

	console.log("New connection.");

		player.on("login", (id, name, psw) => {
			if (id == 87 && psw == "csie") {
				console.log("admin login!");
			} else if (id >= 0 && id < 5 && psw == password[id]) {
				console.log("Player " + id + " login.");
			} else {
				console.log("Wrong login!")
				return;
			}
			console.log(player.id);
			if(id != 87) {
				io.emit('chatting', "玩家 " + name + " 上線了! 大家跟他打聲招呼吧!","SYSTEM");
				//player.broadcast.to(player.id).emit('chatting', 'for your eyes only');
				io.sockets.to(player.id).emit('chatting', 'this is only for you',"SYSTEM");
				player.on('chat_message', (msg) => chatPlayer(msg,"PLAYER"+id));

			}
			else{
				player.on('chat_message', (msg) => chatPlayer(msg,"SYSTEM"));
			}
		})
	});
}
module.exports = Controller;
