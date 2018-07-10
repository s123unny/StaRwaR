/* This file is for update mission block */

// This is the api what i define (type is the same as ms. Xiao )
var stars = { 
	star1: {name: "&alpha", type: 'mine'}, 
	star2: {name: "&beta", type: 'mine'}, 
	star3: {name: "&gamma", type: 'mine'}, 
	star4: {name: "&delta", type: 'mine'}, 
	star5: {name: "&epsilon", type: 'mine'}, 
	star6: {name: "&zeta", type: 'mine'}, 
	star7: {name: "&eta", type: 'mine'}, 
	star8: {name: "&theta", type: 'mine'}, 
	star9: {name: "&iota", type: 'mine'}, 
	star10: {name: "&kappa", type: 'mine'}, 
	star11: {name: "&lambda", type: 'ai_center'}, 
	star12: {name: "&mu", type: 'ai_center'}, 
	star13: {name: "&nu", type: 'ai_center'}, 
	star14: {name: "&xi", type: 'ai_center'}, 
	star15: {name: "&omicron", type: 'ai_center'}, 
	star16: {name: "&pi", type: 'ai_center'}, 
	star17: {name: "&rho", type: 'abandon'}, 
	star18: {name: "&sigmaf", type: 'mine'}, 
	star19: {name: "&sigma", type: 'mine'}, 
	star20: {name: "&tau", type: 'mine'}, 
	star21: {name: "&upsilon", type: 'mine'}, 
	star22: {name: "&phi", type: 'mine'}, 
	star23: {name: "&chi", type: 'mine'}, 
	star24: {name: "&psi", type: 'mine'}, 
	star25: {name: "&omega", type: 'mine'}, 
	star26: {name: "&varkappa", type: 'mine'}, 
	star27: {name: "&varrho", type: 'mine'}, 
	star28: {name: " &straightepsilon", type: 'mine'}, 
	star29: {name: "&backepsilon", type: 'mine'}, 
	star30: {name: "&Omega", type: 'mine'}, 
};

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
	var all_type = ["mine", "computer", "abandon", "unknown"];
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

	if (type != 'learn'){	
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
	else{	// query skill-tree
		return;
		var flag = true;
		for (var key in skill){
			if (skill[key].state == "learnable"){
				$("#assign_mblock_slot"+row+"_target").prepend("<option value='QQ'>"+skill[key].name+"</option>");
				flag = false;
			}
		}
		if (flag == false){
			$("#assign_mblock_slot"+row+"_target").prepend("<option value='QQ'>None</option>");
		}
	}
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
