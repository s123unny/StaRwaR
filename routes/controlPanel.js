var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:pwd', function(req, res) { //id = req.query.id
  res.render('second_index.ejs', {
    player_id:req.query.id,
    money: model.players[req.query.id].money
    
  })
});

module.exports = router;