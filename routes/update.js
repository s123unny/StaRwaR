class Updateutil{
	constructor(io){
		this.io = io;
	}
	Leaderboard(players){
		username = [];
		money = [];
		for (var i = 0; i < 5; i++) {
			username.push(players[i].username);
			money.push(players[i].money);
		}
		console.log(username)
		console.log(money)
		this.io.emit('leaderboard', username, money);
	}
	Skill(playerIO, skill){
	
	}
	Star(star){
		this.io.emit('lightupStar', star);	
	}
	Worker(playerIO, miner, trainer, haker) {
		this.io.socket.to(playerIO).emit("worker", miner, trainer, haker);
	}
	Money(playerIO, money) {
		this.io.socket.to(playerIO).emit("money", money);
	}
	Item(playerIO, item, amount) { 
		this.io.socket.to(playerIO).emit();	
	}
	Chatting(msg, name){
		console.log(msg);
		console.log(name);
		this.io.emit('chatting', msg, name);
	}
	Notify(playerIO, msg) {
		this.io.socket.to(playerIO).emit("notify", msg);
	}
}

module.exports = Updateutil;

