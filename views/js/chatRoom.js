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
var counter;
function addMessage(inner,name){
	if (this.counter == undefined)
		this.counter = 0;
	else
		counter += 1;
	console.log("XD");
	console.log(counter);
	var paragraph = document.getElementById("c-room");
	paragraph.innerHTML += ("<div class = 'chatroom-text' id = 'chatroom-text-" + counter + "style = 'width:100px;'>" +"["+ name + "]" + inner + "</div>");
	if (counter > 9){
		// var parent = document.getElementById("div1");
		var child = document.getElementById("chatroom-text-" + (counter-10));
		console.log(typeof(child));
		paragraph.removeChild(child);
	}

}