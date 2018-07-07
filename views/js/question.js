var q;

function showQuestion(questions){
	
	q=questions;

	console.log("Question: "+q.id);
	$('#questionBox').show();
	$('#questionBox #timeLeft').show();
	$('#questionBox .closeButton').hide();
	$('#questionBox #answerResult').hide();
	$('#questionBox .title h1').text(q.subject);
	$('#questionBox .qDes p').html(q.description);
	
	//if (playerId == model.nowPlaying) {
		$("#submitButton").show();
	//} else {
	//	$("#submitButton").hide();
	//}

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
	timer =  setInterval(function(){
		cnt--;
		$('#questionBox #timeLeft').text('剩餘時間：'+cnt);
		if( cnt == 0 ) {
			clearInterval(timer);
			socket.emit("answer_question",q, []);
			$('#questionBox #timeLeft').hide();
			$('#answerResult .title').text("來不及了QQ");
		
		}
	} , 1000);

}

function submitAnswer() {
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
	console.log("player ? answer : "+ ans);
	$('#submitButton').hide();
	socket.emit('answer_question',q, ans);
	console.log("send answer and q: "+ q.id);
	$('#questionBox form').find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}

function showAnswer( q,correct ) {

	if (correct) {
		$('#answerResult  .title').text("答對了！");
		//$('#answerResult img').attr( 'src', "img/correct.png" );
	}
	else {
		$('#answerResult  .title ').text("答錯了QQ");
		//$('#answerResult img').attr( 'src', "img/wrong.png" );
	}

	var correctAns = '正確答案：';
	console.log("correct ans # :"+ q.correct.length);
	for (var i = 0; i < q.correct.length; i++) {
		if( i!=0 ) correctAns += ",\n   ";
		correctAns += ( q.options[ q.correct[i] ] );
	}
	console.log(correctAns);

	$('#questionBox #answerResult p').text(correctAns);
	$('#questionBox form').hide();
	$('#questionBox .closeButton').show();
	$('#questionBox #answerResult').show();
}
socket.on('show_answer',(q,correct)=>showAnswer(q,correct));

function closeQuestion() {
	$('#questionBox').hide();
//	showTurnOver();
}
socket.on('needQuestion',(questions)=> showQuestion(questions));
