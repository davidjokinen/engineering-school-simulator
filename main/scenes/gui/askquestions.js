/*
 *   AskQuestions.js
 */
var AskQuestions = Scene.extend({
	init: function (scene, list){//, title, info, action
		this.scene = scene;
		this.list = list;
		
		this.error = "";
	},
	action: function(input){
		if(this.list[0].action(this.scene, input)){
			this.list.splice(0,1);
		}
		this.start();
	},
	start: function (){
		if(this.list.length > 0)
			this.render();
		else 
			this.controller.returnScene();

	},
	render: function (){
		var w = 40;
		var h = 5;
		this.ctx.clearRect((this.ctx.width-w)/2,9,w,h);
		this.ctx.fillStyle = "?";
		this.ctx.fillRect((this.ctx.width-w)/2,9, 1 ,h);
		this.ctx.fillStyle = "?";
		this.ctx.fillRect((this.ctx.width-w)/2,9, w ,1);
		this.ctx.fillStyle = "?";
		this.ctx.fillRect((this.ctx.width-w)/2+1,9+h, w ,1);
		this.ctx.fillStyle = "?";
		this.ctx.fillRect((this.ctx.width-w)/2+w,10,  1 ,h);
		var text = this.list[0].title;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,9);
		var text = this.list[0].info;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,11);
		var text = this.error;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,13);
		this.ctx.drawScreen();
	}
})