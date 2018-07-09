var socket = io();
function init() {
  console.log("night")
  socket.on('night_start', (player_id) => get_pannel(player_id));
}

function get_pannel() {
  console.log("get_pannel")
  window.location.reload();
}

