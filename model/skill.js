// define Skill_ability -> {skill_name:[required, type, method]}


class Skill{
	constructor(require, type, method){
		this.required = require;
		this.current = 0;
		this.learned = false;
		this.type = type;
		this.method = method;
	}
}
function MakePlayerSkill(){
		// var Player_skill = [];
		var Skill_ability = {
			'Legacy-of-Ancient-God':[1, 'General', function(){return;}], 
			'Tax-Collector':[2, 'ML', function(pay){if(this.learned){return 1.1 * pay;} else{return pay;}}],
			'Adventure-Trip':[2, 'ML', function(pay){if(this.learned){return 1.1 * pay;} else{return pay;}}], 
			'GPU':[3, 'ML', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}}], 
			'Deep-Learning':[3, 'General', function(){return this.learned;}], 
			'Rainbow':[3, 'General', function(){if(this.learned){return 1.1 * money;} else{return money;}}], 
			'Thief':[5,'ML', function(){return this.learned;}], 
			'SSH':[5, 'General', function(){return this.learned;}],
			'Respectful-Player':[5, 'General', function(name){if(this.learned){return "尊貴的"+name;} else{return name;}}],
			'God-of-Crypto':[10, 'General', function(){return this.learned;}],
			'Unknown':[10, 'MINOR', function(){return this.learned;}],
			"Laplaces-Acma":[10, 'General', function(day){if(this.learned){return day - 1;} else{return day;}}],
		};
		// for (var i = 0; i < 5; i++){
		var single_user_skill = {};
		for (var skill_name in Skill_ability){
			var require = Skill_ability[skill_name][0];
			var type = Skill_ability[skill_name][1];
			var method = Skill_ability[skill_name][2];
			single_user_skill[skill_name] =  new Skill(require, type, method);
		}
		// Player_skill.push(single_user_skill);
		// }
		// return Player_skill;
		return single_user_skill;
	}
module.exports = 
{
	make:MakePlayerSkill,
}