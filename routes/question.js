//var q=require("./questionlist.js");
//var checkid=0;
//var co=require('co');
var count=0,totalcount=0;
var returnArray=["","","","",""];
var array=["","","","",""];
var q;
var state,substate;
class questionevent{
	
	constructor(io,callback){
		this.io=io;	
		this.callback=callback;
	}

	Invoke(arr,state,substate) {
		array=arr;
		console.log("array ",array);
		q=require("./questionlist.js")();
		this.io.emit("needQuestion",q,array);

		//var test = co(function* (array){
		//var array=arr;	
		count=totalcount=0;
		
		for(var i=0;i<5;i++){
			if(array[i]!=null){
				totalcount++;
				//console.log(i+" : totalcount++ = ",totalcount);
			}
			returnArray[i]=null;
		}
		//console.log("return array when invoke: ", returnArray);	
		return returnArray;
	}

	answerQuestion(q,ans,id) {
		//console.log("get answer tmp=`" + tmp );
		if (q==null){
			console.log("question is null in ansQ");
		}
		var correct=JSON.stringify(q.correct)==JSON.stringify(ans);
		if(count==0){
			console.log("correct answer: " + q.correct);
		}
		console.log("Player " + id +" answer: " + ans);
		count++;
		console.log("count= "+ count);
		console.log("totalcount= "+ totalcount);

		if(correct||(count==totalcount)||(count==5)){ //count ==5 when time up or no body correct
			
			if(correct){
				returnArray[id]=array[id]; //get the write ans
				console.log("player "+id+" answer correct");
			}
			else{
				console.log("nobody answer rightQQ");
			}
			
			this.callback(returnArray,state,substate);
			//console.log("arr=",array);//console.log("return arr=",returnArray);
			this.io.emit("show_answer",q,returnArray,array);
			count=totalcount=0;	
		}
	}
	needcloseQ(){
		this.io.emit("closeQ");
		//console.log("at back send closeQ");
	}

	Init(player){
		player.on('answer_question',(q,ans,id)=> this.answerQuestion(q,ans,id));
		player.on('sendCloseQsig',()=>this.needcloseQ());
	}
}

module.exports=questionevent;
