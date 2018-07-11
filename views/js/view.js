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
	var planet_name = ['#m0','#m1','#m2','#m3','#m4','#m5','#m6','#m7','#m8','#m9','#c0','#c1','#c2','#c3','#c4','#a0','#a1',"#a2","#a3","#a4","#a5","#a6",'#a7','#a8','#a9','#a10','#a11','#a12','#a13','#a14'];
	var arrayLength = planet_name.length;
	for (var i = 0; i < arrayLength; i++) {
		$(planet_name[i]).hide();
    //Do something
	}


	socket.emit("login", playerId, playerName, password);
	if (playerId >= 0 && playerId < 5) {
		var url = "/controlPanel/"+password+"?id="+playerId;
		window.open(url);
	}
}



socket.on("new_star", (targetID) => new_star(targetID));
// call me when you want to display some planet
function new_star(star_id){
	console.log(star_id)
	$("#_" + star_id).hide();
	$("#" + star_id).show();

}
socket.on("ship_mission", (baseID, targetID) => ship_mission(baseID, targetID));
socket.on("ship_back", (baseID, targetID) => ship_back(baseID, targetID));
socket.on("chatting", (message,name) => jser(message,name));
socket.on("leaderboard", (username, money) => update_rank(username,money));

// call me with a number and a planet ID
function ship_mission(baseID,targetID){
	console.log("b"+baseID+"-"+targetID)
	var x = document.getElementById("b"+baseID+"-"+targetID);   // Get the element with id="demo"
	x.style.display = 'block';

}
function ship_back(baseID,targetID){
	console.log("b"+baseID+"-"+targetID)
	var x = document.getElementById("b"+baseID+"-"+targetID);
	x.style.display = 'none';
}
// this function can update information in left top box
function player_info(name,somthing){
	document.getElementById("player-name").textContent=name;
	document.getElementById("else").textContent = somthing;
}

// give me list of ranking, get view~
function update_rank(name,score){
	for (var i = 0; i < 5; i++){
		document.getElementById(i + '-score').textContent=name[i] + " : " + score[i];
	}
}

// give me what you want to show in chanroom
var counter;
function jser(inner,name){
	if (this.counter == undefined)
		this.counter = 0;
	else
		counter += 1;
	console.log("XD");
	console.log(counter)
	var paragraph = document.getElementById("c-room");
	paragraph.innerHTML += "<div class = 'chatroom-text' id = 'chatroom-text-" + counter + "style = 'width:100px;'>" + name + ":" + inner + "</div>";
	// counter += 1;
	if (counter > 9){
		// var parent = document.getElementById("div1");
		var child = document.getElementById("chatroom-text-" + (counter-10));
		paragraph.removeChild(child);
	}


}
