var stars = {
	m0: {id: "m0", x_pos: 1, y_pos: 1, type: 'mine', mine: 5}, 
	m1: {id: "m1", x_pos: 1, y_pos: 1, type: 'mine', mine: 5}, 
	m2: {id: "m2", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m3: {id: "m3", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m4: {id: "m4", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m5: {id: "m5", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m6: {id: "m6", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m7: {id: "m7", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m8: {id: "m8", x_pos: 1, y_pos: 1, type: 'mine'}, 
	m9: {id: "m9", x_pos: 1, y_pos: 1, type: 'mine'},
	c0: {id: "c0", x_pos: 1, y_pos: 1, type: 'computer'},
	c1: {id: "c1", x_pos: 1, y_pos: 1, type: 'computer'},
	c2: {id: "c2", x_pos: 1, y_pos: 1, type: 'computer'},
	c3: {id: "c3", x_pos: 1, y_pos: 1, type: 'computer'},
	c4: {id: "c4", x_pos: 1, y_pos: 1, type: 'computer'},
	a0: {id: "a0", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'black'},
	a1: {id: "a1", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'desert'},
	a2: {id: "a2", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'desert'},
	a3: {id: "a3", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'ML'},
	a4: {id: "a4", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'MINE'},
	a5: {id: "a5", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'HAKER'},
	a6: {id: "a6", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'option'},
	a7: {id: "a7", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'option'},
	a8: {id: "a8", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'destiny'},
	a9: {id: "a9", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'destiny'},
	a10: {id: "a10", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'data'},
	a11: {id: "a11", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'data'},
	a12: {id: "a12", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'data'},
	a13: {id: "a13", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'data'},
	a14: {id: "a14", x_pos: 1, y_pos: 1, type: 'abandon', subtype: 'data'},
	b0: {id: "b0", x_pos: 1, y_pos: 1, type: 'base'},
	b1: {id: "b1", x_pos: 1, y_pos: 1, type: 'base'},
	b2: {id: "b2", x_pos: 1, y_pos: 1, type: 'base'},
	b3: {id: "b3", x_pos: 1, y_pos: 1, type: 'base'},
	b4: {id: "b4", x_pos: 1, y_pos: 1, type: 'base'}
};

for (var id in stars) {
	var node = stars[id];
	node.found = false;
	node.num = 0;
	node.player_here = [null, null, null, null, null];
	if (id == "a4" || id == "a5") {
		node.trigger = [false, false, false, false, false];
	} else if (id == "a3") {
		node.GPU == 2;
	}
}
//console.log(stars);
module.exports = stars;
