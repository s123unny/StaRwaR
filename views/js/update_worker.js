/* click button and add / minus people */

Hire = {'trainer': 20, 'miner': 30, 'hacker': 40};


function add_trainer(){
	console.log("Add trainer");
	var people_get = document.getElementById('trainer_num').textContent;
	var num = Number(people_get.substring(9));
	var money_get = document.getElementById('Money').textContent.split(' ');
	var money = money_get[2];
	if (money > Hire['trainer']){
		num += 1;
		money -= Hire['trainer'];
		console.log(money);
		console.log(num);
		$('#Money').text("Money : "+money+' BTC');
		$('#trainer_num').text("Number : "+num);
	}
	else{
		console.log("None");
	}
}

function minus_trainer(){
	console.log("Minus trainer");
	var people_get = document.getElementById('trainer_num').textContent;
	var num = Number(people_get.substring(9));
	if (num >= 1){
		num -= 1;
		$('#trainer_num').text("Number : "+num);
	}
	else{
		console.log("None");
	}
}

function add_miner(){
	console.log("Add trainer");
	var people_get = document.getElementById('miner_num').textContent;
	var num = Number(people_get.substring(9));
	var money_get = document.getElementById('Money').textContent.split(' ');
	var money = money_get[2];
	if (money > Hire['miner']){
		num += 1;
		money -= Hire['miner'];
		console.log(money);
		console.log(num);
		$('#Money').text("Money : "+money+' BTC');
		$('#miner_num').text("Number : "+num);
	}
	else{
		console.log("None");
	}
}

function minus_miner(){
	console.log("Minus trainer");
	var people_get = document.getElementById('miner_num').textContent;
	var num = Number(people_get.substring(9));
	if (num >= 1){
		num -= 1;
		$('#miner_num').text("Number : "+num);
	}
	else{
		console.log("None");
	}
}

function add_hacker(){
	console.log("Add hacker");
	var people_get = document.getElementById('hacker_num').textContent;
	var num = Number(people_get.substring(9));
	var money_get = document.getElementById('Money').textContent.split(' ');
	var money = money_get[2];
	if (money > Hire['hacker']){
		num += 1;
		money -= Hire['hacker'];
		console.log(money);
		console.log(num);
		$('#Money').text("Money : "+money+' BTC');
		$('#hacker_num').text("Number : "+num);
	}
	else{
		console.log("None");
	}
}

function minus_hacker(){
	console.log("Minus hacker");
	var people_get = document.getElementById('hacker_num').textContent;
	var num = Number(people_get.substring(9));
	if (num >= 1){
		num -= 1;
		$('#hacker_num').text("Number : "+num);
	}
	else{
		console.log("None");
	}
}
