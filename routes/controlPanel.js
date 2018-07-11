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
  })
});

module.exports = router;