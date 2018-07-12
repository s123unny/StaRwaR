const pos = {
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

const id2name = {m0: "s0", m1:"s25", m2:'s12', m3:'s21', m4:'s7', m5:'s6', m6:'s13', m7:'s22', m8:'s14', m9:'s1', a0: 's15', a1:'s2', a2:'s28', a3:'s26', a4:'s29', a5:'s5', a6:'s24', a7:'s23', a8:'s11', a9:'s17', a10:'s16', a11:'s18', a12:'s27', a13:'s20', a14:'s19', c0:'s10', c1:'s8', c2:'s3', c3:'s9', c4:'s4', b0:'Base0', b1:'Base1', b2:'Base2', b3:'Base3', b4:'Base4'}

var socket = io();

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
socket.on("ship_back", (baseID, targetID) => ship_back(baseID, targetID));
socket.on("leaderboard", (username, money) => update_rank(username,money));
socket.on("new_day", (day) => update_day(day));
socket.on("leftTime", (time) => update_time(time));
socket.on("howhow",(ooooooo) => howhow(ooooooo));
// call me with a number and a planet ID
function ship_mission(baseID,targetID){
	console.log("b"+baseID+"-"+targetID)
	var x = document.getElementById("b"+baseID+"-"+targetID);   // Get the element with id="demo"
	x.style.display = 'block';

}

function howhow(baseID){
	$("#b" + baseID).switchClass('planet-base', 'planet-howhow');
}

function ship_back(baseID,targetID){
	console.log("b"+baseID+"-"+targetID)
	var x = document.getElementById("b"+baseID+"-"+targetID);
	x.style.display = 'none';
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
	$("#tick").text(time+" Galaxy Standard Hour");
	return;
}

function show_pos(id){
	$("#"+id+"_pos").text(id2name[id]+" : ("+pos[id]['x_pos']+","+pos[id]['y_pos']+")");
	$("#"+id+"_pos").show();
}

function close_pos(id){
	$("#"+id+"_pos").hide();
}



