class Updateutil{
	constructor(io){
		this.io = io;
	}
	Leaderboard(players){
		var username = [];
		var money = [];
		for (var i = 0; i < 5; i++) {
			username.push(players[i].name);
			money.push(players[i].money);
		}
		console.log(username)
		console.log(money)
		this.io.emit('leaderboard', username, money);
	}
	Skill(skillname, playerIO, Player_skill){
		if(Player_skill[skillname].learned)
			return Player_skill;
		Player_skill[skillname].current+=1;
		if(Player_skill[skillname].current == Player_skill[skillname].required)
			Player_skill[skillname].learned = true;
		this.io.sockets.to(playerIO).emit('skilltree', Player_skill[skillname],skillname);
		console.log(skillname);
		return Player_skill;
	}
	Star(star){
		this.io.emit('new_star', star);	
	}
	Ship_Mission(base, star){
		this.io.emit('ship_mission', base, star);	
	}
	Ship_back(base, star){
		this.io.emit('ship_back', base, star);	
	}
	Worker(playerIO, miner, trainer, haker) {
		this.io.sockets.to(playerIO).emit("worker", miner, trainer, haker);
	}
	Money(playerIO, money) {
		this.io.sockets.to(playerIO).emit("money", money);
	}
	Item(playerIO, item, amount) { 
		this.io.sockets.to(playerIO).emit("item", type, subtype, amount);	
	}
	Chatting(msg, name){
		console.log(name, msg);
		this.io.emit('chatting', msg, name);
	}
	Notify(playerIO, msg) {
		this.io.sockets.to(playerIO).emit("notify", msg);
	}
}

module.exports = Updateutil;

