/*
 *   Student.js
 */
var Student = Class.extend({
	init: function (stats){
		
		this.money = 1000;
		this.loans = 0;
		this.aid = new Array();

		//this.health = 100;
		this.mentalHealth = 100;
		//this.grades = 100;
		this.happyness = 0;
		this.sleep = 6;
		this.stress = 0;
		this.friends = 0;
		this.hwDue = 0;
		this.sleepPen = 1.0;
		this.stressEf = 0.8;
		this.parentDistance = 0;
		//this.maxHandle = 1.0;

		this.favFood = "Nachos";
		this.favWord = "Sweet";
		this.favColor = "#0000FF";

		this.schoolName = "Speed";
		this.semester = 0;
		this.hoursTaking = 0;
		this.hoursCompleted = 0;
		this.coopCompleted = 0;
		this.semesterOff = 0;
		this.timeLeft = 0;

		this.perception = new Attribute("perception",stats[0]);
		this.endurance = new Attribute("endurance",stats[1]);
		this.willpower  = new Attribute("willpower",stats[2]);
		this.charisma  = new Attribute("charisma",stats[3]); 
		this.wisdom  = new Attribute("wisdom",stats[4]); 
		this.intelligence  = new Attribute("intelligence",stats[5]);
		this.luck  = new Attribute("luck",stats[6]);

		this.attributeList = [this.perception,this.endurance,this.willpower,this.charisma,this.wisdom,this.intelligence,this.luck];

		this.grades = new Motives("grades");
		this.health = new Motives("health");
		this.social = new Motives("social");
		this.energy = new Motives("energy");
		this.fun = new Motives("fun");
		//this.responsibility = new Motives("responsibility");

		this.motivesList = [this.grades, this.health, this.social, this.energy, this.fun];

		this.dayOfWeek = ["Sun","Mon","Tue","Wed","Thr","Fri","Sat"];
		
		this.classAct = new Activity([0,5,5,5,5,5,0],"Class");
		this.schoolAct  = new Activity([8,5,5,5,5,5,5],"School");
		this.schoolAct.addAction(function(student,day,success){
			if(success){
				student.hwDue--;
				if(student.hwDue<0){
					student.hwDue = 0;
				}
					
			}
		});
		this.foodAct  = new Activity([2,2,2,2,2,2,2],"Food");
		this.healthAct  = new Activity([2,1,1,1,1,1,2],"Health");
		this.healthAct.addAction( function(student,day,success){
			if(success){
				student.health.amount+=1;
				if(student.health.amount>100)
					student.health.amount=100;
				student.fun.amount++;
				if(student.fun.amount>100)
					student.fun.amount=100;
			} else {
			//	student.health.amount+=2;
			}
		});
		this.hobbyAct  = new Activity([2,1,1,1,1,1,2],"Hobby");
		this.hobbyAct.addAction( function(student,day,success){
			if(success){
				student.health.amount+=.5;
				if(student.health.amount>100)
					student.health.amount=100;
			} else {
			//	student.health.amount+=2;
			}
		});
		this.hobbyAct.addAction( function(student,day,success){
			if(success){
				student.fun.amount+=.5;
				if(student.fun.amount>100)
					student.fun.amount=100;
			}
		});
		this.socialAct  = new Activity([1,2,2,2,2,2,3],"Social");
		this.sleepAct  = new Activity([8,8,8,8,8,8,8],"Sleep");
		this.sleepAct.addAction( function(student,day,success){
			if(success){
				student.sleep.amount+=1;
				if(student.fun.amount>100)
					student.fun.amount=100;
			}
		});
		this.workAct  = new Activity([0,0,0,0,0,0,0],"Work");

		this.activityList = [this.classAct, this.schoolAct,this.foodAct, this.healthAct, this.hobbyAct,this.socialAct,this.sleepAct,this.workAct ];
		//this.activityListOrd = 

		
		
	},
	payBill: function(cost){
		this.money -= cost;
	},
	start: function (){
		//printName();
	},
	update: function(workload, day){
		this.timeLeft = 24;
		this.hwDue += workload;
		
		if(this.sleep < 0){ //Sleep reserve is gone pay up 
			this.sleepPen = Math.abs(this.sleep) / 24;
			for(var i =0;i<Math.abs(this.sleep);i++){
				if(Math.random()<this.sleepPen){
					this.sleep++;
					this.timeLeft--;
				}
			}
		} else
		this.sleepPen = 1.0;
		for(var i =0;i<this.activityList.length;i++){
			this.activityList[i].update(this, day);
		}
		for(var i =0;i<this.motivesList.length;i++){
			this.motivesList[i].update(this, day);
		}

		if(this.hwDue > 0){
			if(Math.random()<this.stressEf*this.sleepPen)
				this.health.amount -= this.hwDue*.5;
		} else {
			this.grades.amount += 1;
		}
		if(this.hwDue/5+this.stress/5 > Math.random()*5*this.stressEf){
			 this.grades.amount -= this.hwDue/3;
			 //this.hwDue-=2;
		}



			
		
		
	}
})