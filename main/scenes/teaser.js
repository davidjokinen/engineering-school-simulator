/*
 *   Teaser.js
 */
var Teaser = Scene.extend({
	init: function (){
		
	},
	action: function(input){
		this.start();
		return;
	},
	start: function (){
		this.teaser();
		this.ctx.drawScreen();
	},
	update: function (){
		this.day++;
		if(this.day%7==6||this.day%7==0) this.workload = 0;
		else this.workload = parseInt(Math.random()*(10)+1);
		this.student.update(this.workload);

		
	},
	teaser: function(){
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		for(var y=0;y<23;y++){
			var line = "";
			for(var x=0;x<80;x++)
				line += String.fromCharCode(33+parseInt(60*Math.random()));
			this.ctx.fillText(line,0,y);
		}
		this.ctx.fillStyle = "-";
		//this.ctx.fillRect(0, 0, this.ctx.width ,1);

		var text = "-Simulation ERROR:";
		this.ctx.clearRect(20,7,40 ,4);
		this.ctx.fillText(text,0,0);
		text = "Engineering School Simulation";
		this.ctx.fillText(text,40-text.length/2,8);
		text = "coming soon";
		this.ctx.fillText(text,40-text.length/2,9);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 13, this.ctx.width ,1);
		var text = "Press RETURN to size up the situation";
		this.ctx.fillText(text,40-text.length/2,14);
		this.ctx.fillRect(0, 15, this.ctx.width ,1);
		//this.ctx.fillRect(0, 15, this.ctx.width ,1);
		text = " ";
		this.ctx.fillText(text,30-text.length,16);
		
		//this.ctx.fillRect(0, 22, this.ctx.width ,1);
		this.ctx.drawScreen();
		
	}

})