const MONEY_INIT = 100;
const WORKER_INIT = 1;
const x_POS = [0,1,2,3,4]
const y_POS = [0,1,2,3,4]
player = function(id) {
	return {
		id: id,
		name: id,
		money: MONEY_INIT,
		num_of_miner: WORKER_INIT,
		num_of_trainer: WORKER_INIT,
		num_of_haker: WORKER_INIT,
		ships: {
			ship(0, id), ship(1, id), ship(2, id), ship(3, id), ship(4, id)
			},
		x_pos: x_POS[id],
		y_pos: y_POS[id],
		dataset: {
			image: 0, text: 0, sound: 0},
		AImodel: {},
		AImodelIdx: 0
	}
}

ship = function(id, user_id) {
	return {
		id: id,
		user_id: user_id,
		num_of_miner: 0,
		num_of_trainer: 0,
		num_of_haker: 0,
		day_left: null,
		target_id: null,
		datasetType: null,
		datasetAmount: 0,
		AimodelIdx: null
	}
}
module.exports = player;
