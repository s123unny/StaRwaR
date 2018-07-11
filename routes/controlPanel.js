var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:pwd', function(req, res) { //id = req.query.id
  console.log(model.stars.list_from_type("unknown"));
  console.log("--------------------------------------");
  console.log(model.players[req.query.id].skill)
  console.log("--------------------------------------");
  res.render('second_index.ejs', {
    player: model.players[req.query.id],
    ships: model.players[req.query.id].ships,
    stars: model.stars,
    mines: model.stars.list_from_type("mine"),
    unknowns: model.stars.list_from_type("unknown"),
    computers: model.stars.list_from_type("computer"),
    abandons: model.stars.list_from_type("abandon"),
    skill: model.players[req.query.id].skill,
  })
});

module.exports = router;