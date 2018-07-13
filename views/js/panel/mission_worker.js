/* This file is for update mission block */

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
	if (type == "learn"){
		for (var idx = all_type.length - 1; idx >= 0; idx--){
			if (all_type[idx] != type){
				$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").hide();
			}
			else{
				$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").show();
			}		
		}		
	}
	else{
		for (var idx = all_type.length - 1; idx >= 0; idx--){
			if (all_type[idx] != type){
				$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").hide();
			}
			else{
				$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").show();
			}		
		}
		var div = document.querySelector("#assign_mblock_slot"+row+"_target"),
        	para = document.querySelectorAll("#assign_mblock_slot"+row+"_target option");
        var paraArr = [].slice.call(para).sort(function (a, b) {
        	return Number(a.textContent.substring(1)) > Number(b.textContent.substring(1)) ? 1 : -1;
    	});
    	// console.log(paraArr);
    	paraArr.forEach(function (p) {
        	div.appendChild(p);
    	});
	}

	// // hide and show option
	// for (var idx = 0; idx < all_type.length; idx++){
	// 	if (all_type[idx] != type){
	// 		$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").hide();
	// 	}
	// 	else{
	// 		$("#assign_mblock_slot"+row+"_target option[class="+all_type[idx]+"]").show();
	// 	}		
	// }

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
	$('#model_big_block').append('<span id="confirm_model_type" style="display: none;">'+type+'</span>')
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
	var target_get = document.getElementById('assign_mblock_slot'+row+'_target');
	var type = type_get.options[type_get.selectedIndex].value;
	var carry = carry_get.options[carry_get.selectedIndex].value;
	var target = target_get.options[target_get.selectedIndex].value;
	// target == None => 擋住
	console.log(target);
	if (target == "none"){
		myalert("You can't choose None as target =) ");
		return;
	}
	// 派出人數 > standby => 擋住
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
	// 有飛船沒人 => 擋住
	if (trainer == 0 && miner == 0 && hacker == 0){
		myalert("You can't assign mission without any workers !");
		return;
	}
	// 去 AI Center 沒帶東西 => 卡掉
	if (type == 'ai_center' && carry == 'nothing'){
		myalert("Prepare some Datasets before training !");
		return;
	}
	// 兩個 ship 去同一顆星球 => 卡掉
	for (var i = 0; i < 5; i++){
		console.log("row =", i);
		if (i == row){
			continue;
		}
		else if ($('assign_mblock_slot'+i+'_target') != null){
			console.log(i);
			console.log($('assign_mblock_slot'+i+'_target'));
			var slot = name2id[$('#assign_mblock_slot'+i+'_target').find(":selected").text()];
			if (slot == target){
				myalert("One ship one star <3 !");
				return;
			}
		}
	}

	// update value / text
	update_value(miner, trainer, hacker);	// carry item ?
	// fixed 
	$('#assign_mblock_slot'+row+'_submit').attr('disabled', true);
	// $('#assign_mblock_slot'+row+'_type').attr('disabled', true);
	// $('#assign_mblock_slot'+row+'_target').attr('disabled', true);
	// $('#assign_mblock_slot'+row+'_carry').attr('disabled', true);
	// $('#assign_mblock_slot'+row+'_M').attr('disabled', true);
	// $('#assign_mblock_slot'+row+'_T').attr('disabled', true);
	// $('#assign_mblock_slot'+row+'_H').attr('disabled', true);
	// append block on it
	var iDiv = document.createElement('div');
	iDiv.id="submitted"+row;
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
	$.confirm({
	    'title'     : 'Return Confirmation',
	    'message'   : 'You are about to return workers. <br />It cannot be modified further after comfirmation!',
	    'buttons'   : {
		'Yes'   : {
		    'class' : 'yes_option',
		    'action': function(){freeze_return_block(row);}
		},
		'No'    : {
		    'class' : 'no_option',
		    'action': function(){console.log('Cancel return.');}
		}
	    }
	});
	console.log("callback");
}

function freeze_return_block(row){

	console.log("Sure to return work");

	var state = document.getElementById('ongoing_mblock_slot'+row+'_State').textContent;
	console.log(state);
	if (state != "arrive"){
		myalert("You can't call these workers back !");
		// myalert("Just Monika");
		return;
	}

	// append block on it
	var iDiv = document.createElement('div');
	iDiv.id="returned"+row;
	iDiv.style.position="relative";
	iDiv.style.marginTop="-22px";
	iDiv.style.backgroundColor="#C53131";
	iDiv.style.opacity=0.5;
	iDiv.style.width="720px";
	iDiv.style.height="28px";
	iDiv.style.borderStyle="none";
	iDiv.style.borderRadius="8px"
	var cDiv = document.getElementById('going_mblock_slot'+row);
	cDiv.parentNode.append(iDiv);
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
