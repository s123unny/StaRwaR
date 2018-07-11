//import { MakePlayerSkill, Skill_ability } from 'skill.js';
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

var password = ["meow", "beep", "wang", "woof", "oops"];
var fs = require("fs");
var url = require("url");
var player = require("../model/player.js");
var stars = require("../model/stars.js");
var updateFunction = require("./update");
var timer = require("./timer");
var questionFuntion = require("./question");
var Skill = require("../model/skill")
//var Player_skill = new Skill.MakePlayerSkill();
global.model = {
	stars: stars,
	players: [
		player(0), player(1), player(2), player(3), player(4) ],
	day: 0
}

Controller = function(io, model) {
	var io = io;
	var playerIO = [{},{},{},{},{}];
	var adminIO;
	var mine = ["m0", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
	var abandon = ["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14"];
	var starDatasetType = {a9: "image", a10: "image", a11: "text", a12: "text", a13: "audio", a14: "audio"};
	var computer = ["c0", "c1", "c2", "c3", "c4"];
	var model = global.model;
	model.stars.m1.player_here[2] = 0;
	model.players[2].ships[0].num_of_miner = 2;
	//console.log(model.stars);
	var count = 0;
	var totalmoney;
	// var Player_skill =  Skill.make();
	// console.log(Player_skill[0]);
	var Update = new updateFunction(io);
	var Question = new questionFuntion(io, question_return);
	
	function chatPlayer(msg,id){
		io.emit('chat_message', msg ,"PLAYER");
	}

	function question_return(getRewardPlayer, state, substate) {
		var star = model.stars[substate];
		if (state == "Mine") {
			var total = 0
			for (var j = 0; j < 5; j++) {
				if (getRewardPlayer[j] != null) {
					total += model.players[j].ships[star.player_here[j]].num_of_miner;
				}
			}
			for (var j = 0; j < 5; j++) {
				if (getRewardPlayer[j] != null) {
					var add = model.players[j].ships[star.player_here[j]].num_of_miner;
					add = add / total * star.mine;
					model.players[j].money += add;
					/*chat message*/
					var msg = "玩家" + model.players[j].name + "挖礦獲得 " + add + "BTC";
					Update.Chatting(msg, "SYSTEM");
					/*update player*/
					Update.Money(playerIO[j].second, model.players[j].money);
				}
			}
			/*update board*/
			Update.Leaderboard(model.players);
			if (model.stars.next(id) == null) {
				day("Abandon", "a0");
			} else {
				mine_process(model.stars.next(id));
			}
		} else {//abandon 
			for (var j = 0; j < 5; j++) {
				if (getRewardPlayer[j] != null) {
					//todo
					model.players[j].money += optionReward;
					msg = "恭喜玩家"+model.players[j].name +"答對題目，獲得"+optionReward+"BTC";
					Update.Chatting(msg, "SYSTEM");
					Update.Money(playerIO[j].second, model.players[j].money);
				}
			}
			Update.Leaderboard(model.players);
			day("Abandon", "a8");
		}
	}
	function mine_process(id) {
		console.log("mine process:", id);
		star = model.stars[id];
		if (star.num > 0) {
			if (!star.found) {
				star.found = true;
				Update.Star(id);
				var msg = "新的礦場被發現了!";
				Update.Chatting(msg, "SYSTEM");
			}
			var getRewardPlayer;
			if (star.num <= 2) {
				getRewardPlayer = star.player_here;
			} else {
				/*pop box: question*/
				for (var j = 0; j < 5; j++) {
					if (star.player_here[j] != null) {
						//Notify
						var msg = "你在"+id+"星球與別人發生衝突，請準備答題";
						Update.Notify(playerIO[j].first, msg);
					}
				}
				Question.Invoke(star.player_here, "Mine", id);
				return;
			}
			var total = 0
			for (var j = 0; j < 5; j++) {
				if (getRewardPlayer[j] != null) {
					total += model.players[j].ships[star.player_here[j]].num_of_miner;
				}
			}
			for (var j = 0; j < 5; j++) {
				if (getRewardPlayer[j] != null) {
					var add = model.players[j].ships[star.player_here[j]].num_of_miner;
					add = add / total * star.mine;
					model.players[j].money += add;
					/*chat message*/
					var msg = "玩家" + model.players[j].name + "挖礦獲得 " + add + "BTC";
					Update.Chatting(msg, "SYSTEM");
					/*update player*/
					Update.Money(playerIO[j].second, model.players[j].money);
				}
			}
			/*update board*/
			Update.Leaderboard(model.players);
		}
		if (model.stars.next(id) == null) {
			day("Abandon", "a0");
		} else {
			mine_process(model.stars.next(id));
		}
	}
	
	function night() {
		console.log("night start emit");
		for (var i = 0; i < 5; i++) {
			if (playerIO[i].second != undefined) {
				console.log("emit", i);
			}
			io.sockets.to(playerIO[i].second).emit("night_start", i);
		}
		var Time = 60;
		var mytimer = new timer(Time * 1000, io, nightTimeUp);
		mytimer.tick();
	}
	function nightTimeUp() {
		console.log("night time up");
		io.emit("nightTimeUp");
	}

	function collectPlayerSetting(id, ships, money, workers, hand_on_AImodel) {
		console.log("collectPlayerSetting", id);
		console.log(hand_on_AImodel);
		player = model.players[id];
		player.money = money;
		player.num_of_miner = workers[0];
		player.num_of_trainer = workers[1];
		player.num_of_haker = workers[2];
		Update.Leaderboard(model.players);
		count += 1;
		// todo
		for (var i = 0; i < 5; i++) {
			if(ships[i]!=null && ships[i].missionType == "Learn Skill"){
				for(var j = 0; j < ships[i].num_of_haker; j++){
					model.players[id].skill=Update.Skill(ships[i].targetId,model.players[id].skill);
				}
				continue;
			}
			if (ships[i] != null) {
				ships[i].status = player.ships[i].status;
				player.ships[i] = ships[i];
			}
			if (player.ships[i].targetId != null) {
				if (player.ships[i].num_of_miner == -1) { //for returned ship
					Update.Ship_back(id, player.ships[i].targetId);
					model.stars[player.ships[i].targetId].player_here[id] = null;
					model.stars[player.ships[i].targetId].num -= 1;
					player.ships[i].targetId = null;
					player.ships[i].dayLeft = null;
					player.ships[i].num_of_miner = 0;
					player.ships[i].num_of_trainer = 0;
					player.ships[i].num_of_haker = 0;
				} else if (player.ships[i].dayLeft == null) {
					//caculate require day
					//if (skill) todo
					model.stars[player.ships[i].targetId].player_here[id] = i;
					model.stars[player.ships[i].targetId].num += 1;
					var distance = Math.abs(model.stars[player.ships[i].targetId].x_pos - model.players[id].x_pos);
					distance += Math.abs(model.stars[player.ships[i].targetId].y_pos - model.players[id].y_pos);
					if (distance <= 3) {
						player.ships[i].dayLeft = 1;
					} else if (distance < 10) {
						player.ships[i].dayLeft = 2;
					} else {
						player.ships[i].dayLeft = 3;
					}
					if (player.ships[i].datasetType != null) {
						player.ships[i].datasetAmount = player.dataset[datasetType];
						player.dataset[datasetType] = 0;
					}
					Update.Ship_Mission(id, player.ships[i].targetId);
				}
				if (player.ships[i].dayLeft == 1) {
					player.ships[i].dayLeft = 0; //arrive
					model.stars[player.ships[i].targetId].player_here[id] = i;
				} else if (player.ships[i].dayLeft > 0){
					player.ships[i].dayLeft -= 1;
				}
			}
		}
		// for testing
		//console.log(model.stars.m1);
		//console.log(model.players[id]);
		// model.stars.m1.player_here[id] = 0;
		// model.players[id].ships[0].num_of_miner = 2;
		// model.stars.m1.num = 2;
		//-------------
		if (count == 3) {
			day("Init", null);
		}
	}


	function day(state, substate) {
		console.log(state, substate);
		switch(state) {
		case "Init":
			console.log("run day function");
			count = 0;
			totalmoney = 0;
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
			day("Mine", "m0");
			break;
		case "Mine":		
			mine_process(substate);	
			break;
		case "Abandon":
			for (let i of abandon) {
				if (i != substate) {
					continue;
				}
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
								Update.Worker(playerIO[j].second, player.num_of_miner, player.num_of_trainer, player.num_of_haker);
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
						//Mine
						for (var j = 0; j < 5; j++) {
							if (star.player_here[j] != null) {
								player = model.players[j];
								if (player.ships[star.player_here[j]].num_of_miner < 4) {
									if (star.cannotback == null) {
										//ship cannot call back
										star.cannotback[j] = 2;
										//notify
										msg = "你未達成"+i+"星球的觸發條件，將被扣留兩天XD";
										Update.Notify(playerIO[j].first, msg);
									} else if (star.cannotback > 0) {
										star.cannotback[j] -= 1;
									} else {
										star.cannotback[j] = null;
									}
								} else {
									if (!star.trigger[j]) {
										player.money += 200;
										star.trigger[j] == true;
										//notify
										msg = "你觸發了"+i+"星球的特殊事件，小提醒: 每個玩家只能觸發一次喔";
										Update.Notify(playerIO[j].first, msg);
										Update.Money(playerIO[j].second, model.players[j].money);
										Update.Leaderboard(model.players);
									 } else {
										msg = "你已經觸發過"+i+"星球事件囉";
										Update.Notify(playerIO[j].first, msg);
									}
								}
							}
						}
						break;
					case "a4":
						//Haker
						for (var j = 0; j < 5; j++) {
							if (star.player_here[j] != null) {
								player = model.players[j];
								if (player.ships[star.player_here[j]].num_of_haker == 0) {
									//event
									player.money -= 20;
									Update.Money(playerIO[j].second, player.money);
									//notify
									msg = "你未達成"+i+"星球的觸發條件，惡意程式已植入XD";
									Update.Notify(playerIO[j].first, msg);
									Update.Leaderboard(model.players);
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
					case "a5":
					case "a6":
						//option
						//notify: todo
						for (var j = 0; j < 5; j++) {
							if (star.player_here[j] != null) {
								msg = "歡迎來到機會星球"+i+"，請回答題目以獲得獎勵";
								Update.Notify(playerIO[j], msg);
							}
						}
						//pop box: question
						Question.Invoke(star.player_here, "Abandon", "a7");
						break;
					case "a7":
					case "a8":
						//destiny
						randomMoney = 10; //todo
						for (var j = 0; j < 5; j++) {
							if (star.player_here[j] != null) {
								model.player[j].money += randomMoney;
								//chat message
								msg = "玩家" + model.players[j].name + "在命運星球"+i+"抽到的命運是: " + randomMoney + "BTC";
								Update.Chatting(msg, "SYSTEM");
								//update player
								Update.Money(playerIO[j].second, model.players[j].money);
								//notify
								msg = "你在" + i + "觸發命運";
								Update.Notify(playerIO[j].first, msg);
							}
						}
						//update board
						Update.Leaderboard(model.players);
						break;
					case "a9":
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
							if (star.player_here[j] != null && model.players[j].ships[ star.player_here[j] ].num_of_trainer > 0) {
								model.players[j].dataset[starDatasetType[i]] += amount;
								//chat message
								msg = "玩家" + model.players[j] + "在廢棄星球收集到 "+ amount + "dataset";
								Update.Chatting(msg, "SYSTEM");
								//update player: bag
								Update.Item("dataset", starDatasetType[i], amount);
								//notify
								msg = "你在星球"+i+"收集到"+amount+"dataset";
								Update.Notify(playerIO[j], msg);
							}
						}
						break;
					}
				}
				substate = model.stars.next(i);
			}
			day("Last", null);
			break;
		case "Last":
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
									star.dayLeft[j] = star.day;
									var msg = "開始在"+i+"訓練model: 需要"+star.day+"天";
									Update.Notify(playerIO[j].first, msg);
									//ship can not call back
								}
							} else if (star.dayLeft[j] > 0) {
								star.dayLeft[j] -= 1;
							} else {
								star.dayLeft[j] == null;
								var msg = i+"星球上model訓練完成!";
								var value = player.ships[shipId].datasetAmount * Math.log2(player.ships[shipId].num_of_trainer);
								if (player.AImodel[ player.ships[shipId].datasetType ] == null || value > player.AImodel[ player.ships[shipId].datasetType ]) {
									//todo
									player.AImodel[ player.ships[shipId].datasetType ] = value;
									//update player: bag
									Update.Item("model", player.ships[shipId].datasetType, value);
								} else {
									msg += "但品質較差，因此不做更新";
								}
								Update.Notify(playerIO[j].first, msg);
								player.ships[shipId].datasetType = null;
								player.ships[shipId].datasetAmount = 0;
							}
						}
					}
				}
			}
			if (model.day == 7 || model.day == 19 || model.day == 31 || model.day == 53) {
				console.log("AImodel event");
				var msg = "大會通知：現在開始徵求model．在第"+ai_day[model.day]+"天之前繳交可以獲得報酬，目前報酬的行情倍率如下： Audio: "+ai_ratio[model.day][0]+"Image: "+ai_ratio[model.day][1]+"Text: "+ai_ratio[model.day][2];
				for (var i = 0; i < 5; i++) {
					Update.Notify(playerIO[i].first, msg);
				}
				/*pop box: event*/
			}
			for(var i = 0; i < 5; i++)
				if(model.players[i].skill['Laplaces-Acma'].method())
					Update.Notify(playerIO[i].first,"Day 53 BANG!");
			for(var i = 0; i < 5; i++)
				if(model.players[i].skill['Tax-Collector'].method())
					model.players[i].money += 87;
			for(var i = 0; i < 5; i++)
				if(model.players[i].skill['How-Universe'].method())
					io.sockets.to(playerIO[i].first).emit("howhow", String(i));	
			for(var i = 0; i < 5; i++)
				model.players[i].money+=model.players[i].skill['How-Universe'].method(totalmoney);
			

			//finish => start night
			console.log("emit start button");
			io.sockets.to(adminIO).emit("adminStartButton");
			break;
		}
	}



	
	/* Listen new connection */
	io.on("connection", (player) => {

		console.log("New connection.");
		player.on("login", (id, name, psw) => {
			// login password check
			if (id == 87 && psw == "csie") {
				adminIO = player.id;
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
				
				var login_msg = "玩家" +name+"上線了，大家跟他打招呼吧!"
				Update.Chatting(login_msg, "SYSTEM","red");
				Update.Leaderboard(model.players);
				player.on('chat_message', (msg) => Update.Chatting(msg, model.players[id].skill['Respectful-Player'].method(name),model.players[id].skill['Rainbow'].method(id))); // listen to chatting msg
				player.on('skill', (skillname) => Player_skill[id]=Update.Skill(skillname, playerid[id],Player_skill[id]));
				
				Question.Init(player);
				

			}
			else{
				player.on('adminSayStart', night);
				player.on('chat_message', (msg) => Update.Chatting(msg,"SYSTEM","red"));	// listen to chatting msg
				io.sockets.to(adminIO).emit("adminStartButton");
				console.log("emit admin start button");
			}
		});

		var connectUrl = url.parse(player.handshake.headers.referer);

		if (connectUrl.query != null) {
			var id = connectUrl.query[3];
			var psw = connectUrl.pathname.split("/")[2];
			console.log(id, psw);
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
				player.on("collectData", (id, ships, money, workers, hand_on_AImodel) => collectPlayerSetting(id, ships, money, workers, hand_on_AImodel));
				//player.on('skill', (skillname) => model.players[id].skill=Update.Skill(skillname, playerIO[id].second,model.players[id].skill));
			}
		}

	
	});
}
module.exports = Controller;
