/*
 *   SpeedSim.js
 */
var SpeedSim = Scene.extend({
	init: function (student){
		this.day = 0;
		this.semester = 0;
		this.semesterLength = 0;
		this.workload = 0;
		this.student = student;
		this.options;

		this.paused = 1;

		this.interval= 0;
	},
	action: function(input){
		
		if(this.paused==0){
			this.start();
			this.paused = 1;
		} else {
			clearInterval(this.interval);
			this.updateOptions();
			this.pauseMenu();
			this.options.action(input);
		}
	},
	start: function (){
		clearInterval(this.interval);
		
		//this.update();
		this.interval=setInterval(this.update.bind(this), parseInt(50));
		this.printName();
		this.printDebug();
		this.ctx.drawScreen();

	},
	update: function (){
		if(this.day >= 84) {
			clearInterval(this.interval);
			this.student.hoursCompleted += this.student.hoursTaking;
			this.student.hoursTaking = 0;
			this.controller.returnScene();
			return;
		}
		if(this.student.grades.amount <= 0) {
			clearInterval(this.interval);
			this.controller.addScene(new LoseScene(this.day,this.student,"Failed out of school. ):"));
			return;
		}
		if(this.student.health.amount <= 0) {
			clearInterval(this.interval);
			this.controller.addScene(new LoseScene(this.day,this.student,"Stress took over. Switched to buisness school."));
			return;
		}

		this.day++;
		if(this.day%7==6||this.day%7==0) this.workload = 0;
		else this.workload = parseInt(Math.random()*Math.random()*(this.student.hoursTaking)+1);
		this.student.update(this.workload,this.day%7);

		this.printName();
		this.printDebug();
		this.ctx.drawScreen();
	},
	updateOptions: function (){
		var that = this;
		var list = new Array();

		list.push({name: "Get back to school",
						action: function(scene){
							scene.paused = 1;
							scene.start();
							
						}});

		list.push({name: "Find a job",
						action: function(scene){
							
						}});


		list.push({name: "Look at aid",
						action: function(scene){
							
						}});

		this.options = new Options(this,list,function(scene){});
	},
	pauseMenu: function(){
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		var text = "Paused Simulation!";
		this.ctx.fillText(text,1,0);
		this.options.render(this.ctx);
		this.ctx.drawScreen();
		
	},
	printName: function(){


		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		var text = "Simulation Running";
		this.ctx.fillText(text,1,0);
		if(this.day%4==0)this.ctx.fillText("/",4,4);
		if(this.day%4==1)this.ctx.fillText("-",4,4);
		if(this.day%4==2)this.ctx.fillText("\\",4,4);
		if(this.day%4==3)this.ctx.fillText("|",4,4);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 13, this.ctx.width ,1);
		var text = "Press RETURN to size up the situation";
		this.ctx.fillText(text,40-text.length/2,14);
		this.ctx.fillRect(0, 15, this.ctx.width ,1);
		text = "Day: "+this.day +" out of "+(7*12);
		this.ctx.fillText(text,30-text.length,16);
		text = "HW given for the day: "+this.workload;
		this.ctx.fillText(text,30-text.length,17);
		text = "Upcoming Tests: ?";
		this.ctx.fillText(text,30-text.length,18);
		text = "Assignments due: ?";
		this.ctx.fillText(text,30-text.length,19);
		text = "HW due: "+this.student.hwDue;
		this.ctx.fillText(text,30-text.length,20);
		text = "Sleep last night: "+this.student.sleep;
		this.ctx.fillText(text,30-text.length,21);
		text = "Energy: "+this.student.energy;
		this.ctx.fillText(text,60-text.length,16);
		text = "Social: "+this.student.social;
		this.ctx.fillText(text,60-text.length,17);
		text = "Grades: "+this.student.grades;
		this.ctx.fillText(text,60-text.length,18);
		text = "Health: "+this.student.health;
		this.ctx.fillText(text,60-text.length,19);
		text = "Fun: "+this.student.fun;
		this.ctx.fillText(text,60-text.length,20);
		this.ctx.fillRect(0, 22, this.ctx.width ,1);
	},
	printDebug: function(){
		for(var i =0;i<this.student.activityList.length;i++){
			var text = this.student.activityList[i].toString();
			this.ctx.fillText(text,10,2+i);
		}
		
		
		
	}

})