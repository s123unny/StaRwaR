var socket = io();
socket.on('night_start', (player_id) => get_pannel(player_id));
socket.on('nightTimeUp', () => collect_pannel());

function get_pannel() {
  console.log("get_pannel")
  window.location.reload();
}

/*return
id
ships[5]:
  重新指派或叫回: call下面的function建一個 //叫回填false
  維持不變就填null (render的時候應該可以用label之類的記ship Id吧)
  沒有攜帶dataset Type就填null
money
workers: [num_of_miner, num_of_trainer, num_of_haker]
hand_on_AImodel //填type 沒有填null
*/


function collect_pannel() {
  var pid = Number($('#player_id').text());
  var money = Number($('#Money').text());
  var num_of_trainer = Number($('#standby_trainer_num').text()) + Number($('#working_trainer_num').text());
  var num_of_miner = Number($('#standby_miner_num').text()) + Number($('#working_miner_num').text());
  var num_of_haker = Number($('#standby_hacker_num').text()) + Number($('#working_hacker_num').text());
  var workers = [num_of_miner, num_of_trainer, num_of_haker];
  var hand_on_AImodel = null;
  var ships = [];
  for (var i = 0; i < 5; i++) {
    ships.push(get_ship_info(i));
  }
  console.log(ships);
  
  socket.emit("collectData", pid, ships, money, workers, hand_on_AImodel);
}

function get_ship_info(sid) {
  if($('#going_mblock_slot'+sid).length) {  // for ongoing ship
    //pending: 確定onging 船隻狀況
  } else if ($('#assign_mblock_slot'+sid).length) { // for standby ship
    if ($('submitted'+sid).length) {
    // if (sid == 1) {  // 測試用，把這行打開上面註解掉就可以看到有一艘船的回傳資料
      var miner = Number($('#assign_mblock_slot'+sid+'_M').val());
      var trainer = Number($('#assign_mblock_slot'+sid+'_T').val());
      var hacker = Number($('#assign_mblock_slot'+sid+'_H').val());

      var targetId = $('#assign_mblock_slot'+sid+'_target').find(":selected").text()
      var datasetType = $('#assign_mblock_slot'+sid+'_carry').find(":selected").text()
      if (datasetType == "Nothing") {
        datasetType = null;
      }
      return ship(sid, miner, trainer, hacker, targetId, datasetType);
    }
    else {
      return null
    }
  }
}

function ship(id, miner, trainer, haker, targetId, datasetType) {
  return {
    id: id,
    num_of_miner: miner,
    num_of_trainer: trainer,
    num_of_haker: haker,
    dayLeft: null,
    targetId: targetId,
    datasetType: datasetType,
    datasetAmount: null,
  };
}

