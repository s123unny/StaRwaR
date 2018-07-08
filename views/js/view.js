var socket = io();
function login() {
	console.log("here")
	playerId = Number( $('#teamID').val() );
	playerName = $('#teamName').val();
	password = $('#teamPassword').val();
	$('#container').show();
	$('#login').hide();
	$('#side-form').hide();
	$('#planet-blue').hide();
	$('#planet-red').hide();
	$('#planet-orange').hide();
	$("#m0").hide();
	var planet_name = ['#m0','#m1','#m2','#m3','#m4','#m5','#m6','#m7','#m8','#m9'];

	var arrayLength = planet_name.length;
	console.log(arrayLength)
	for (var i = 0; i < arrayLength; i++) {
		console.log(planet_name[i]);
		$(planet_name[i]).hide();
    //Do something
	}
	document.getElementsByClassName('planet-blue')[0].style.visibility = 'hidden';
	// $('#planet-unreached').show();


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
function new_star(star_id){
	console.log(star_id + "hide")
	document.getElementById(star_id).style.display = 'none';
}