const MONEY_INIT = 100;
const WORKER_INIT = 1;
const x_POS = [0,1,2,3,4]
const y_POS = [0,1,2,3,4]
ship = function(id, user_id) {
	return {
		id: id,
		num_of_miner: 0,
		num_of_trainer: 0,
		num_of_haker: 0,
		dayLeft: null, //init: =requiredDay, 0: arrive , !=0: going
		targetId: null, //null: free, false: back, else: targetStarId
		datasetType: null,
		datasetAmount: 0,
		status: function() {
			if (this.targetId == null) {
				return "free";
			} else if (this.dayLeft == 0) {
				return "arrive";
			} else {
				return "going";
			}
		},
	}
}
player = function(id) {
	return {
		id: id,
		name: id,
		money: MONEY_INIT,
		num_of_miner: WORKER_INIT,
		num_of_trainer: WORKER_INIT,
		num_of_haker: WORKER_INIT,
		ships: [
			ship(0, id), ship(1, id), ship(2, id), ship(3, id), ship(4, id)
			],
		x_pos: x_POS[id],
		y_pos: y_POS[id],
		dataset: {
			image: 0, text: 0, sound: 0},
		AImodel: {
			image: 0, text: 0, sound: 0},
		hand_on_AImodel: null,
		num_of_working_miner: function() {
			sum = 0;
			for (var i = 0; i < 5; i++) {
				sum += this.ships[i].num_of_miner;
			}
			return sum;
		},
		num_of_working_trainer: function() {
			sum = 0;
			for (var i = 0; i < 5; i++) {
				sum += this.ships[i].num_of_trainer;
			}
			return sum;
		},
		num_of_working_haker: function() {
			sum = 0;
			for (var i = 0; i < 5; i++) {
				sum += this.ships[i].num_of_haker;
			}
			return sum;
		},
	}
}



module.exports = player;
