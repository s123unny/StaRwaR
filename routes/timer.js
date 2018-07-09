class Timer{
	constructor(t, io, callback){
		this.io = io;	
		this.countdown = t;	// countdown for x second
		this.callback = callback;
		console.log("initialize time as " + (t/1000) + " seconds");
	}
	display(_this){
		console.log("Left " + (_this.countdown/1000) + " second ...");
		_this.io.emit("leftTime", _this.countdown/1000);
		_this.countdown-=1000;
		if(_this.countdown<0){
			console.log("Time out !")
			clearInterval(this);
			_this.callback();
		}
	}
	tick(){
		setInterval(this.display,1000,this);
	}
}

module.exports = Timer
