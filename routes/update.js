class Updateutil{
	constructor(io){
		this.io = io;
	}
	Leaderboard(username, money){
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
		
	}
	People(username){
		
	}
	Chatting(msg, name){
		console.log(msg);
		console.log(name);
		this.io.emit('chatting', msg, name);
	}
}

module.exports = Updateutil;

