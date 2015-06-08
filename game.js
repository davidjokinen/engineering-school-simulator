/*
 *   main.js
 */
var fs = require("fs");
function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

include('./main/base.js');
include('./main/basescreen.js');
include('./main/render/consolescreen.js');
include('./main/scenecontroller.js');
include('./main/options.js');

include('./main/scene.js');
include('./main/scenes/gui/popupedit.js');
include('./main/scenes/setup.js');
include('./main/scenes/createstudent.js');
include('./main/scenes/gui/textwindow.js');
include('./main/scenes/gui/askquestions.js');
include('./main/scenes/setuplife.js');
include('./main/scenes/schooloverview.js');
include('./main/scenes/speedsim.js');
include('./main/scenes/losescene.js');
include('./main/scenes/teaser.js');
include('./main/sim/activity.js');
include('./main/sim/motives.js');
include('./main/sim/attribute.js');
include('./main/sim/student.js');

var ctx = new ConsoleScreen();
ctx.width = process.stdout.columns;
ctx.height = process.stdout.rows;
var sceneCtr = new SceneController();
sceneCtr.ctx = ctx;
var sys = require("sys");
var stdin = process.openStdin();
var next;
stdin.addListener("data", function(d) {
    var stdinString = d.toString().substring(0, d.length-1)+"";
    sceneCtr.action(stdinString);
})
process.stdout.on('resize', resize);
function resize() {
  ctx.width = process.stdout.columns;
  ctx.height = process.stdout.rows;
  ctx.resize();
  ctx.drawScreen();
  //console.log(process.stdout.columns + 'x' + process.stdout.rows);
}

sceneCtr.addScene(new Setup());