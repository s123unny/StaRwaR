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
	Skill(skillname, Player_skill,playerIO,name){
		if(Player_skill[skillname].learned)
			return Player_skill;
		if(!Player_skill[skillname].learnable)
			return Player_skill;
		Player_skill[skillname].current+=1;
		if(Player_skill[skillname].current == Player_skill[skillname].required)
		{	
			Player_skill[skillname].learnable = false;
			var msg = name+" learned "+skillname;
			this.io.sockets.to(playerIO).emit("chatting", msg, "SYSTEM", "gold");
			for (var i = 0; i < Player_skill[skillname].next.length; i++)
				Player_skill[Player_skill[skillname].next[i]].learnable = true;
			Player_skill[skillname].learned = true;
			Player_skill[skillname].usable = true;
			console.log(msg);
		}
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
	Item(playerIO, type, subtype, amount) { 
		this.io.sockets.to(playerIO).emit("item", type, subtype, amount);	
	}
	Chatting(msg, name,color,playerIO,id){
		console.log(name, msg,"chat");
		for (var i = 0; i < 5; i++) {
			if(i==id)
				this.io.sockets.to(playerIO[i].first).emit("chatting", msg, name, "deeppink");
			else
				this.io.sockets.to(playerIO[i].first).emit("chatting", msg, name, color);
		}
		this.io.sockets.to(global.adminIO).emit('chatting', msg, name,color);
	}
	Notify(playerIO, msg) {
		console.log(msg, "notify");
		this.io.sockets.to(playerIO).emit("notify", msg);
	}
}

module.exports = Updateutil;

