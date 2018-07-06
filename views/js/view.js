var socket = io();

function login() {
	console.log("here")
	playerId = Number( $('#teamID').val() );
	playerName = $('#teamName').val();
	password = $('#teamPassword').val();
	$('#container').show();
	$('#login').hide();
	$('#side-form').hide();
	socket.emit("login", playerId, playerName, password);
	socket.on();
}
var a = 1;
function list_clicker(){
	console.log("list_clicker")
	if (a == 1){
		$('#side-form').show();
		a = 0;
	}
	else{
		$('#side-form').hide();
		a = 1;
	}
}