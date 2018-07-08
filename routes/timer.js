class Timer{
	constructor(t){
		this.countdown = t;	// countdown for x second
		console.log("initialize time as " + (t/1000) + " seconds");
	}
	display(_this){
		console.log("Left " + (_this.countdown/1000) + " second ...");
		_this.countdown-=1000;
		if(_this.countdown<0){
			console.log("Time out !")
			clearInterval(this);
		}
	}
	tick(){
		setInterval(this.display,1000,this);
	}
}

module.exports = Timer