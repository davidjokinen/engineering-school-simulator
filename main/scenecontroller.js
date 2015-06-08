/*
 *   SceneController.js
 */
var SceneController = Class.extend({
	init: function (){
		this.scene = new Array();
		this.ctx;
	},
	addScene: function (add){
		add.controller = this;
		add.ctx = this.ctx;
		this.scene.push(add);
  		this.scene[this.scene.length-1].start();
	},
	returnScene: function (){
		var scene = this.scene.splice(this.scene.length-1,1);
  		this.scene[this.scene.length-1].returnScene(scene[0]);
	},
	action: function (input){
		this.scene[this.scene.length-1].action(input);
	}
})