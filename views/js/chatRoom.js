function sendMessage() {
	var msg = $('#messageForm').val();
	if(msg==''){return;}
	socket.emit('chat_message',msg);
	$('#messageForm').val('');
	return false;
}
function addMessage(msg,flag){
	$('#messages').prepend($('<li class='+flag+' >').text(msg));
	console.log(flag);
}
socket.on('chatting',(msg,flag) => addMessage(msg,flag));
$('#messageForm').keypress(function(e){
	var keyCode = e.keyCode || e.which;
	if (keyCode == '13'){
		sendMessage();
		return false;
	}
});
