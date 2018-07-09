function Update_LeaderBoard(name, money){
	for (var i = 0; i <= 4; i++) {
		$('#player'+i+'name').text(name[i]);
		$('#player'+i+'money').text(money[i]);
	}
	console.log(name);
	console.log(money)
}
socket.on('leaderboard',(name, money) => Update_LeaderBoard(name, money));
