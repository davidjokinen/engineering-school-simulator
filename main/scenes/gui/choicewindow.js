/*
 *   ChoiceWindow.js
 */
var ChoiceWindow = Scene.extend({
	init: function (scene, title, text, choices, action){
		this.scene = scene;
		this.title = title;
		this.text = text;
		this.choices = choices;
		this.returnAction = action;

		
	},
	action: function(input){
		var count = 1;
		for(var i =0;i<this.choices.length;i++){
			if(this.choices[i].requirements(this.scene.student)){
				if(input == count){
					this.returnAction(this.scene.student,this.choices[i])
					
					return this.controller.returnScene();
				}
				count++;
			}
		}

		this.start();
	},
	start: function (){
		this.render();

	},
	render: function (){
		var w = 60;
		var h = 18;
		this.ctx.clearRect((this.ctx.width-w)/2,12,w,h);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2,2, 1 ,h);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2,2, w ,1);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2+1,2+h, w ,1);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2+w,3,  1 ,h);
		var text = this.title;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,3);
		text = this.text;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,5);
		var count = 1;
		for(var i =0;i<this.choices.length;i++){
			if(this.choices[i].requirements(this.scene.student)){
				this.ctx.fillText(count+") "+this.choices[i].text(),(this.ctx.width-w)/2+2,6+count);
				count++;
			}
		}

		this.ctx.drawScreen();
	}
})