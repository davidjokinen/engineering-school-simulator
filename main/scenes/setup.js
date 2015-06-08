/*
 *   Setup.js
 */
var Setup = Scene.extend({
	init: function (PARENT){
		this.status = 1;
		this.processTime = 0;
		this.timeIdle = 0;
		this.serviceTime = 0;
	},
	start: function (){
		this.printName();
		this.printChoices();
		this.ctx.drawScreen();
	},
	action: function(input){
		if(parseInt(input) >0 && parseInt(input)< 2){
			this.controller.addScene(new CreateStudent());
			return;
		}
		this.start();
	},
	printName: function(){
		//console.log(this.ctx);
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		//this.ctx.fillRect(0, 1, this.ctx.width ,1);
		this.ctx.fillRect(0, 22, this.ctx.width ,1);
		var text = "Simulation Configuration!";
		this.ctx.fillText(text,1,0);
		var title = "Engineering School Simulator";
		this.ctx.clearRect(20,2,40,3);
		this.ctx.fillText(title,40-title.length/2,3);
	},
	printChoices: function(){
		this.ctx.clearRect(9,9,30,4);
		this.ctx.fillText("Select a choice:", 10, 10);
		this.ctx.fillText("    1) Start Simulation", 10, 11);
	},
	returnScene: function(scene){
		//console.log(scene);
		if(scene instanceof CreateStudent){
			var student = new Student(scene.points);
			this.controller.addScene(new SetUpLife(student));
		}
		if(scene instanceof SetUpLife){
			this.controller.addScene(new SchoolOverview(scene.student));
		}
		if(scene instanceof SchoolOverview){
			
		}
		
		
		return;
	}

})