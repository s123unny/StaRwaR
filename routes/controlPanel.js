var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:pwd', function(req, res) { //id = req.query.id
  console.log(model.stars.list_from_type("unknown"));
  console.log("--------------------------------------");
  console.log(model.players[req.query.id].skill)
  console.log("--------------------------------------");
  res.render('second_index.ejs', {
    player_id: req.query.id,
    player: model.players[req.query.id],
    ships: model.players[req.query.id].ships,
    stars: model.stars,
    mines: model.stars.list_from_type("mine", req.query.id),
    unknowns: model.stars.list_from_type("unknown", req.query.id),
    computers: model.stars.list_from_type("computer", req.query.id),
    abandons: model.stars.list_from_type("abandon", req.query.id),
    skill: model.players[req.query.id].skill,
  })
});

module.exports = router;