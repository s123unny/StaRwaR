const stars = {
	m0: {id: "m0", x_pos: 4, y_pos: 3}, 
	m1: {id: "m1", x_pos: 9, y_pos: 0}, 
	m2: {id: "m2", x_pos: 0, y_pos: 5}, 
	m3: {id: "m3", x_pos: 11, y_pos: 1}, 
	m4: {id: "m4", x_pos: 3, y_pos: 8}, 
	m5: {id: "m5", x_pos: 4, y_pos: 7}, 
	m6: {id: "m6", x_pos: 5, y_pos: 5}, 
	m7: {id: "m7", x_pos: 4, y_pos: 1}, 
	m8: {id: "m8", x_pos: 1, y_pos: 2}, 
	m9: {id: "m9", x_pos: 9, y_pos: 8},
	c0: {id: "c0", x_pos: 2, y_pos: 8},
	c1: {id: "c1", x_pos: 5, y_pos: 3},
	c2: {id: "c2", x_pos: 2, y_pos: 1},
	c3: {id: "c3", x_pos: 9, y_pos: 3},
	c4: {id: "c4", x_pos: 3, y_pos: 9},
	a0: {id: "a0", x_pos: 10, y_pos: 3},
	a1: {id: "a1", x_pos: 8, y_pos: 3},
	a2: {id: "a2", x_pos: 5, y_pos: 1},
	a3: {id: "a3", x_pos: 9, y_pos: 5},
	a4: {id: "a4", x_pos: 8, y_pos: 9},
	a5: {id: "a5", x_pos: 0, y_pos: 3},
	a6: {id: "a6", x_pos: 4, y_pos: 9},
	a7: {id: "a7", x_pos: 3, y_pos: 1},
	a8: {id: "a8", x_pos: 0, y_pos: 6},
	a9: {id: "a9", x_pos: 2, y_pos: 5},
	a10: {id: "a10", x_pos: 3, y_pos: 3},
	a11: {id: "a11", x_pos: 3, y_pos: 7},
	a12: {id: "a12", x_pos: 9, y_pos: 1},
	a13: {id: "a13", x_pos: 0, y_pos: 4},
	a14: {id: "a14", x_pos: 4, y_pos: 2},
	b0: {id: "b0", x_pos: 2, y_pos: 6},
	b1: {id: "b1", x_pos: 6, y_pos: 2},
	b2: {id: "b2", x_pos: 7, y_pos: 6},
	b3: {id: "b3", x_pos: 5, y_pos: 4},
	b4: {id: "b4", x_pos: 10, y_pos: 3}
}


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
socket.on("leftTime", (time) => update_time(time));

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

function update_time(time){
	if (time == 0){
		$("#Timer").hide();
		return;
	}
	$("#Timer").show();
	$("#tick").text(time+" second");
	return;
}

setInterval(function(){
	// console.log("XDDDDDDDD");
	var planet_name = ['#m0','#m1','#m2','#m3','#m4','#m5','#m6','#m7','#m8','#m9','#c0','#c1','#c2','#c3','#c4','#a0','#a1',"#a2","#a3","#a4","#a5","#a6",'#a7','#a8','#a9','#a10','#a11','#a12','#a13','#a14'];
	for (var idx = 0; idx < planet_name.length; idx++){
		var star = $(planet_name[idx]);
		if ($star.is(":hover")){
			console.log(star);
			// console.log()
		}
	}
    var $sample = $("#m0");
    if($sample.is(":hover")) {
       $sample.css("background", "yellow");
    }
    else {
       $sample.css("background", "");
    }
}, 1);


