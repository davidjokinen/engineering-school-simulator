var ConsoleScreen = BaseScreen.extend({
	init: function (){
		this.init.base.call(this);		
		this.updateOnAction = false;
		var scr = '';
		for(var y =0;y<23;y++)
			scr += '\n';
		console.log(scr);
	},
	drawScreen: function(){
		//console.log();
		var scr = '\033[s\033[H';
		//scr += '\033[1A';
		for(var y =0;y<23;y++){
			var line = "";
			if(y!=0)line += "\n";
			//if(y%2==0) line += "\033[30m\033[41m";
			//if(y%2==1) line += "\033[34m\033[42m";
			
			
			line += this.textData[y];
			scr += line ;
		}
		scr += "\033[0m\033[u";
		console.log(scr);
	}
})