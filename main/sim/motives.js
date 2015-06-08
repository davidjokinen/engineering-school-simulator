/*
 *   Motives.js
 */
var Motives = Class.extend({
	init: function (name){
		this.name = name
		this.amount = 100;
		this.modifiers = new Array();
		this.action = new Array();
		this.decay = .5;//+Math.random();
	},
	toString: function(){
		var out = "good";
		if(this.amount > 75) out = "great";
		if(this.amount <= 25) out = "poor";
		return out;
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
		
		this.amount -= this.decay;
		if(this.amount> 100)
			this.amount = 100;
	}
})