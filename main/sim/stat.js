/*
 *   Motives.js
 */
var Motives = Class.extend({
	init: function (name){
		this.name = name
		this.amount = amount;
		this.modifiers = new Array();
		this.action = new Array();
	},
	toString: function(){
		return this.name+" "+this.timeCount+"["+this.time+"]("+this.eff+")";
	},
	addAction: function(a){
		this.action.push(a);
		this.action[this.action.length-1].bind(this);
	},
	spend: function (){
		this.timeCount++;
		if(Math.random() < this.eff){
			return true;
		}
		return false;
	},
	hasTime: function (day){
		return this.time[day] > this.timeCount;
	},
	update: function (student,day){
		this.timeCount = 0;
		while(this.hasTime(day) && student.timeLeft>0){
			student.timeLeft--;
			var t = this.spend();
			for(var i=0;i<this.action.length;i++)
				this.action[i](student,day,t);
		}
	}
})