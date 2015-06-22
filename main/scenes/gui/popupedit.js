/*
 *   PopUpEdit.js
 */
var PopUpEdit = Scene.extend({
	init: function (scene, title, info, action){
		this.scene = scene;
		this.title = title;
		this.info = info;
		this.actionIn = action;
		this.error = "";
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
		var w = 40;
		var h = 10;
		this.ctx.clearRect((this.ctx.width-w)/2,12,w,h);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2,11, 1 ,h);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2,11, w ,1);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2+1,11+h, w ,1);
		this.ctx.fillStyle = "#";
		this.ctx.fillRect((this.ctx.width-w)/2+w,12,  1 ,h);
		var text = this.title;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,13);
		var text = this.info;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,15);
		var text = this.error;
		this.ctx.fillText(text,(this.ctx.width-w)/2+2,17);
		this.ctx.drawScreen();
	}
})