var BaseScreen = Class.extend({
	init: function (){
		this.width = 80;
		this.height = 23;
		this.scalewidth = 9;
		this.scaleheight = 16;
		this.updateOnAction = true;
		this.textData = new Array(this.height);
		this.textColorData = new Array(this.height);
		this.fillStyle = "@";
		for(var y =0;y<this.height;y++){
			this.textData[y] = "";
			for(var x =0;x<this.width;x++){
				this.textData[y] += " ";
				//if((x+y)%2==0)
				//else this.textData[y] += "⡜";
			}
		}		
	},
	resize: function(){
		var old = this.textData;
		this.textData = new Array(this.height);
		this.textColorData = new Array(this.height);
		
		for(var y =0;y<this.height;y++){
			if(y<old.length)
				this.textData[y] = old[y];
			else{
				this.textData[y] = "";
				for(var x =0;x<this.width;x++){
					//if((x+y)%2==0) this.textData[y] += " ";
					//else this.textData[y] += "○";
					this.textData[y] += " ";
				}
			}
		}
	},
	drawScreen: function(){
		
	},
	clearRect: function(x,y,w,h){
		var old = this.fillStyle;
		this.fillStyle = " ";
		this.fillRect(x,y,w,h);
		this.fillStyle = old;
		if(this.updateOnAction)this.drawScreen();
	},
	fillRect: function(x,y,w,h){ 
		if (typeof this.fillStyle == 'string' || myVar instanceof String){
			if(this.fillStyle.length!=1){
				//ERROR
				return;
			}
			var fill = "";
			for(var i=0;i<w;i++)
				fill += this.fillStyle;
			for(var i=0;i<h&&y+i<this.textData.length;i++){
				var start = this.textData[y+i].substring(0,x);
				var end = this.textData[y+i].substring(x+w);
				this.textData[y+i] = start+fill+end;
			}
		}
		if(this.updateOnAction)this.drawScreen();
	},
	fillText: function(text,x,y){
		var start = this.textData[y].substring(0,x);
		var end = this.textData[y].substring(x+text.length);
		this.textData[y] = start+text+end;
		if(this.updateOnAction)this.drawScreen();
	}
})