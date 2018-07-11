// define Skill_ability -> {skill_name:[required, type, method]}


class Skill{
	constructor(require, type, method, next){
		this.next = next;
		this.required = require;
		this.current = 0;
		this.learned = false;
		this.learnable = false;
		this.usable = false;
		this.type = type;
		this.method = method;
	}
}
function MakePlayerSkill(){
		// var Player_skill = [];
		var Skill_ability = {
			'Legacy-of-Ancient-God':[1, 'General', function(){return;},['Tax-Collector','GPU']], 
			'Tax-Collector':[2, 'General', function(){if(this.learned && this.usable){this.usable = false;return true;} else{return false;}},['Deep-Learning','How-Universe']],
			'How-Universe':[2, 'General', function(){},['Rainbow']], //?
			'GPU':[3, 'MINOR', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}},['Centralize']], 
			'Deep-Learning':[3, 'ML', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}},['SSH']], 
			'Rainbow':[3, 'General', function(id){
				if(this.learned){if(id == 0)return "orange";else if(id == 1)return "yellow";else if(id == 2)return "green";else if(id == 3)return "maganta";else if(id == 4)return "purple";} 
				else{return "white";}},['Respectful-Player']], 
			'Centralize':[5,'MINOR', function(pay){if(this.learned){return 0.05 * pay;} else{return 0;}},['God-of-Crypto']], 
			'SSH':[5, 'ML', function(){return this.learned;},['GAN']],//?
			'Respectful-Player':[5, 'General', function(name){if(this.learned){return "尊貴的"+name;} else{return name;}},['Laplaces-Acma']],
			'God-of-Crypto':[10, 'MINOR', function(){return this.learned;},[]],//?
			'GAN':[10, 'ML', function(pay){if(this.learned){return 2 * pay;} else{return pay;}},[]],
			'Laplaces-Acma':[10, 'General', function(){if(this.learned && this.usable){this.usable = false;return true;} else{return false;}},[]],
		};
		// for (var i = 0; i < 5; i++){
		var single_user_skill = {};
		for (var skill_name in Skill_ability){
			var require = Skill_ability[skill_name][0];
			var type = Skill_ability[skill_name][1];
			var method = Skill_ability[skill_name][2];
			var next = Skill_ability[skill_name][3];
			single_user_skill[skill_name] =  new Skill(require, type, method,next);
		}
		single_user_skill['Legacy-of-Ancient-God'].learnable = true;
		// Player_skill.push(single_user_skill);
		// }
		// return Player_skill;
		return single_user_skill;
	}
module.exports = 
{
	make:MakePlayerSkill,
}