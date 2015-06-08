/*
 *   TextWindow.js
 */
var TextWindow = Scene.extend({
	init: function (scene, title, text, renderAction ,action){
		this.scene = scene;
		this.title = title;
		this.text = text;
		this.renderAction = renderAction;
		this.actionIn = action;
		
	},
	action: function(input){
		if(this.actionIn(this.scene, input))
			this.controller.returnScene();
		else
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
		this.renderAction(this.scene, this.ctx);
	}
})