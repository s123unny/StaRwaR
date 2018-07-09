function addNotifyAlert(msg){
	alert(msg);
}

socket.on('notify', (msg) => addNotifyAlert(msg));