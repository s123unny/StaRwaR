/*return
id
ships[5]:
	重新指派或叫回: call下面的function建一個 //叫回填false
	維持不變就填null (render的時候應該可以用label之類的記ship Id吧)
	沒有攜帶dataset Type就填null
money
workers: [num_of_miner, num_of_trainer, num_of_haker]
hand_on_AImodel //填type 沒有填null
*/
function ship(id, miner, trainer, haker, targetId, datasetType) {
	return {
		id: id,
		num_of_miner: miner,
		num_of_trainer: trainer,
		num_of_haker: haker,
		dayLeft: null,
		targetId: targetId,
		datasetType: datasetType,
		datasetAmount: null,
	};
}

