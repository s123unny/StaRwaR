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
var message_count = 30
//var chatcolor = ["aqua", "yellow", "orange", "pink", "violet", "lime", "salmon", "lime", "cyan", "chartreuse"]
function addMessage(inner,name,color){
	counter += 1;
	console.log(inner);
	var paragraph = document.getElementById("chat_msg");
	if(counter < message_count){
		chatbox[counter] = "["+ name + "] " + inner;
		chatcolor[counter] = color;
		console.log(chatbox[counter]);
		// var s = "<ul class= 'chatroom-text' id = 'chatroom-text-"+counter+"'"+">" + "["+name+"] "+inner+"</ul>";
		// $('#chat_msg').append(s);
		// paragraph.innerHTML += s;
		$('#chatroom-text-'+counter).text(chatbox[counter]);
		document.getElementById("chatroom-text-"+counter).style.color = chatcolor[counter];
	}
	else{
		for (var i = 0; i < message_count-1; i++) {
			chatbox[i] = chatbox[i+1];
			chatcolor[i] = chatcolor[i+1];
			$("#chatroom-text-" + String(i)).text(chatbox[i+1]);
			document.getElementById("chatroom-text-"+String(i)).style.color = chatcolor[i+1];
		}
		chatbox[message_count-1] = "["+ name + "] " + inner;
		chatcolor[message_count-1] = color;
		$("#chatroom-text-29").text(chatbox[message_count-1]);
		document.getElementById("chatroom-text-29").style.color = chatcolor[message_count-1];
	}
}