function sendMessage() {
	var msg = $('#messageForm').val();
	console.log(msg);
	if(msg==''){return;}
	socket.emit('chat_message',msg);
	$('#messageForm').val('');
	return false;
}
socket.on('chatting',(msg,flag) => addMessage(msg,flag));
$('#messageForm').keypress(function(e){
	var keyCode = e.keyCode || e.which;
	if (keyCode == '13'){
		sendMessage();
		return false;
	}
});
var counter = -1;
var chatbox = ["","","","","","","","","",""];
function addMessage(inner,name){
	counter += 1;
	console.log("XD");
	console.log(counter);
	var paragraph = document.getElementById("c-room");
	if(counter <= 9){
		chatbox[counter] = "["+ name + "]" + inner;
		paragraph.innerHTML += ("<div class = 'chatroom-text' id = 'chatroom-text-" + counter +"'"+ "style = 'width:100px;'>" +"["+ name + "]" + inner + "</div>");
	}
	else{
		for (var i = 0; i <= 8; i++) {
			chatbox[i] = chatbox[i+1];
			$("#chatroom-text-" + String(i)).text(chatbox[i+1]);
		}
		chatbox[9] = "["+ name + "]" + inner;
		$("#chatroom-text-9").text(chatbox[9]);
	}
}