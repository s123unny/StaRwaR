class Day{
	constructor(day){
		this.total_day = day;
		this.cur_day = 1
		console.log("Game Ends at Day "+this.total_day);
		console.log("Now is day " + (this.cur_day));
	}
	display(){
		console.log("Now is day " + (this.cur_day));
		if (this.cur_day >= this.total_day){
			console.log("Game over !");
			return false;
		}
		return this.cur_day;
		
	}
	tick(){
		this.cur_day += 1;
		return this.display();
	}
}

module.exports = Day