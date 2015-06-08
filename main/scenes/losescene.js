/*
 *   SpeedSim.js
 */
var LoseScene = Scene.extend({
	init: function (day ,student, reason){
		this.day = day;
		this.semester = 0;
		this.semesterLength = 0;
		this.workload = 0;
		this.student = student;
		this.reason = reason;
	},
	action: function(input){
		this.controller.addScene(new Setup());
		return;
	},
	start: function (){
		this.lostMenu();
		this.ctx.drawScreen();
	},
	update: function (){
		this.day++;
		if(this.day%7==6||this.day%7==0) this.workload = 0;
		else this.workload = parseInt(Math.random()*(10)+1);
		this.student.update(this.workload);

		
	},
	
	lostMenu: function(){
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		var text = "Lost Simulation!";
		this.ctx.fillText(text,1,0);
		text = "You lost";
		this.ctx.fillText(text,40-text.length/2,4);
		text = this.reason;
		this.ctx.fillText(text,40-text.length/2,6);
	
		
		this.ctx.drawScreen();
		
	}

})