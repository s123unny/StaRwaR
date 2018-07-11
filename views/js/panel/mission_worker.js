/* This file is for update mission block */

var skill = {
	skill1: {name:"old_king", state: "know"},
	skill2: {name:"oil_gas", state: "know"},
	skill3: {name:"ssh", state: "unknown"},
	skill4: {name:"validation", state: "learnable"},
	skill5: {name:"employment", state: "know"},
	skill6: {name:"old_king", state: "know"},
	skill7: {name:"old_king", state: "know"},
	skill8: {name:"old_king", state: "know"},
	skill9: {name:"old_king", state: "know"},
	skill10: {name:"old_king", state: "know"},
	skill11: {name:"old_king", state: "know"},
	skill12: {name:"old_king", state: "know"},
	skill13: {name:"old_king", state: "know"},
	skill14: {name:"old_king", state: "know"},
	skill14: {name:"old_king", state: "know"},
}

/* Learn the skill */
function learn(name){
	$('#'+name+'.skill').click();
}

/* After choosing type */
function render_target(row){
	console.log("render target" + row);
	var all_type = ["mine", "computer", "abandon", "unknown", "learn"];
	var type = $('#assign_mblock_slot'+row+'_type').val();
	
	// hide and show option
	for (var idx = 0; idx < all_type.length; idx++){
		if (all_type[idx] != type){
			$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").hide();
		}
		else{
			$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").show();
		}		
	}

	// hide and show option
	for (var idx = 0; idx < all_type.length; idx++){
		if (all_type[idx] != type){
			$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").hide();
		}
		else{
			$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").show();
		}		
	}

	return;
}

// upload model
function submit_model(type){
		try{
			var check = $('#submit_confirm').attr('disabled');
		}
		catch{
			var check = true;
		}
		if (check == "disabled"){
			return;
		}
        $.confirm({
	    'title'     : 'Assign Confirmation',
	    'message'   : 'You are about to hand on trained AI model. <br />It cannot be modified further after comfirmation!',
	    'buttons'   : {
		'Yes'   : {
		    'class' : 'yes_option',
		    'action': function(){confirm_model(type);}
		},
		'No'    : {
		    'class' : 'no_option',
		    'action': function(){console.log('Cancel submission.');}
		}
	    }
	});
}

function confirm_model(type){
	console.log("Sure to give model");
	/* check if it is ok */
	var all_type = ["image", "audio", "text"];
	var model_val = $('#'+type+"M_num").text();
	if (model_val == 0){
		myalert("You don't have any valuable model !");
		return;
	}
	for (var i = 0; i < all_type.length; i++){
		if (all_type[i] == type){
			console.log(type);
			$("#submit_"+type).text("Confirm");			
		}
		else{
			$("#submit_"+all_type[i]).hide();
		}
	}
	$("#submit_"+type).attr('id', 'submit_confirm');
	$("#"+type+"M_num").attr('id', 'confirm_model_value');
	$('#submit_confirm').attr('disabled', true);
}


/* click button and assign work */

function submit_mission(row){
        $.confirm({
	    'title'     : 'Assign Confirmation',
	    'message'   : 'You are about to assign work. <br />It cannot be modified further after comfirmation!',
	    'buttons'   : {
		'Yes'   : {
		    'class' : 'yes_option',
		    'action': function(){freeze_submit_block(row);}
		},
		'No'    : {
		    'class' : 'no_option',
		    'action': function(){console.log('Cancel submission.');}
		}
	    }
	});
}

