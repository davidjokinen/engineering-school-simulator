/*
 *   SetUpLife.js
 */
var SetUpLife = Scene.extend({
	init: function (student){ 
		this.student = student;
		this.list = new Array();
		this.list.push(new TextWindow(this,"Who you are?","Lets find out!",function(scene, ctx){
				var student = scene.student;

				var luck = student.luck.getP();
				var willpower = student.willpower.getP();
				var wisdom = student.wisdom.getP();
				var perception = student.willpower.getP();
				var endurance = student.willpower.getP();
				var intelligence = student.willpower.getP();
				var charisma = student.charisma.getP();

				var jobHr = parseInt(luck*Math.random()*3)+6;
				var numWeeks = 0;
				if(wisdom*.5 + willpower*.8 + Math.random()*.5 + charisma*.1 + perception*.2> .9)
					numWeeks = parseInt(104*Math.random()*Math.random()*(endurance*.4 + willpower*.3 + charisma*.3 + luck*.2));
				var jobTotal = numWeeks * 20 * jobHr;

				var giftTotal = 1000;

				var amount = jobTotal + giftTotal;

				student.money = amount;
				var text = "You have saved: $"+amount+" (work: $"+jobTotal+", gifts: $"+giftTotal+")";
				this.ctx.fillText(text,12,7);

				var parentDistance = 10 + parseInt(40*Math.random());
				parentDistance += (Math.random() > .7) ?  (80 + 300*Math.random()): 0;
				parentDistance = parseInt(parentDistance);
				student.parentDistance = parentDistance;
				text = "Your parents are live "+parentDistance+" miles from campus";
				this.ctx.fillText(text,12,8);

			},function(scene, input){if(input=="r")return false;return true;}));
		this.list.push(new TextWindow(this,"Welcome to "+this.student.schoolName+" school!","Words go here",function(scene, ctx){},function(scene, input){return true;}));
		this.list.push(new TextWindow(this,"Financial Aid!","Let see if you are getting any support!?",function(scene, ctx){},function(scene, input){return true;}));
		this.list.push(new ChoiceWindow(this,"Tablet requirement!","All student need to have a tablet. ",[
														{
															requirements:function(){
																return true;
															},
															cost:1100,
															warranty:1,
															text:function(){return "Recommended tablet ($"+this.cost+", "+this.warranty+" warranty)";}
														},
														{
															requirements:function(){
																return true;
															},
															cost:1500,
															warranty:3,
															text:function(){return "Recommended tablet ($"+this.cost+", "+this.warranty+" warranty)";}
														},
														{
															requirements:function(student){
																if(student.intelligence.amount > 9)return true;
																return false;
															},
															cost:900,
															warranty:2,
															text:function(){return "Laptop with Wacom pen ($"+this.cost+", "+this.warranty+" warranty)";}
														},
														{
															requirements:function(student){
																if(student.charisma.amount > 7)return true;
																return false;
															},
															cost:800,
															warranty:2,
															text:function(){return "Used table of failed out student  ($"+this.cost+", "+this.warranty+" warranty)";}
														},
														{
															requirements:function(student){
																if(student.luck.amount > 8)return true;
																return false;
															},
															cost:0,
															warranty:2,
															text:function(){return "Won in contest and meets the requirements ($"+this.cost+", "+this.warranty+" warranty)";}
														},
														{
															requirements:function(student){
																if(student.intelligence.amount < 4)return true;
																return false;
															},
															cost:750,
															warranty:2,
															text:function(){return "iPad ($"+this.cost+", "+this.warranty+" warranty)";}
														}],function(student, choice){
															this.scene.student.tablet = choice;
														}));
		this.list.push(new ChoiceWindow(this,"Housing!","Where are you going to start living?",[
														{
															requirements:function(){
																return true;
															},
															cost:2400,
															text:function(){return "Double dorm (campus housing $"+this.cost+")";}
														},
														{
															requirements:function(){
																return true;
															},
															cost:2700,
															text:function(){return "Double dorm more space (campus housing $"+this.cost+")";}
														},{
															requirements:function(){
																return true;
															},
															cost:3300,
															text:function(){return "2 bed / 1 bath apartment (campus housing $"+this.cost+")";}
														},{
															requirements:function(){
																return true;
															},
															cost:3500,
															text:function(){return "2 bed / 2 bath apartment (campus housing $"+this.cost+")";}
														},{
															requirements:function(){
																return true;
															},
															cost:4500,
															text:function(){return "1 bed / 1 bath apartment (campus housing $"+this.cost+")";}
														},{
															requirements:function(student){
																if(student.parentDistance < 70)return true;
																return false;
															},
															cost:0,
															text:function(){return "Live at home! ( $"+this.cost+")";}
														}],function(student, choice){
															student.housing = choice;
														}));
	},
	action: function(input){
		//if(this.actionIn(this.scene, input))
		this.controller.returnScene();
		//else
		//	this.start();
	},
	returnScene: function(scene){
		this.start();
	},
	start: function (){
		this.render();
		if(this.list.length > 0){
			var action = this.list.splice(0,1)[0];
			this.controller.addScene(action);
		} else
			this.controller.returnScene();
	},
	render: function (){
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		var text = "Setting up Life!";
		this.ctx.fillText(text,1,0);


	}
})