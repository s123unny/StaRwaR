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
var updateFunction = require("./update")


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
	
	var Update = new updateFunction(io);
	
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
			var msg = "礦場事件發生 待補";
			Update.Chatting(msg, "SYSTEM");
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
					Update.star(i);
					var msg = "新的礦場被發現了!";
					Update.Chatting(msg, "SYSTEM");
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
						var msg = "玩家" + model.players[j].name + "挖礦獲得 " + add + "幣";
						Update.Chatting(msg, "SYSTEM");
						/*update player*/
						Update.Money(playerIO[j], model.players[j].money);
					}
				}
				/*update board*/
				Update.Leaderboard(model.players);
			} else if (star.num > 2) {
				if (!star.found) {
					star.found = true;
					Update.star(i);
					var msg = "新的礦場被發現了!";
					Update.Chatting(msg, "SYSTEM");
				}
				/*pop box: question*/
			}
		}
		for (let i of abandon) {
			star = model.stars[i];
			if (star.num > 0) {
				if (!star.found) {
					star.found = true;
					Update.star(i);
					var msg = "新的星球被發現了!";
					Update.Chatting(msg, "SYSTEM");
				}
				switch(i) {
				case "a0":
					//black hole
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							player = model.players[j];
							player.num_of_miner -= player.ships[star.player_here[j]].num_of_miner;
							player.num_of_trainer -= player.ships[star.player_here[j]].num_of_trainer;
							player.num_of_haker -= player.ships[star.player_here[j]].num_of_haker;
							player.ships[star.player_here[j]].num_of_miner = 0;
							player.ships[star.player_here[j]].num_of_trainer = 0;
							player.ships[star.player_here[j]].num_of_haker = 0;
							player.ships[star.player_here[j]].targetId = null;
							//notify
							var msg = "你誤闖黑洞"+i+"，船員們遇難了，飛船已修復好回到基地";
							Update.Notify(playerIO[j], msg);
							Update.Worker(playerIO[j], player.num_of_miner, player.num_of_trainer, player.num_of_haker);
							//message
							var msg = "玩家"+ player.name + "誤入已成黑洞的星球，發生太空船難，船員無人生還QQ";
							Update.Chatting(msg, "SYSTEM");
						}
					}
					//update map
					io.emit("blackHole");
					break;
				case "a1":
				case "a2":
					//desert
					var msg = "邊緣星球感謝玩家拜訪";
					Update.Chatting(msg, "SYSTEM");
					//notify
					break;
				case "a3":
					//ML
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							player = model.players[j];
							if (player.ships[star.player_here[j]].num_of_trainer == 0) {
								//notify
								msg = "你未達成"+i+"星球的觸發條件喔";
								Update.Notify(playerIO[j], msg);
							} else {
								if (!star.trigger[j]) {
									if (star.GPU > 0) {
										//event
										//notify
										msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
										Update.Notify(playerIO[j], msg);
									} else {
										msg = i+"上的GPU已經被拿走了QQ";
										Update.Notify(playerIO[j], msg);
									}
									star.trigger[j] == true;
								} else {
									msg = "你已經觸發過"+i+"星球事件囉";
									Update.Notify(playerIO[j], msg);
								}
							}
						}
					}
					star.GPU -= 1;
					break;
				case "a4":
					//Mine
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							player = model.players[j];
							if (player.ships[star.player_here[j]].num_of_miner < 4) {
								//ship cannot call back
								//notify
								msg = "你未達成"+i+"星球的觸發條件，將被扣留兩天XD";
								Update.Notify(playerIO[j], msg);
							} else {
								if (!star.trigger[j]) {
									player.money += 200;
									star.trigger[j] == true;
									//notify
									msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
									Update.Notify(playerIO[j], msg);
								 } else {
									msg = "你已經觸發過"+i+"星球事件囉";
									Update.Notify(playerIO[j], msg);
								}
							}
						}
					}
					break;
				case "a5":
					//Haker
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							player = model.players[j];
							if (player.ships[star.player_here[j]].num_of_haker == 0) {
								//event
								//notify
								msg = "你未達成"+i+"星球的觸發條件，惡意程式已植入XD";
								Update.Notify(playerIO[j], msg);
							} else {
								if (!star.trigger[j]) {
									//event
									star.trigger[j] == true;
									//notify
									msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
									Update.Notify(playerIO[j], msg);
								} else {
									msg = "你已經觸發過"+i+"星球事件囉";
									Update.Notify(playerIO[j], msg);
								}
							}
						}
					}
					break;
				case "a6":
				case "a7":
					//option
					//pop box: question
					//notify
					break;
				case "a8":
				case "a9":
					//destiny
					randomMoney = 10; //todo
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							model.player[j].money += randomMoney;
							//chat message
							var msg = "玩家" + model.players[j].name + "在命運星球抽到的命運是: " + randomMoney + "幣";
							Update.Chatting(msg, "SYSTEM");
							//update player
							Update.Money(playerIO[j], model.players[j].money);
							//notify
							msg = "你在" + i + "碰到命運";
							Update.Notify(playerIO[j], msg);
						}
					}
					//update board
					Update.Leaderboard(model.players);
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
							var msg = "玩家" + model.players[j] + "在廢棄星球收集到 "+ amount + "dataset";
							Update.Chatting(msg, "SYSTEM");
							//update player: bag
							//notify
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
					Update.star(i);
					var msg = "新的雲端運算中心被發現了!";
					Update.Chatting(msg, "SYSTEM");
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
							//update player: bag
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
			// login password check
			if (id == 87 && psw == "csie") {
				console.log("admin login!");
			} else if (id >= 0 && id < 5 && psw == password[id]) {
				console.log("Player " + id + " login.");
				playerIO[id] = player.id;
			} else {
				console.log("Wrong login!")
				return;
			}
			console.log(player.id);
			// socket io start
			if(id != 87 && id >= 0 && id <= 4) {
				login_msg = "玩家 " + name + "上線了！ 大家跟他打聲招呼吧！"
				Update.Chatting(login_msg, "SYSTEM");
				Update.Leaderboard(model.players);
				io.sockets.to(playerIO[id]).emit('chatting', 'this is only for you',"SYSTEM");
				player.on('chat_message', (msg) => Update.Chatting(msg, username[id])); // listen to chatting msg
			}
			else{
				player.on('chat_message', (msg) => Update.Chatting(msg,"SYSTEM"));	// listen to chatting msg
			}
		})
	});
}
module.exports = Controller;
