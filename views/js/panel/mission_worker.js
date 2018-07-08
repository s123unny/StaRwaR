/* This file is for update mission block */

// This is the api what i define (type is the same as ms. Xiao )
var stars = { 
	star1: {name: "alpha", type: 'mine'}, 
	star2: {name: "beta", type: 'mine'}, 
	star3: {name: "gamma", type: 'mine'}, 
	star4: {name: "delta", type: 'mine'}, 
	star5: {name: "epsilon", type: 'mine'}, 
	star6: {name: "zeta", type: 'mine'}, 
	star7: {name: "eta", type: 'mine'}, 
	star8: {name: "m0", type: 'mine'}, 
	star9: {name: "m0", type: 'mine'}, 
	star10: {name: "m0", type: 'mine'}, 
	star11: {name: "m0", type: 'ai_center'}, 
	star12: {name: "m0", type: 'ai_center'}, 
	star13: {name: "m0", type: 'ai_center'}, 
	star14: {name: "m0", type: 'ai_center'}, 
	star15: {name: "m0", type: 'ai_center'}, 
	star16: {name: "m0", type: 'ai_center'}, 
	star17: {name: "m0", type: 'abandon'}, 
	star18: {name: "m0", type: 'mine'}, 
	star19: {name: "m0", type: 'mine'}, 
	star20: {name: "m0", type: 'mine'}, 
	star21: {name: "m0", type: 'mine'}, 
	star22: {name: "m0", type: 'mine'}, 
	star23: {name: "m0", type: 'mine'}, 
	star24: {name: "m0", type: 'mine'}, 
	star25: {name: "m0", type: 'mine'}, 
	star26: {name: "m0", type: 'mine'}, 
	star27: {name: "m0", type: 'mine'}, 
	star28: {name: "m0", type: 'mine'}, 
	star29: {name: "m0", type: 'mine'}, 
	star30: {name: "m0", type: 'mine'}, 
};
/* After choosing type */
function render_target(row){
	var type = $('#assign_mblock_slot'+row+'_type').val();
	$("#assign_mblock_slot"+row+"_target").empty();
	if (type != 'learn'){	// render all stars and choose one
		var flag = true;
		for (var key in stars){
			if (stars[key].type == type){
				$("#assign_mblock_slot"+row+"_target").prepend("<option value='QQ'>"+stars[key].name+"</option>");
				flag = false;
			}
		}
		if (flag == true){
			$("#assign_mblock_slot"+row+"_target").prepend("<option value='QQ'>None</option>");
		}
		return;
	}
	else{	// query skill-tree

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
		alert("You can't call ongoing workers back !");
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
