var q;
var array;
var tmp;
//$('#questionBox').hide();
function showQuestion(questions,array){
	
	q=questions;
	
	console.log("Question: "+q.id);
	$('#questionBox').show();
	$('#questionBox #timeLeft').show();
	$('#questionBox .closeButton').hide();
	$('#questionBox #answerResult').hide();
	$('#questionBox .questionTitle h1').text(q.subject);
	$('#questionBox .qDes p').html(q.description);
	
	if(array[playerId]!=null){
		$("#submitButton").show();
		console.log("can submit== "+playerId);
	}
	else {
		$("#submitButton").hide();
		console.log("can not submit== "+playerId);
		
	}

	if( q.multi ) {
		$('#questionBox #multiOptions').show();
		$('#questionBox #singleOptions').hide();
		for (var i = 0; i < 5; i++) {
			if( i < q.options.length ) {
				$('#mop'+i).show();
				$('#mop'+i+' label').text( q.options[i] );
			}
			else $('#mop'+i).hide();
		}
	}
	else {
		$('#questionBox #multiOptions').hide();
		$('#questionBox #singleOptions').show();
		for (var i = 0; i < 5; i++) {
			if(i<q.options.length){
				$('#sop'+i).show();
				$('#sop'+i+' label').text( q.options[i] );
			}
			else			
				$('#sop'+i).hide();
		}
	}
	$('#questionBox form').show();

	var cnt = 30;
	$('#questionBox #timeLeft').text('剩餘時間：'+cnt);
	tmp=0;//set timer
	timer =  setInterval(function(){
		cnt--;
		$('#questionBox #timeLeft').text('剩餘時間：'+cnt);
		if( cnt == 0 ) {
			clearInterval(timer);
			$('#questionBox #timeLeft').hide();
			$("#submitButton").hide();
			socket.emit("answer_question",q, [],playerId);
			if((array[playerId])){$('#answerResult .title').text("來不及了QQ");
			}
			tmp=1;//clear timer
		}
	} , 1000);

}

function submitAnswer() {
	tmp=1;
	clearInterval(timer);
	$('#questionBox #timeLeft').hide();
	var ans = [];
	//var q = questions;
	if( !q.multi ) ans.push( Number( $('input[name=qq]:checked').val() ) );
	else {
		$("input:checkbox[name=mq]:checked").each( function(){
		    ans.push( Number( $(this).val() ) );
		});
	}
	console.log("player answer : "+ ans);
	$('#submitButton').hide();
	socket.emit('answer_question',q, ans,playerId);
	console.log("send answer and q: "+ q.id);
	$('#answerResult  .questionTitle').text("waiting for others");
	$('#questionBox form').find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}

function showAnswer( q,returnArray,array ) {
	
	if(tmp==0){
		clearInterval(timer);
		$('#questionBox #timeLeft').hide();
		$("#submitButton").hide();
	}
	if (returnArray[playerId]!=null) {
		$('#answerResult  .questionTitle').text("搶答成功!");
		//$('#answerResult img').attr( 'src', "img/correct.png" );
		console.log(playerId+" answer correct");
	}
	else if(array[playerId]!=null){
		$('#answerResult  .questionTitle ').text("搶答失敗");
		//$('#answerResult img').attr( 'src', "img/wrong.png" );	
		console.log(playerId+" answer wrong");
	}
	else{
		$('#answerResult .questionTitle ').text("搶答結束");
		console.log(playerId+" no need answer");
	}

	var correctAns = '正確答案：';
	console.log("correct ans # :"+ q.correct.length);
	for (var i = 0; i < q.correct.length; i++) {
		if( i!=0 ) correctAns += ",\n   ";
		correctAns += ( q.options[ q.correct[i] ] );
	}
	console.log(correctAns);

	$('#questionBox #answerResult p').text(correctAns);
	//$('#questionBox form').hide();
	if(playerId==87)//admin
		$('#questionBox .closeButton').show();
	$('#questionBox #answerResult').show();
}
socket.on('show_answer',(q,returnArray,array)=>showAnswer(q,returnArray,array));

function sendcloseQ(){
	socket.emit("sendCloseQsig");
	//console.log("onclick sendcloseQsig");
}

function closeQuestion() {
	console.log("close");
	$('#questionBox').hide();
//	showTurnOver();
}
socket.on('needQuestion',(questions,array)=> showQuestion(questions,array));
socket.on('closeQ',()=>closeQuestion());
