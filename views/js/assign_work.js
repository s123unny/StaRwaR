/* click button and assign work */

/* come back function */

function comeback(row){
	console.log("callback");
	console.log(row);

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