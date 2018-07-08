MAX_PLAYER = 5;
/* Define game state. */

/*****/

var password = ["meow", "beep", "wang", "woof", "oops"];

var fs = require("fs");



Controller = function(io, model) {
	var io = io;
	
	function chatPlayer(msg,id){
		io.emit('chat_message', msg ,"PLAYER");
	}
	
	/* Listen new connection */
	io.on("connection", (player) => {

	console.log("New connection.");

		player.on("login", (id, name, psw) => {
			if (id == 87 && psw == "csie") {
				console.log("admin login!");
			} else if (id >= 0 && id < 5 && psw == password[id]) {
				console.log("Player " + id + " login.");
			//`	questionEvent(io);
				
							
			} else {
				console.log("Wrong login!")
				return;
			}

			if(id != 87) {
				io.emit('chat_message', "玩家 " + name + " 上線了! 大家跟他打聲招呼吧!");
				player.on('chat_message', (msg) => chatPlayer(msg,id));
			}
		})
		

	
	});
}
module.exports = Controller;
