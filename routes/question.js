module.exports = function(io,player){

	function answerQuestion(q,ans) {

		console.log("Player answer: " + ans);
		if (q==null)
			console.log("question is null");

		var correct=JSON.stringify(q.correct)==JSON.stringify(ans);
		if(correct){
			console.log("correct answer: " + ans);
		}
		io.emit("show_answer",q,correct);


	}
	
	player.on('answer_question',(q,ans)=>answerQuestion(q,ans));

//	console.log("get into answerQ: ");
}
//io.on('answer_question',(q,ans)=>answerQuestion(q,ans));
