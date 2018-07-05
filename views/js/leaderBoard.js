function addName(msg){
	for (var i = 0; i <= 4; i++) {
		$('#player'+i+'name').text(msg[i]);
	}
	console.log(msg);
}
socket.on('leaderboardname',(msg) => addName(msg));