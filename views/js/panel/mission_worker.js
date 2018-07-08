/* This file is the communication between backend and frontend (mission worker) */

/* Times up ? */

/* click button and assign work */
function submit_mission(row){
	if (confirm("Sure to assign work ?")){
		console.log("Sure to assing work");
		// if checked ok 
		var type = document.getElementById('assign_mblock_slot'+row+'_type');
		var assing_obj = {
			miner:  Number($('#assign_mblock_slot'+row+'_M').val()),
			trainer: Number($('#assign_mblock_slot'+row+'_T').val()),
			hacker: Number($('#assign_mblock_slot'+row+'_H').val()),
			type: type.options[type.selectedIndex].value,
		}
		// var assing_obj = {
		// 	type: document.getElementById('assign_mblock_slot'+row+'_type').textContent,
		// 	location: document.getElementById('assign_mblock_slot'+row+'_location').textContent,
		// 	trainer: document.getElementById('assign_mblock_slot'+row+'_T').textContent,
		// 	miner: document.getElementById('assign_mblock_slot'+row+'_T').textContent,
		// 	hacker: document.getElementById('assign_mblock_slot'+row+'_T').textContent,
		// 	carry: document.getElementById('assign_mblock_slot'+row+'_T').textContent,
		// };
		console.log(assing_obj);
	}
	else{ 
		console.log("Cancel");
	}
	// socket.emit('submit_mission', money, num);
}
/* come back function */
function comeback(row){
	console.log("callback");
	console.log(row);
	// console.log(element.lengths)
	// console.log(typeof(element));
	// if (element.includes("after")){
	// 	console.log("AFTER");
	// }
	console.log(element);
	var state = document.getElementById('ongoing_mblock_slot'+row+'_State').textContent;
	if (state == "Ongoing"){
		console.log("You can't let Onging workers back !");
	}
	else{
		console.log("Call workers back !");

		var type = document.getElementById('ongoing_mblock_slot'+row+'_type').textContent;
		var location = document.getElementById('ongoing_mblock_slot'+row+'_location').textContent;
		var trainer = document.getElementById('ongoing_mblock_slot'+row+'_T').textContent;
		var miner = document.getElementById('ongoing_mblock_slot'+row+'_M').textContent;
		var hacker = document.getElementById('ongoing_mblock_slot'+row+'_H').textContent;
		console.log(trainer, miner, hacker);
		
	}
}