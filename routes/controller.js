MAX_PLAYER = 5;
/* Define game state. */
/*ai event*/
var ai_day = {7:17, 19:27, 31:37, 53:56};
var ai_ratio = {7:[10,10,15], 19:[25,10,30], 31:[10,35,20], 53:[40,30,20]};
/*mine event*/
var mine_msg = {11:"因應電費大漲，部分礦場利潤下降",23:"技術革新，礦場產量暴增",43:"金融海嘯發生，部分礦場無預警崩盤倒閉"};
var mine_change = {11:[0,5,5,5,10,10,10,20,20,40], 23:[0,5,5,5,10,10,20,40,40,80], 43:[0,5,5,5,10,10,20,0,0,0]};
/*dataset amount*/
var datasetAmount = {11:60, 5:30, 1:5};
var optionReward = 20;
/*****/

var password = ["meow", "beep", "wang", "woof", "oops"];
var fs = require("fs");
var player = require("../model/player.js");
var stars = require("../model/stars.js");
var updateFunction = require("./update");
var timer = require("./timer");
// var questionFuntion = require("./questionEvent");


Controller = function(io, model) {
	var io = io;
	var playerIO = [{},{},{},{},{}];
	var mine = ["m0", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
	var abandon = ["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14"];
	var starDatasetType = {a10: "image", a11: "image", a12: "text", a13: "text", a14: "sound"};
	var computer = ["c0", "c1", "c2", "c3", "c4"];
	var model = {
		stars: stars,
		players: [
			player(0), player(1), player(2), player(3), player(4) ],
		day: 0
	}
	//console.log(model.stars);
	var count = 0;
	
	var Update = new updateFunction(io);
	// var Question = new questionFuntion(io);
	
	function chatPlayer(msg,id){
		io.emit('chat_message', msg ,"PLAYER");
	}
	
	function night() {
		for (var i = 0; i < 5; i++) {
			io.sockets.to(playerIO[i].second).emit("night_start", i, model.players[i], model.stars);
		}
		var Time = 30;
		var timer = new timer(Time * 1000, io);
		timer.tick();
	}
	function nightTimeUp() {
		io.emit("nightTimeUp");
	}

	function collectPlayerSetting(id, player) {
		console.log("collectPlayerSetting", id);
		count += 1;
		// todo
		for (var i = 0; i < 5; i++) {
			if (player.ships[i].targetId != null) {
				if (player.ships[i].dayLeft == 1) {
					player.ships[i].dayLeft = 0;
					model.stars[player.ships[i].targetId].player_here[id] = i;
				} else if (player.ships[i].dayLeft > 0){
					player.ships[i].dayLeft -= 1;
				}
			}
		}
		// for testing
		//console.log(model.stars.m1);
		//console.log(model.players[id]);
		model.stars.m1.player_here[id] = 0;
		model.players[id].ships[0].num_of_miner = 2;
		model.stars.m1.num = 2;
		//-------------
		if (count == 2) {
			day();
		}
	}

	function day() {
		console.log("run day function");
		count = 0;
		//update day
		model.day += 1;
		io.emit('new_day', model.day);
		//mine event
		if (model.day == 11 || model.day == 23 || model.day == 43) {
			//message
			var msg = "Event: " + mine_msg[model.day];
			Update.Chatting(msg, "SYSTEM");
			console.log("[Event] mine" + model.day);
			for (let key in mine) {
				model.stars[mine[key]].mine = mine_change[model.day][key]; 
			}
		}
		for (let i of mine) {
			star = model.stars[i];
			if (star.num > 0) {
				if (!star.found) {
					star.found = true;
					Update.Star(i);
					var msg = "新的礦場被發現了!";
					Update.Chatting(msg, "SYSTEM");
				}
				var getRewardPlayer;
				if (stars[i].num <= 2) {
					getRewardPlayer = star.player_here;
				} else {
					/*pop box: question*/
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							//Notify
							var msg = "你在"+i+"星球與別人發生衝突，請準備答題";
							Update.Notify(playerIO[j], msg);
						}
					}
					// getRewardPlayer = Question.Invoke(star.player_here);
					getRewardPlayer = star.player_here; //temp
				}
				var total = 0
				for (var j = 0; j < 5; j++) {
					if (getRewardPlayer[j] != null) {
						total += model.players[j].ships[star.player_here[j]].num_of_miner;
					}
				}
				for (var j = 0; j < 5; j++) {
					if (getRewardPlayer[j] != null) {
						add = model.players[j].ships[star.player_here[j]].num_of_miner;
						add = add / total * star.mine;
						model.players[j].money += add;
						/*chat message*/
						var msg = "玩家" + model.players[j].name + "挖礦獲得 " + add + "BTC";
						Update.Chatting(msg, "SYSTEM");
						/*update player*/
						Update.Money(playerIO[j].first, model.players[j].money);
					}
				}
				/*update board*/
				Update.Leaderboard(model.players);
			}
		}
		for (let i of abandon) {
			star = model.stars[i];
			if (star.num > 0) {
				if (!star.found) {
					star.found = true;
					Update.Star(i);
					var msg = "新的星球被發現了!";
					Update.Chatting(msg, "SYSTEM");
				}
				var msg;
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
							msg = "你誤闖黑洞"+i+"，船員們遇難了，飛船已修復好回到基地";
							Update.Notify(playerIO[j].first, msg);
							Update.Worker(playerIO[j].first, player.num_of_miner, player.num_of_trainer, player.num_of_haker);
							//message
							msg = "玩家"+ player.name + "誤入已成黑洞的星球，發生太空船難，船員無人生還QQ";
							Update.Chatting(msg, "SYSTEM");
						}
					}
					//update map
					io.emit("blackHole");
					break;
				case "a1":
				case "a2":
					//desert
					msg = "邊緣星球感謝玩家拜訪";
					Update.Chatting(msg, "SYSTEM");
					//notify
					for (j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							msg = "邊緣星球"+i+"感謝您的拜訪";
							Update.Notify(msg, "SYSTEM");
						}
					}
					break;
				case "a3":
					//ML
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							player = model.players[j];
							if (player.ships[star.player_here[j]].num_of_trainer == 0) {
								//notify
								msg = "你未達成"+i+"星球的觸發條件喔";
								Update.Notify(playerIO[j].first, msg);
							} else {
								if (!star.trigger[j]) {
									if (star.GPU > 0) {
										//event
										//notify
										msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
										Update.Notify(playerIO[j].first, msg);
									} else {
										msg = i+"上的GPU已經被拿走了QQ";
										Update.Notify(playerIO[j].first, msg);
									}
									star.trigger[j] == true;
								} else {
									msg = "你已經觸發過"+i+"星球事件囉";
									Update.Notify(playerIO[j].first, msg);
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
								Update.Notify(playerIO[j].first, msg);
							} else {
								if (!star.trigger[j]) {
									player.money += 200;
									star.trigger[j] == true;
									//notify
									msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
									Update.Notify(playerIO[j].first, msg);
								 } else {
									msg = "你已經觸發過"+i+"星球事件囉";
									Update.Notify(playerIO[j].first, msg);
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
								Update.Notify(playerIO[j].first, msg);
							} else {
								if (!star.trigger[j]) {
									//event
									star.trigger[j] == true;
									//notify
									msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
									Update.Notify(playerIO[j].first, msg);
								} else {
									msg = "你已經觸發過"+i+"星球事件囉";
									Update.Notify(playerIO[j].first, msg);
								}
							}
						}
					}
					break;
				case "a6":
				case "a7":
					//option
					//notify: todo
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							msg = "歡迎來到機會星球"+i+"，請回答題目以獲得獎勵";
							Update.Notify(playerIO[j], msg);
						}
					}
					//pop box: question
					// var getRewardPlayer = Question.Invoke(star.player_here);
					var getRewardPlayer = star.player_here; //temp
					for (var j = 0; j < 5; j++) {
						if (getRewardPlayer[j] != null) {
							//todo
							model.players[j].money += optionReward;
							msg = "恭喜玩家"+model.players[j].name +"答對題目，獲得"+optionReward+"BTC";
							Update.Chatting(msg, "SYSTEM");
						}
					}
					Update.Leaderboard(model.players);
					break;
				case "a8":
				case "a9":
					//destiny
					randomMoney = 10; //todo
					for (var j = 0; j < 5; j++) {
						if (star.player_here[j] != null) {
							model.player[j].money += randomMoney;
							//chat message
							msg = "玩家" + model.players[j].name + "在命運星球"+i+"抽到的命運是: " + randomMoney + "BTC";
							Update.Chatting(msg, "SYSTEM");
							//update player
							Update.Money(playerIO[j].first, model.players[j].money);
							//notify
							msg = "你在" + i + "觸發命運";
							Update.Notify(playerIO[j].first, msg);
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
							msg = "玩家" + model.players[j] + "在廢棄星球收集到 "+ amount + "dataset";
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
			star = model.stars[i];
			if (star.num > 0) {
				if (!star.found) {
					star.found = true;
					Update.Star(i);
					var msg = "新的雲端運算中心被發現了!";
					Update.Chatting(msg, "SYSTEM");
				}
				for (var j = 0; j < 5; j++) {
					if (star.player_here[j] != null) {
						player = model.players[j];
						shipId = star.player_here[j];
						/*check with dataset*/
						if (star.dayLeft[j] == null) {
							if (player.ships[shipId].datasetType != null) {
								star.dayLeft[j] = star.day - 1;
								var msg = "開始在"+i+"訓練model: 需要"+star.day+"天";
								Update.Notify(playerIO[j].first, msg);
								//ship can not call back
							}
						} else if (star.dayLeft[j] > 0) {
							star.dayLeft[j] -= 1;
						} else {
							star.dayLeft[j] == null;
							var msg = i+"星球上model訓練完成!";
							Update.Notify(playerIO[j].first, msg);
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
			console.log("AImodel event");
			/*pop box: event*/
		}
		

		//finish => start night
		io.emit("adminStartButton");
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
				playerIO[id].first = player.id;
			} else {
				console.log("Wrong login!");
				return;
			}

			// socket io start
			if(id != 87 && id >= 0 && id <= 4) {
				model.players[id].name = name;
				login_msg = "玩家 " + name + "上線了！ 大家跟他打聲招呼吧！"
				Update.Chatting(login_msg, "SYSTEM");
				Update.Leaderboard(model.players);
				Update.Notify(playerIO[id].first,login_msg);
				player.on('chat_message', (msg) => Update.Chatting(msg, name)); // listen to chatting msg
				// Question.Init(player);
				
				test = model.players[id];
				collectPlayerSetting(id, test); //for testing

			}
			else{
				player.on('adminSayStart', night());
				player.on('chat_message', (msg) => Update.Chatting(msg,"SYSTEM"));	// listen to chatting msg
				io.emit("adminStartButton");
			}
		});

		player.on("secondLogin", (id, name, psw) => {
			// login password check
			if (id >= 0 && id < 5 && psw == password[id]) {
				console.log("Player " + id + " login --2.");
				playerIO[id].second = player.id;
			} else {
				console.log("Wrong login!")
				return;
			}

			// socket io start
			if(id >= 0 && id <= 4) {
				player.on("collectData", (Id, Player) => collectPlayerSetting(Id, Player));
			}
		});
	});
}
module.exports = Controller;
