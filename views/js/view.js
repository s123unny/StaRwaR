var socket = io();

function login() {
	console.log("here")
	playerId = Number( $('#teamID').val() );
	playerName = $('#teamName').val();
	password = $('#teamPassword').val();
	$('#container').show();
	$('#login').hide();
	socket.emit("login", playerId, playerName, password);
}

socket.on("adminStartButton", function() {
	$('#StartButton').show();
});
function start() {
	socket.emit('gameStart');
}