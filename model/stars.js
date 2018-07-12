var stars = {
	m0: {id: "m0", x_pos: 4, y_pos: 3, type: 'mine', mine: 5}, 
	m1: {id: "m1", x_pos: 9, y_pos: 0, type: 'mine', mine: 5}, 
	m2: {id: "m2", x_pos: 0, y_pos: 5, type: 'mine', mine: 5}, 
	m3: {id: "m3", x_pos: 11, y_pos: 1, type: 'mine', mine: 10}, 
	m4: {id: "m4", x_pos: 3, y_pos: 8, type: 'mine', mine: 10}, 
	m5: {id: "m5", x_pos: 4, y_pos: 7, type: 'mine', mine: 10}, 
	m6: {id: "m6", x_pos: 5, y_pos: 5, type: 'mine', mine: 20}, 
	m7: {id: "m7", x_pos: 4, y_pos: 1, type: 'mine', mine: 20}, 
	m8: {id: "m8", x_pos: 1, y_pos: 2, type: 'mine', mine: 20}, 
	m9: {id: "m9", x_pos: 9, y_pos: 8, type: 'mine', mine: 40},
	c0: {id: "c0", x_pos: 2, y_pos: 8, type: 'computer', day: 3},
	c1: {id: "c1", x_pos: 5, y_pos: 3, type: 'computer', day: 3},
	c2: {id: "c2", x_pos: 2, y_pos: 1, type: 'computer', day: 2},
	c3: {id: "c3", x_pos: 9, y_pos: 3, type: 'computer', day: 2},
	c4: {id: "c4", x_pos: 3, y_pos: 9, type: 'computer', day: 1},
	a0: {id: "a0", x_pos: 10, y_pos: 3, type: 'abandon', subtype: 'black'},
	a1: {id: "a1", x_pos: 8, y_pos: 3, type: 'abandon', subtype: 'desert'},
	a2: {id: "a2", x_pos: 5, y_pos: 1, type: 'abandon', subtype: 'desert'},
	a3: {id: "a3", x_pos: 9, y_pos: 5, type: 'abandon', subtype: 'MINE'},
	a4: {id: "a4", x_pos: 8, y_pos: 9, type: 'abandon', subtype: 'HAKER'},
	a5: {id: "a5", x_pos: 0, y_pos: 3, type: 'abandon', subtype: 'option'},
	a6: {id: "a6", x_pos: 4, y_pos: 9, type: 'abandon', subtype: 'option'},
	a7: {id: "a7", x_pos: 3, y_pos: 1, type: 'abandon', subtype: 'destiny'},
	a8: {id: "a8", x_pos: 0, y_pos: 6, type: 'abandon', subtype: 'destiny'},
	a9: {id: "a9", x_pos: 2, y_pos: 5, type: 'abandon', subtype: 'data'},
	a10: {id: "a10", x_pos: 3, y_pos: 3, type: 'abandon', subtype: 'data'},
	a11: {id: "a11", x_pos: 3, y_pos: 7, type: 'abandon', subtype: 'data'},
	a12: {id: "a12", x_pos: 9, y_pos: 1, type: 'abandon', subtype: 'data'},
	a13: {id: "a13", x_pos: 0, y_pos: 4, type: 'abandon', subtype: 'data'},
	a14: {id: "a14", x_pos: 4, y_pos: 2, type: 'abandon', subtype: 'data'},
	b0: {id: "b0", x_pos: 2, y_pos: 6, type: 'base'},
	b1: {id: "b1", x_pos: 6, y_pos: 2, type: 'base'},
	b2: {id: "b2", x_pos: 7, y_pos: 6, type: 'base'},
	b3: {id: "b3", x_pos: 5, y_pos: 4, type: 'base'},
	b4: {id: "b4", x_pos: 10, y_pos: 3, type: 'base'},
	list_from_type: function(type, ships) {
		var list = [];
		if (type == "unknown") {
			for (var id in this) {
				if (this[id].found == false && this[id].id != undefined) {
			 		list.push(id);
				}
			}
		} else {
			var checklist = [];
			for (var i = 0; i < 5; i++) {
				checklist.push(ships[i].targetId);
			}
			for (var id in this) {
				if (this[id].type == type && this[id].found == true) {
					if (!checklist.includes(id)) {
						list.push(id);
					}
				}
			}
		}
		return list;
	},
	next: function(id) {
		console.log(id);
		var keys = Object.keys( this );
    	var	idIndex = keys.indexOf( id );
    	var nextIndex = idIndex += 1;
		var nextKey = keys[ nextIndex ];
		if (this[nextKey].type != this[id].type) {
			return null;
		} else {
			return nextKey;
		}
	}
};

for (var id in stars) {
	var node = stars[id];
	node.found = false;
	node.num = 0;
	node.player_here = [null, null, null, null, null];
	if (id == "a3" || id == "a4") {
		node.trigger = [false, false, false, false, false];
		if (id == "a3") {
			node.cannotback = null;
		}
	} else if (node.type == 'computer') {
		node.dayLeft = [null, null, null, null, null];
	} else if (node.type == 'base') {
		node.found = true;
	}
}
//console.log(stars);
module.exports = stars;