function update_value(miner, trainer, hacker){
	var standby_trainer_num = Number($('#standby_trainer_num').text());
	var standby_miner_num = Number($('#standby_miner_num').text());
	var standby_hacker_num = Number($('#standby_hacker_num').text());
	var working_trainer_num = Number($('#working_trainer_num').text());
	var working_miner_num = Number($('#working_miner_num').text());
	var working_hacker_num = Number($('#working_hacker_num').text());
	var ship = Number($('#Ship').text());
	standby_trainer_num -= trainer;
	standby_miner_num -= miner;
	standby_hacker_num -= hacker;
	ship -= 1;
	working_trainer_num += trainer;
	working_miner_num += miner;
	working_hacker_num += hacker;
	$('#standby_trainer_num').text(standby_trainer_num);
	$('#standby_miner_num').text(standby_miner_num);
	$('#standby_hacker_num').text(standby_hacker_num);
	$('#working_trainer_num').text(working_trainer_num);
	$('#working_miner_num').text(working_miner_num);
	$('#working_hacker_num').text(working_hacker_num);
	$('#Ship').text(ship);
	return;
}

function freeze_submit_block(row){

	console.log("Sure to assign work");
	/* check if it is ok */
	var ship = document.getElementById('Ship').textContent;
	// check ship
	if (ship == 0){
		myalert("You don't have any ships !");
		return;
	}

	// get value
	var miner = Number($('#assign_mblock_slot'+row+'_M').val());
	var trainer = Number($('#assign_mblock_slot'+row+'_T').val());
	var hacker = Number($('#assign_mblock_slot'+row+'_H').val());
	// invalid request
	
	if (miner < 0 || hacker < 0 || trainer < 0){
		myalert("This is feature <3 ");
		return;
	}
	var type_get = document.getElementById('assign_mblock_slot'+row+'_type');
	var carry_get = document.getElementById('assign_mblock_slot'+row+'_carry');
	var type = type_get.options[type_get.selectedIndex].value;
	var carry = carry_get.options[carry_get.selectedIndex].value;

	if (trainer > $('#standby_trainer_num').text()){
		myalert("You don't have enough trainer !");
		return;
	}
	if (miner > $('#standby_miner_num').text()){
		myalert("You don't have enough miner !");
		return;
	}
	if (hacker > $('#standby_hacker_num').text()){
		myalert("You don't have enough hacker !");
		return;
	}
	if (type == 'ai_center' && carry == 'nothing'){
		myalert("Prepare some Datasets before training !");
		return;
	}

	// update value / text
	update_value(miner, trainer, hacker);	// carry item ?
	// fixed 
	$('#assign_mblock_slot'+row+'_submit').attr('disabled', true);
	$('#assign_mblock_slot'+row+'_type').attr('disabled', true);
	$('#assign_mblock_slot'+row+'_target').attr('disabled', true);
	$('#assign_mblock_slot'+row+'_carry').attr('disabled', true);
	$('#assign_mblock_slot'+row+'_M').attr('disabled', true);
	$('#assign_mblock_slot'+row+'_T').attr('disabled', true);
	$('#assign_mblock_slot'+row+'_H').attr('disabled', true);
	// append block on it
	var iDiv = document.createElement('div');
	iDiv.style.position="relative";
	iDiv.style.marginTop="-29.5px";
	//iDiv.style.zIndex='100'; 
	iDiv.style.backgroundColor="#C53131";
	iDiv.style.opacity=0.5;
	iDiv.style.width="720px";
	iDiv.style.height="28px";
	iDiv.style.borderStyle="none";
	iDiv.style.borderRadius="8px"
	var cDiv = document.getElementById('assign_mblock_slot'+row);
	cDiv.parentNode.append(iDiv);
}

/* come back function */
function comeback(row){
	console.log("callback");

	var state = document.getElementById('ongoing_mblock_slot'+row+'_State').textContent;
	console.log(state);
	if (state == "Ongoing"){
		document.getElementById('ongoing_mblock_slot'+row+'_withdraw').checked = false;
		myalert("You can't call ongoing workers back !");
		// myalert("Just Monika");
		return;
	}
	else{
		return;
	}
}


function myalert(msg){
        $.alert({
	    'message'   : msg,
	    'buttons'   : {
		'Got It'   : {
		    'class' : 'alert_box',
		    'action': function(){}
		}
	    }
	});
}
