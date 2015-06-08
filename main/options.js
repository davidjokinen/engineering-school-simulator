/*
 *   Options.js
 */
var Options = Class.extend({
	init: function (scene, data, defaultAction){
		this.scene = scene;
		this.data = data;
		this.defaultAction = defaultAction;
		this.maxSize = 0;
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].name.length > this.maxSize)
				this.maxSize = this.data[i].name.length
		}
	},
	action: function(input){
		var num = parseInt(input)-1;
		if(this.data[num] != [][0])
			this.data[num].action(this.scene);
		else
			this.defaultAction(this.scene);
	},	
	render: function (ctx){
		var start = 23-this.data.length-1;
		ctx.fillStyle = "-";
		ctx.fillRect(0, start-3, ctx.width ,1);
		var text = "Options:";
		ctx.fillText(text,40-text.length/2,start-2);
		ctx.fillRect(0, start-1, ctx.width ,1);
		for(var i=0;i<this.data.length;i++){
			text = (i+1)+") "+this.data[i].name;
			ctx.fillText(text,40-this.maxSize/2-2,start+i);
		}
		ctx.fillRect(0, 22, ctx.width ,1);
	}
})