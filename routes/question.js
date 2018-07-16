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
		this.flag=false;
	}

	Invoke(arr,statefrom,starid) {
		this.flag=true;
		array=arr;
		state=statefrom;
		substate=starid;
		console.log("player need question: ",array);
		q=require("./questionlist.js")();
		this.io.emit("needQuestion",q,array);

		//var test = co(function* (array){
		//var array=arr;	
		count=totalcount=0;
		
		for(var i=0;i<5;i++){
			if(array[i]!=null){
				totalcount++;
				console.log("id= "+i+" 需要回答問題: "+q.id+"  : totalcount++ = ",totalcount);
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
		if(count==1) console.log("totalcount= "+ totalcount);
		console.log("count= "+ count);

		if((correct)||(count==totalcount)){ //count ==5 when time up or no body correct
			
			if(correct){
				returnArray[id]=array[id]; //get the write ans
				console.log("player "+id+" answer correct");
				this.io.emit("show_answer",q,id);
			}
			else{
				console.log("nobody answer rightQQ");
				this.io.emit("show_answer",q,-1);
			}
			this.flag=false;
			this.callback(returnArray,state,substate);
			//console.log("arr=",array);//console.log("return arr=",returnArray);
			count=totalcount=0;	
		}
		else 
			console.log("wait for other answer");
	}
	needcloseQ(){
		this.io.emit("closeQ");
		questionflag = false;
		console.log("at route/question.js send closeQ");
		if (this.flag) {
			console.log("force next part");
			this.flag=false;
			arrayQQ = [null,null,null,null,null];
			this.callback(arrayQQ, state, substate);
	}

	Init(player){
		player.on('answer_question',(q,ans,id)=> this.answerQuestion(q,ans,id));
		player.on('sendCloseQsig',()=>this.needcloseQ());
	}
}

module.exports=questionevent;
