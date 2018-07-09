var socket = io();
function add_skill(id) {
	console.log(id);
	socket.emit('skill',id);
}
function reviseSkill(skill,skillname){
	$('#'+skillname).text(String(skill.current)+'/'+skill.required);
	console.log(skill);
}
socket.on('skilltree',(skill,skillname) => reviseSkill(skill,skillname));

