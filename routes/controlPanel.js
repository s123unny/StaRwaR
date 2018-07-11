var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:pwd', function(req, res) { //id = req.query.id
  // console.log(model.stars.list_from_type("unknown"));
  // console.log("--------------------------------------");
  // console.log(model.players[req.query.id].skill)
  // console.log("--------------------------------------");
  res.render('second_index.ejs', {
    player_id: req.query.id,
    player: model.players[req.query.id],
    ships: model.players[req.query.id].ships,
    stars: model.stars,
    mines: model.stars.list_from_type("mine", model.players[req.query.id].ships,),
    unknowns: model.stars.list_from_type("unknown", model.players[req.query.id].ships,),
    computers: model.stars.list_from_type("computer", model.players[req.query.id].ships,),
    abandons: model.stars.list_from_type("abandon", model.players[req.query.id].ships,),
    skill: model.players[req.query.id].skill,
	ship_status: ship_status(model.players[req.query.id].ships, req.query.id, model.stars, null), //todo
  })
});

function ship_status(ships, id, stars, skillid) {
	var status_array = [], list = [];
	if (skillid != null && !skillid.includes(id)) {
		list = [true, true, true, true, true];
	} else {
		list = [false, false, false, false, false];
		for (var i = 0; i < 5; i++) {
			if (stars["c"+i].dayLeft[id] != null) {
				list[ stars["c"+i].player_here[id] ] = true;
			}
		}
	}
	if (stars["a3"].cannotback != null) {
		list[ stars["a3"].player_here[id] ] = true;
	}
	for (var i = 0; i < 5; i++) {
		if (ships[i].targetId == null) {
			status_array.push("free");
		} else if (ships[i].dayLeft != 0) {
			status_array.push("going");
		} else {
			if (list[i]) {
				status_array.push("suspend");
			else {
				status_array.push("arrive");
			}
		}
	}
	return status_array;
}

module.exports = router;
