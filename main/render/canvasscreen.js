var CanvasScreen = BaseScreen.extend({
	init: function (id){
		this.init.base.call(this);	
		this.canvas = document.getElementById(id);	
		this.ctx = this.canvas.getContext("2d");
		this.updateOnAction = false;
		this.input = "";
	},
	drawScreen: function(){
		
		this.ctx.clearRect(0,0,1000,1000);
		this.ctx.font = '9pt monospace';
		var txt = "";
		for(var i=0;i<80;i++)txt+="#";
	    var w = this.ctx.measureText(txt).width;
		var dif = (585-w)/2;
		for(var i =0;i<1;i++){
			var size = 14;
			for(var y =0;y<23;y++){
				var line = "";
				//if(y!=0)line += "\n";
				//if(y%2==0) line += "\033[30m\033[41m";
				//if(y%2==1) line += "\033[34m\033[42m";
				
				
				line += this.textData[y];
				this.ctx.font = '9pt monospace';
	     		this.ctx.fillText(line, dif, size+size*y);
				//scr += line ;
			}
			
			var text = this.input;
			this.ctx.fillText(text, dif, size+size*23);
			this.ctx.fillRect(dif+text.length*7.25, size+size*23-10,7,14);

		}
		//scr += "\033[0m\033[u";
		//console.log(scr);


	}
})