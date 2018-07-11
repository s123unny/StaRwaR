var socket = io();

const name2id = {"&gamma;": "m0", "&lambda;": "m1", '&varrho;': "m2", '&psi;': "m3", '&omicron;': "m4", '&Omega;': "m5",'&varkappa;': "m6",'&rho;': "m7",'&alpha;': "m8",'&nu;': "m9", '&theta;':"a0",'&sigmaf;': "a1",'&tau;': "a2",'&chi;': "a3",'&beta;': "a4",'&epsilon;': "a5",'&omega;': "a6",'&delta;': "a7",'&iota;': "a8",'&mu;': "a9",'&xi;': "a10",'&backepsilon;': "a11",'&straightepsilon;': "a12",'&pi;': "a13",'&eta;': "a14",'&zeta;': "c0",'&omicron;': "c1",'&upsilon;': "c2",'&kappa;': "c3",'&phi;': "c4",'Base0': "b0",'Base1': "b1",'Base2': "b2",'Base3': "b3",'Base4': "b4"}

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
  console.log("collect_pannel");
  var pid = Number($('#player_id').text());
  var money = Number($('#Money').text());
  var num_of_trainer = Number($('#standby_trainer_num').text()) + Number($('#working_trainer_num').text());
  var num_of_miner = Number($('#standby_miner_num').text()) + Number($('#working_miner_num').text());
  var num_of_haker = Number($('#standby_hacker_num').text()) + Number($('#working_hacker_num').text());
  var workers = [num_of_miner, num_of_trainer, num_of_haker];
  var hand_on_AImodel = get_model_type();
  var ships = [];
  for (var i = 0; i < 5; i++) {
    ships.push(get_ship_info(i));
  }
  console.log(money, workers);
  
  socket.emit("collectData", pid, ships, money, workers, hand_on_AImodel);
  alert("時間到！請停止操作控制面板");
  disable_pannel();
}

function get_model_type() {
  if($('#confirm_model_type').length) {
    return $('#confirm_model_type').text();
  } else {
    return null;
  }
}

function get_ship_info(sid) {
  console.log("Get ship Info ")
  if($('#going_mblock_slot'+sid).length) {  // for ongoing ship
    if ($('#returned'+sid).length) {
      var targetId = $('#ongoing_mblock_slot'+sid+'_location').text();
      return ship(sid, -1, -1, -1, targetId, null);
    } else {
      return null;
    }
  } else if ($('#assign_mblock_slot'+sid).length) { // for standby ship
    if ($('#submitted'+sid).length) {
      var miner = Number($('#assign_mblock_slot'+sid+'_M').val());
      var trainer = Number($('#assign_mblock_slot'+sid+'_T').val());
      var hacker = Number($('#assign_mblock_slot'+sid+'_H').val());

      var targetname = $('#assign_mblock_slot'+sid+'_target').find(":selected").text()
      var targetId = name2id[targetname];
      console.log("==================");
      console.log(targetId);
      console.log("==================");
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

function disable_pannel() {
  $(".add_minus_button").css("display", "none");
  $(".submitter").css("display", "none");
  $(".submit_model").css("display", "none");
}
