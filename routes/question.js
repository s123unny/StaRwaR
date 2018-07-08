var q=require("./questionlist.js");

class questionevent{
	var returnArray;
	var count;
	var totalcount;
	var checkid=0;
	constructor(io){
		this.io=io;	
	}

	Init(player){
		player.on('answer_question',(q,ans,id)=>answerQuestion(q,ans,id));
	}
	
	Invoke(array){

		totalcount=0;
		count=0;
		if(q==NULL){
			q=require("./questionlist.js");
		}

		for(var i=0;i<5;i++){
			if(array[i]!=NULL){
				totalcount++;
				this.io.emit("needQuestion",q,"1");
			}
			else{
				returnArray[i]=NULL;
				this.io.emit("needQuestion",q,"0")
			}
		
		}

		checkid=setinterval("check_answer_num()",100);
		
		q=NULL;
		console.log("returnArray= "+returnArray );
		return returnArray;
	}
	function check_answer_num(){
	
		if(count==totalcount)&&(totalcount!=0){
		
			clearinterval(checkid);
		
		}
	
	
	}
	function answerQuestion(q,ans,id) {
		//console.log("Player" + id +"answer: " + ans);
		if (q==null){
			console.log("question is null");
		}
		var correct=JSON.stringify(q.correct)==JSON.stringify(ans);
		if(count==0){
			console.log("correct answer: " + ans);
		}
		console.log("Player" + id +"answer: " + ans);
		count++;
		if(count==totalcount){
			for(var i=0;i<5;i++){
				if(returnArray[i]==array[i]){ //correct answer
					this.io.emit("show_answer",q,"1",i);
				}
				else if(array[i]!=NULL){ //wrong answer
					this.io.emit("show_answer",q,"0",i);
				}
				else{		//audience	
					this.io.emit("show_answer",q,"2",i);
				}				
			}
			this.io.emit("show_answer",q,"9",9);
		}
	}

//	console.log("get into answerQ: ");
}

module.exports:questionevent;
