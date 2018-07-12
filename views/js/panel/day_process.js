// update panel on day process

socket.on('worker', (miner, trainer, hacker) => day_update_worker(miner, trainer, hacker));
socket.on('money', (money) => day_update_money(money));
socket.on('item', (type, subtype, amount) => day_update_item(type, subtype, amount));

function day_update_worker(miner, trainer, hacker){
	$("#working_miner_num").text(miner);
	$("#working_trainer_num").text(miner);
	$("#working_hackerer_num").text(hacker);
}

function day_update_money(money){
	$("#Money").text(money);
}

function day_update_item(type, subtype, amount){
	if (type == "dataset"){
		var id = subtype+"_num";
		$("#"+id).text(amount);
	} 
	else if(type == "model") {
		var id = subtype+"M_num";
		$("#"+id).text(amount);
	}	
}