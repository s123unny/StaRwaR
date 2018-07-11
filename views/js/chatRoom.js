function sendMessage() {
	var msg = $('#messageForm').val();
	console.log(msg);
	if(msg==''){return;}
	socket.emit('chat_message',msg);
	$('#messageForm').val('');
	return false;
}
socket.on('chatting',(msg,flag,color) => addMessage(msg,flag,color));
$('#messageForm').keypress(function(e){
	var keyCode = e.keyCode || e.which;
	if (keyCode == '13'){
		sendMessage();
		return false;
	}
});
var counter = -1;
var chatbox = ["","","","","","","","","",""];
var chatcolor = ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]
function addMessage(inner,name,color){
	counter += 1;
	console.log("XD");
	console.log(counter);
	var paragraph = document.getElementById("chat_msg");
	if(counter <= 9){
		chatbox[counter] = "["+ name + "]" + inner;
		chatcolor[counter] = color;
		console.log(chatbox[counter]);
		var s = "<ul class= 'chatroom-text' id = 'chatroom-text-"+counter+"'"+">" + "["+name+"]"+inner+"</ul>";
		// $('#chat_msg').prepend()
		paragraph.innerHTML += s;
		document.getElementById("chatroom-text-"+counter).style.color = chatcolor[counter];
	}
	else{
		for (var i = 0; i <= 8; i++) {
			chatbox[i] = chatbox[i+1];
			chatcolor[i] = chatcolor[i+1];
			$("#chatroom-text-" + String(i)).text(chatbox[i+1]);
			document.getElementById("chatroom-text-"+String(i)).style.color = chatcolor[i+1];
		}
		chatbox[9] = "["+ name + "]" + inner;
		chatcolor[9] = color;
		$("#chatroom-text-9").text(chatbox[9]);
		document.getElementById("chatroom-text-9").style.color = chatcolor[9];
	}
}