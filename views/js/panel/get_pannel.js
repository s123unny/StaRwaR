var socket = io();
socket.on('night_start', (player_id) => get_pannel(player_id));

function get_pannel() {
  console.log("get_pannel")
  window.location.reload();
}

