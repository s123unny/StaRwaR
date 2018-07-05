function addName(msg,id){
	var idname = '#player'+id+'name';
	if( 0 <= Number(id) && Number(id) <= 4)
		$(idname).text(msg);
	console.log(msg);
	console.log(id);

}
socket.on('leaderboardname',(msg,id) => addName(msg,id));