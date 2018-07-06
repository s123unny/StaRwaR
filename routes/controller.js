MAX_PLAYER = 5;
/* Define game state. */
/*ai event*/
var ai_day = {7:17, 19:27, 31:37, 53:56};
var ai_ratio = {7:[10,10,15], 19:[25,10,30], 31:[10,35,20], 53:[40,30,20]};
/*mine event*/
var mine_day = [11,23,43];
var mine_change = {11:[0,5,5,5,10,10,10,20,20,40], 23:[0,5,5,5,10,10,20,40,40,80], 43:[0,5,5,5,10,10,20,0,0,0]};
/*dataset amount*/
var datasetAmount = {11:60, 5:30, 1:5};
/*****/

var password = ["meow", "beep", "wang", "woof", "oops"];

var fs = require("fs");
var player = require("../model/player.js");
var stars = require("../model/stars.js");


Controller = function(io, model) {
	var io = io;
	var playerIO = [];
	var mine = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9];
	var abandon = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14];
	var starDatasetType = {a10: image, a11: image, a12: text, a13: text, a14: sound};
	var computer = [c0, c1, c2, c3, c4];
	var model = {
		stars: stars,
		players: [
			player(0), player(1), player(2), player(3), player(4) ],
		day: 0
	}
	var count = 0;
	function chatPlayer(msg,id){
		io.emit('chat_message', msg ,"PLAYER");
	}
	
	function collectPlayerSetting() {
		count += 1;
		// todo
		if (count == 5) {
			day();
		}
	}

	function day() {
		count = 0;
		//update day
		model.day += 1;
		io.emit('new_day', model.day);
		//mine event
		if (model.day == 11 || model.day == 23 || model.day == 43) {
			//message
			console.log("[Event] mine" + model.day);
			for (let key in mine) {
				model.stars[mine[key]].mine = mine_change[model.day][key]; 
			}
		}
		for (let i of mine) {
			star = model.stars[i];
			if (star.num > 0 && stars[i].num <= 2) {
				if (!star.found) {
					star.found = true;
					/*update map (light up)*/
					/*chat message : star found*/
				}
				var total = 0
				for (var j = 0; j < 5; j++) {
					if (star.player_here[j] != null) {
						total += model.players[j].ships[star.player_here[j]].num_of_miner;
					}
				}
				for (var j = 0; j < 5; j++) {
					if (star.player_here[j] != null) {
						add = model.players[j].ships[star.player_here[j]].num_of_miner;
						add = add / total * star.mine;
						model.players[j].money += add;
						/*chat message*/
						/*update player*/
					}
				}
				/*update board*/
			} else if (star.num > 2) {
				if (!star.found) {
					star.found = true;
					/*update map (light up)*/
					/*chat message : star found*/
				}
				/*pop box: question*/
			}
		}
		for (let i of abandon) {
			star = model.stars[i];
			if (star.num > 0) {
				if (!star.found) {
					star.found = true;
					/*update map (light up)*/
					/*chat message: star found*/
				}
				switch(i):
				case "a0":
					//black hole
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							model.player[j].num_of_miner -= model.player[j].ships[star.player_here[j]].num_of_miner;
							model.player[j].num_of_trainer -= model.player[j].ships[star.player_here[j]].num_of_trainer;
							model.player[j].num_of_haker -= model.player[j].ships[star.player_here[j]].num_of_haker;
							model.player[j].ships[star.player_here[j]].num_of_miner = 0;
							model.player[j].ships[star.player_here[j]].num_of_trainer = 0;
							model.player[j].ships[star.player_here[j]].num_of_haker = 0;
						}
					}
					//message
					//update map
					break;
				case "a1":
				case "a2":
					//desert
					break;
				case "a3":
					//ML
					break;
				case "a4":
					//Mine
					break;
				case "a5":
					//Haker
					break;
				case "a6":
				case "a7":
					//option
					//pop box: question
					break;
				case "a8":
				case "a9":
					//destiny
					randomMoney = 10; //todo
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							model.player[j].money += randomMoney;
							//chat message
							//update player
						}
					}
					//update board
					break;
				case "a10":
				case "a11":
				case "a12":
				case "a13":
				case "a14":
					//dataset
					if (model.day % 11 == 0) {
						amount = datasetAmount[11];
					} else if (model.day % 5 == 0) {
						amount = datasetAmount[5];
					} else {
						amount = datasetAmount[1];
					}
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							model.player[j].dataset[starDatasetType[i]] += amount;
							//chat message
							//update player: bag
						}
					}
					break;
				}
			}
		}
		for (let i of computer) {
			star = moel.stars[i];
			if (star.num > 0) {
				if (!star.found) {
					star.found = true;
					/*update map (light up)*/
					/*message*/
				}
				for (var j = 0; j < 5; j++) {
					if (star.player_here[j] != null) {
						/*check with dataset*/
						player = model.players[j];
						shipId = star.player_here[j];
						if (player.ships[shipId].datasetType != null) {
							player.AImodel[player.AImodelIdx] = {
								id: player.AImodelIdx, 
								type: player.ships[shipId].datasetType, 
								value: player.ships[shipId].datasetAmount * Math.log2(player.ships[shipId].num_of_trainer)
							};
							player.AImodelIdx += 1;
							player.ships[shipId].datasetType = null;
							player.ships[shipId].datasetAmount = 0;
						}
					}
				}
			}
		}
		if (model.day == 7 || model.day == 19 || model.day == 31 || model.day == 53) {
			/*pop box: event*/
		}

	}

	/* Listen new connection */
	io.on("connection", (player) => {

	console.log("New connection.");

		player.on("login", (id, name, psw) => {
			if (id == 87 && psw == "csie") {
				console.log("admin login!");
			} else if (id >= 0 && id < 5 && psw == password[id]) {
				console.log("Player " + id + " login.");
				playerIO[id] = player;
			} else {
				console.log("Wrong login!")
				return;
			}

			if(id != 87) {
				io.emit('chatting', "玩家 " + name + " 上線了! 大家跟他打聲招呼吧!");
				player.on('chat_message', (msg) => chatPlayer(msg,id));
			}
		})
	});
}
module.exports = Controller;
