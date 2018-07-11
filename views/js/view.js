var socket = io();

function hide_something(){
	// var planet_name = ['#m0','#m1','#m2','#m3','#m4','#m5','#m6','#m7','#m8','#m9','#c0','#c1','#c2','#c3','#c4','#a0','#a1',"#a2","#a3","#a4","#a5","#a6",'#a7','#a8','#a9','#a10','#a11','#a12','#a13','#a14'];
	// var arrayLength = planet_name.length;
	for (var i = 0; i < arrayLength; i++) {
		$(planet_name[i]).hide();
	}	
}

function login() {
	playerId = Number( $('#teamID').val() );
	playerName = $('#teamName').val();
	password = $('#teamPassword').val();
	$('#login').hide();
	console.log(playerId, playerName, password);

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
	$("#" + star_id).switchClass('planet-unreached', 'planet-' + star_id.charAt(0) );

}
socket.on("ship_mission", (baseID, targetID) => ship_mission(baseID, targetID));
socket.on("leaderboard", (username, money) => update_rank(username,money));
socket.on("new_day", (day) => update_day(day));

// call me with a number and a planet ID
function ship_mission(baseID,targetID){
	console.log("b"+baseID+"-"+targetID)
	var x = document.getElementById("b"+baseID+"-"+targetID);   // Get the element with id="demo"
	x.style.display = 'block';

}

// give me list of ranking, get view~
function update_rank(name,score){
	for (var i = 0; i < 5; i++){
		if (score[i] == undefined){
			document.getElementById((i+1) + '-score').textContent=0;
			console.log("undefined score" + i);
		}
		else{
			document.getElementById((i+1) + '-score').textContent=score[i];
		}
		if (name[i] == undefined){
			document.getElementById((i+1)+'-name').textContent="CSIE";
		}
		else{
			document.getElementById((i+1)+'-name').textContent=name[i];
		}
	}
}

function update_day(day){
	$("#day").text(day);
	return;
}





