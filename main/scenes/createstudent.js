/*
 *   CreateStudent.js
 */
var CreateStudent = Scene.extend({
	init: function (){
		
		this.paused = 0;

		this.categories = ["perception","endurance","willpower","charisma","wisdom","intelligence","luck"];

		this.freePoints = 5;
		this.points = [5,5,5,5,5,5,5];
		this.nickname = "Speed";
		this.favColor = "Red";
		this.favFood = "Nachos";
		this.favWord = "Sweet";

		this.askedQuestions = 0;

		var baseScene = this;
		function editStat(that, stat){
			return new PopUpEdit(that, "Edit "+that.categories[stat], "Enter a new value for "+that.categories[stat], function(scene, input){
					  			var statEdit = stat;
					  			var newStat = parseInt(input);
					  			if(newStat < 1){
					  				this.error = "can't be less than 1";
					  				return false;
					  			}
					  			var dif = newStat-scene.points[statEdit];
					  			if(dif<=0){
					  				scene.freePoints -= dif;
					  				scene.points[statEdit] = newStat;
					  				return true;
					  			} else if(dif > 0) {
					  				if(dif>scene.freePoints){
					  					this.error = "not enough skill pts";
					  					return false;
					  				}
					  				if(newStat>10){
					  					this.error = "can't be more than 10";
					  					return false;
					  				}
					  				scene.freePoints -= dif;
					  				scene.points[statEdit] = newStat;
					  				return true;
					  			}
					  			this.error = "Need to be a number";
					  			return false;
					  		});
		}

		this.options = new Options(this,[ 
										  {name: "Ask questions again!",
										  action: function(scene){
										  			scene.askedQuestions = 0;
												  	scene.start();
												  	return;
										  		}},
										  {name: "Edit perception",
										  action: function(scene){
												  	scene.controller.addScene(editStat(baseScene, 0));
													return;
										  		}},
										  {name: "Edit endurance",
										  action: function(scene){
										  			scene.controller.addScene(editStat(baseScene, 1));
													return;
										  		}},
										  {name: "Edit willpower",
										  action: function(scene){
										  			scene.controller.addScene(editStat(baseScene, 2));
													return;
										  		}},
										  {name: "Edit charisma",
										  action: function(scene){
										  			scene.controller.addScene(editStat(baseScene, 3));
													return;
										  		}},
										  {name: "Edit wisdom",
										  action: function(scene){
										  			scene.controller.addScene(editStat(baseScene, 4));
													return;
										  		}},
										  {name: "Edit intelligence",
										  action: function(scene){
										  			scene.controller.addScene(editStat(baseScene, 5));
													return;
										  		}},
										  {name: "Edit luck",
										  action: function(scene){
										  			scene.controller.addScene(editStat(baseScene, 6));
													return;
										  		}},
										  {name: "Get ready for School",
										  action: function(scene){
										  			scene.controller.returnScene();
										  		}}
										  ],function(scene){scene.start();});

		this.viewed = 0;

	},
	action: function(input){
		this.options.action(input);
	},
	start: function (){
		if(this.askedQuestions == 0){
			this.askedQuestions = 1;
			this.update();
			this.controller.addScene(new AskQuestions(this,[{title:"Question 1",info:"What is your favorite color?",action:function(scene, input){
											if(input != "")
												scene.favColor = input;
											return true;
										}},{title:"Question 2",info:"What is your favorite food?",action:function(scene, input){
											if(input != "")
												scene.favFood = input;
											return true;
										}},{title:"Question 3",info:"What is your catch phrase?",action:function(scene, input){
											if(input != "")
												scene.favWord = input;
											return true;
										}},{title:"Question 4",info:"What is the nickname of the school?",action:function(scene, input){
											if(input != "")
												scene.nickname = input;
											return true;
										}},]));
			return;
		}
		this.update();
	},
	returnScene: function(scene){
		this.start();
	},
	update: function (){
		this.optionViewer();
		this.statViewer();
		this.ctx.drawScreen();
	},
	
	optionViewer: function(){
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		var text = "Creating Student!";
		this.ctx.fillText(text,1,0);
		this.options.render(this.ctx);
		this.ctx.drawScreen();
		
	},
	statViewer: function(){
		var text = "Extra points: "+this.freePoints;
		this.ctx.fillText(text,30,3);
		for(var i =0;i<this.categories.length;i++){
			var name = this.categories[i];
			while(name.length<12)name+=" ";
			text = name+" : "+this.points[i];
			this.ctx.fillText(text,10,3+i);
		}
		var text = "School nickname: "+this.nickname;
		this.ctx.fillText(text,50,5);
		var text = "Favorite color: "+this.favColor;
		this.ctx.fillText(text,50,6);
		var text = "Favorite food: "+this.favFood;
		this.ctx.fillText(text,50,7);
		var text = "Your phrase: "+this.favWord;
		this.ctx.fillText(text,50,8);
	},
	printDebug: function(){
		for(var i =0;i<this.student.activityList.length;i++){
			var text = this.student.activityList[i].toString();
			this.ctx.fillText(text,10,2+i);
		}
	}

})