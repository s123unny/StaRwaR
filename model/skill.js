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
			'Legacy-of-Ancient-God':[1, 'General', function(){if(this.learned){return 5;}else{return 3}},['Tax-Collector','GPU']], 
			'Tax-Collector':[2, 'General', function(){if(this.learned && this.usable){this.usable = false;return true;} else{return false;}},['GAN','Rainbow']],
			'GAN':[10, 'ML', function(pay){if(this.learned){return 1.5 * pay;} else{return pay;}},['Deep-Learning']],
			
			'GPU':[3, 'MINOR', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}},['Rainbow','How-Universe']], 
			'Rainbow':[3, 'General', function(id){
				if(this.learned){if(id == 0)return "orange";else if(id == 1)return "yellow";else if(id == 2)return "pink";else if(id == 3)return "violet";else if(id == 4)return "salmon";} 
				else{return "white";}},['God-of-Crypto','Deep-Learning']], 
			'Deep-Learning':[3, 'ML', function(pay){if(this.learned){return 1.2 * pay;} else{return pay;}},['Respectful-Player']], 
			'How-Universe':[2, 'General', function(){if(this.learned && this.usable){this.usable = false;return true;} else{return false;}},['SSH']], //?
			
			'God-of-Crypto':[10, 'MINOR', function(){return this.learned;},['Centralize']],//?

			'Respectful-Player':[5, 'General', function(name){if(this.learned){return "尊貴的"+name;} else{return name;}},['Laplaces-Acma']],
			
			
			'SSH':[5, 'ML', function(hacker){if(this.learned && hacker > 0) return true;else{return false;}},[]],//?
			'Centralize':[5,'MINOR', function(pay){if(this.learned){return 0.05 * pay;} else{return 0;}},[]], 
			
			'Laplaces-Acma':[10, 'General', function(){if(this.learned && this.usable){this.usable = false;return true;} else{return false;}},[]],
		};
		//  GPU God-of-crypto  SSH
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
