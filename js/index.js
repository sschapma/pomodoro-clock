$(document).ready(function() {
  $(".settings").hide(); //settings modal hidden by default
  $('#pause').hide(); //pause button hidden until timer started
  $(".fa").click(function(){
    $(".settings").toggle();
  });
});

// initial settings & variables
var myInterval;
var workTime = document.getElementById("work").innerHTML=25;
var restTime = document.getElementById("break").innerHTML=5;
var remainSec = workTime*60;
var sessionNumber = 1;
document.getElementById("timer").innerHTML=workTime + ":00";

// begins timer
function startWork(){
  document.getElementById("start").disabled = true;
  timer(callback);
  $(".settings").hide();
  $('#start').hide();
  $('#pause').show();
  $('#status').show();
  $('#statusBottom').show();
};

//pauses timer
function pauseTime(){
  clearInterval(myInterval);
  document.getElementById("start").disabled = false;
  $('#start').show();
  $('#pause').hide();
}

// adjusts formatting of time display (adds colon between min & sec and adds 0 if necessary)
function displayTime(remainingTime){
if(remainingTime%60 >= 10) {
  document.getElementById('timer').innerHTML=Math.floor(remainingTime/60) + ':' + Math.floor(remainingTime%60);
   }
else{
  document.getElementById('timer').innerHTML=Math.floor(remainingTime/60) + ':' + "0" + Math.floor(remainingTime%60) ;
    }
}

//controls timer
function timer(cb) {
  var remainingTime = remainSec;
  document.getElementById('status').innerHTML="Session " + sessionNumber;
  document.getElementById('statusBottom').innerHTML="Session " + sessionNumber;
  myInterval=setTimeout(function() {
    displayTime(remainingTime);
    if (remainingTime >= 0) {
      remainSec--;
      timer(cb);
    }
    else{
    clearInterval();
    cb();
    }
  }, 1000);
}

//moves from work to break
var callback = function() {
  console.log('callback');
  $('#status').hide();
  $('#breakTime').text("Break Time!");
  $('#statusBottom').hide();
  $('#breakTimeBottom').text("Break Time!");
  document.getElementById('timer').innerHTML="Break Time";
  remainSec=restTime*60;
  timer(callbackRest)
  document.getElementById('bell').play();

};

// moves from break to the next session
var callbackRest = function() {
  clearInterval(myInterval);
  console.log('callbackRest');
  sessionNumber++;
  $('#status').show();
  $('#breakTime').hide();
  $('#statusBottom').show();
  $('#breakTimeBottom').hide();
  document.getElementById('status').innerHTML="Session " + sessionNumber;
  document.getElementById('statusBottom').innerHTML="Session " + sessionNumber;
  document.getElementById('timer').innerHTML="Session " + sessionNumber;
  document.getElementById('bell').play();
  remainSec=workTime*60;
  document.getElementById("start").disabled = true;
  $('#start').hide();
  $('#pause').show();
  timer(callback);
};

//resets the clock
function resetTime(){
  clearInterval(myInterval);
  remainSec=workTime*60;
  document.getElementById("start").disabled = false;
  sessionNumber = 1;
  $('#start').show();
  $('#pause').hide();
  $('#status').hide();
  $('#statusBottom').hide();
  $('#breakTime').hide();
  $('#breakTimeBottom').hide();
  document.getElementById("timer").innerHTML=workTime + ":00"
}

//the following 4 functions +/- time for work and break

function minusWork(){
  if(workTime >= 2) {
  pauseTime();
  document.getElementById('work').innerHTML=--workTime;
  document.getElementById("timer").innerHTML=workTime + ":00";
  remainSec=workTime*60;
  }
}
function minusBreak(){
  if(restTime>=2) {pauseTime();document.getElementById('break').innerHTML=--restTime;}
}
function plusWork(){
  pauseTime();
  document.getElementById('work').innerHTML=++workTime;
  document.getElementById("timer").innerHTML=workTime + ":00";
  remainSec=workTime*60;
}
function plusBreak(){
  pauseTime();
  document.getElementById('break').innerHTML=++restTime;
}

// listen for button clicks to adjust settings and timer
document.getElementById('start').addEventListener('click', startWork);
document.getElementById('pause').addEventListener('click', pauseTime);
document.getElementById('reset').addEventListener('click', resetTime);
document.getElementById('minw').addEventListener('click',minusWork);
document.getElementById('minb').addEventListener('click',minusBreak);
document.getElementById('pluw').addEventListener('click',plusWork);
document.getElementById('plub').addEventListener('click',plusBreak);
