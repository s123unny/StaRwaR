var socket = io();

function login() {
	console.log("here")
	playerId = Number( $('#teamID').val() );
	playerName = $('#teamName').val();
	password = $('#teamPassword').val();
	$('#container').show();
	$('#login').hide();
	socket.emit("login", playerId, playerName, password);
	var url = "/controlPanel/"+password+"?id="+playerId;
	window.open(url);
}

socket.on("adminStartButton", function() {
	$('#StartButton').show();
});
function start() {
	socket.emit('gameStart');
}


