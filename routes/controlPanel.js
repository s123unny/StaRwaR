var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:pwd', function(req, res) { //id = req.query.id
	res.sendFile(path.join(__dirname,"../views","second_index.html"));
});

module.exports = router;
