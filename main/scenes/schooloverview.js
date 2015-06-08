/*
 *   SchoolOverview.js
 */
var SchoolOverview = Scene.extend({
	init: function (student){
		this.student = student;
		this.semesterCost = (480+parseInt(40*Math.random()))*10;
		this.options;
		this.showingEvents = 0;
	},
	action: function(input){
		this.options.action(input);
	},
	start: function (){
		this.update();
	},
	returnScene: function(scene){
		if(this.showingEvents == 0){
			this.student.semester++;

			if(this.student.semester%3==0){
				this.semesterCost =this.semesterCost + parseInt((this.semesterCost*(.025+Math.random()/20))/10)*10;
				var that = this;
				this.update();
				this.controller.addScene(new PopUpEdit(that, "Tuition Increase", "The tuition has increase to $"+this.semesterCost , function(scene, input){
									if(Math.random()>.9){
										this.error = "You understand thanks "+scene.student.schoolName+" schoo!";
										return false;
									} 
									return true;
								}));
				this.showingEvents = 1;
				this.ctx.drawScreen();
				return;
			}
		}

		
		this.showingEvents = 0
		this.start();
	},
	updateOptions: function (){
		var that = this;
		var list = new Array();

		list.push({name: "Start low load semester (12 hrs, cost -$"+this.semesterCost+")",
						action: function(scene){
							scene.student.payBill(scene.semesterCost);
							scene.student.hoursTaking = 12;
							scene.controller.addScene(new SpeedSim(scene.student));
						}});

		list.push({name: "Start mid load semester (15 hrs, cost -$"+this.semesterCost+")",
						action: function(scene){
							scene.student.payBill(scene.semesterCost);
							scene.student.hoursTaking = 15;
							scene.controller.addScene(new SpeedSim(scene.student));
						}});


		list.push({name: "Start high load semester (18 hrs, cost -$"+this.semesterCost+")",
						action: function(scene){
							scene.student.payBill(scene.semesterCost);
							scene.student.hoursTaking = 18;
							scene.controller.addScene(new SpeedSim(scene.student));
						}});

		if(this.student.hoursCompleted > 30 && this.student.coopCompleted < 3)
		list.push({name: "Take a co-op (3 hrs, cost -$500)",
						action: function(scene){
							scene.student.payBill(500);
							scene.student.hoursTaking = 3;
							scene.student.coopCompleted++;
							scene.controller.addScene(new PopUpEdit(that, "Took a Co-op! ", "Your parents are proud! :)", function(scene, input){
								if(Math.random()>.9){
									this.error = "relaxed a bit. Your Health is up!";
									scene.student.health.amount += 30;
									return false;
								} 
								if(Math.random()>.95-scene.student.wisdom.getP()*.3){
									this.error = "Feeling a bit down!";
									scene.student.health.amount -= 15;
									return false;
								} 
								if(Math.random()>1.0-scene.student.charisma.getP()*.4){
									this.error = "You miss being arround people!";
									scene.student.charisma.amount -= 20;
									return false;
								}   
							
								scene.student.money += (parseInt(Math.random()*8)+12)*40*12;
								return true;
							}));
						}});

		list.push({name: "Take semester off",
						action: function(scene){
							scene.student.semesterOff++;
							scene.controller.addScene(new PopUpEdit(that, "You are taking the semester off ", "Your parents are disapointed. ):", function(scene, input){
								if(Math.random()>.9){
									this.error = "relaxed a bit. Your Health is up!";
									scene.student.health.amount += 30;
									return false;
								} 
								if(Math.random()>.95-scene.student.wisdom.getP()*.3){
									this.error = "Feeling a bit down!";
									scene.student.health.amount -= 15;
									return false;
								} 
								if(Math.random()>1.0-scene.student.charisma.getP()*.4){
									this.error = "You miss being arround people!";
									scene.student.charisma.amount -= 20;
									return false;
								}   
								if(Math.random()>.95-scene.student.luck.getP()*.2-scene.student.wisdom.getP()*.1-scene.student.willpower.getP()*.2){
									this.error = "Worked and got moeny! nice";
									scene.student.money += parseInt(Math.random()*Math.random()*500)*10;
									return false;
								} 
								if(Math.random()>.95-scene.student.luck.getP()*.2-scene.student.wisdom.getP()*.1-scene.student.willpower.getP()*.5){
									this.error = "Worked and got moeny! nice";
									scene.student.money += parseInt(Math.random()*Math.random()*500)*10;
									return true;
								}   

								return true;
							}));
						}});

		this.options = new Options(this,list,function(scene){scene.start();});
	},
	update: function (){

		this.updateOptions();
		this.optionViewer();
		this.semesterViewer();
		this.ctx.drawScreen();
	},
	optionViewer: function(){
		this.ctx.clearRect(0,0,this.ctx.width ,this.ctx.height);
		this.ctx.fillStyle = "-";
		this.ctx.fillRect(0, 0, this.ctx.width ,1);
		var text = "College Overview!";
		this.ctx.fillText(text,1,0);
		this.options.render(this.ctx);
		
	},
	semesterViewer: function(){
		var sem = ["Fall","Spring","Summer"];
		var text = "Setup for "+sem[this.student.semester%3]+" semester of year "+(parseInt(this.student.semester/3)+1);
		this.ctx.fillText(text,2,2);
		//text = "status";
		//this.ctx.fillText(text,2,4);
		this.ctx.fillText("----------",2,3);
		this.ctx.fillText("Hours Done: "+this.student.hoursCompleted+"/120",2,4);
		this.ctx.fillText("Co-ops Done: "+this.student.coopCompleted+"/3",2,5);
		this.ctx.fillText("Grades: "+this.student.grades,2,6);
		this.ctx.fillText("Health: "+this.student.health,2,7);
		this.ctx.fillText("Social: "+this.student.social,2,8);
		this.ctx.fillText("Fun: "+this.student.fun,2,9);
		this.ctx.fillText("Energy: "+this.student.energy,2,10);
		this.ctx.fillText("Money: $"+this.student.money,2,11);
		this.ctx.fillText("Loans: -$"+this.student.loans,2,12);
		text = "$$$$ aid"; 
		this.ctx.fillText(text,78-text.length,4);
		text = "----------"; 
		this.ctx.fillText(text,78-text.length,5);

		if(this.student.aid.length==0){
			text = "No aid. :("; 
			this.ctx.fillText(text,78-text.length,6);
		}


		
	},
	printDebug: function(){
		for(var i =0;i<this.student.activityList.length;i++){
			var text = this.student.activityList[i].toString();
			this.ctx.fillText(text,10,2+i);
		}	
	}

})