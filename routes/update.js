class Updateutil{
	constructor(io){
		this.io = io;
	}
	Leaderboard(username, money){
		console.log(username)
		console.log(money)
		this.io.emit('leaderboard', username, money);
	}
	Skill(username, skill){
	
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

