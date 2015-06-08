window.onload=function(){
	var ctx = new CanvasScreen("screen");

	var sceneCtr = new SceneController();
	sceneCtr.ctx = ctx;
	
	var next;
	//stdin.addListener("data", function(d) {
	//    var stdinString = d.toString().substring(0, d.length-1)+"";
	//    sceneCtr.action(stdinString);
	//})
	var input = "";
	window.addEventListener('keydown', function(e){
				
			//console.log(e.keyCode);
			if(e.keyCode == 8){//backspace
				input = input.substring(0,input.length-1)
				e.preventDefault();
			}
			ctx.input = input;
			ctx.drawScreen();
		}, false);
	window.addEventListener('keypress', function(e){
				
			//console.log(e.keyCode);
			if(e.keyCode == 13){
				sceneCtr.action(input);
				input = "";
			}else{
				input += String.fromCharCode(e.charCode);
			}
			ctx.input = input;
			ctx.drawScreen();
		}, false);
	sceneCtr.addScene(new Setup());
}