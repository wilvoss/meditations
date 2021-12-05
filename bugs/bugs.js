/// <reference path="../shared.js" />
/// <reference path="../log.js" />

var tempX;
var tempY;
var previousX;
var previousY;
var deltaX;
var deltaY;
var touchDetected;
var mouseDetected;
var pointerDown = false;
var bugs;
var lightning;
var buzzer1;
var buzzer2;
var useBuzzer = false;
var bugclasses = ['fly', 'mosquito', 'moth', 'ant', 'rfly', 'rmosquito', 'rmoth', 'rant'];

function zapFly(event) {
  event.preventDefault();

  if (event.touches != null) {
    tempX = event.touches[0].pageX;
    tempY = event.touches[0].pageY;
  } else {
    tempX = event.clientX;
    tempY = event.clientY;
  }

  bugs = document.getElementsByTagName('bugs')[0];
  lightning = document.getElementsByTagName('lightning')[0];
  buzzer1 = document.getElementById('shortBuzz');
  buzzer2 = document.getElementById('shortBuzz4');
  if (useBuzzer) {
    // window.navigator.vibrate(300);
    let br = getRandomInt(0, 100);
    if (br > 5) {
      buzzer1.play();
    } else {
      if (buzzer2.isPlaying) {
        buzzer1.play();
      } else {
        buzzer2.play();
      }
    }
  }
  lightning.style.backgroundPosition = tempX + 'px -20px';
  lightning.style.backgroundSize = 297 * (tempY / 524) + 'px ' + Number(tempY) + 'px';
  document.body.className = 'flash';
  window.setTimeout(() => {
    document.body.className = '';
  }, 10);
  let bug = document.createElement('bug');
  bug.className = bugclasses[getRandomInt(0, bugclasses.length)];
  window.setTimeout(() => {
    var styles = window.getComputedStyle(bug);
    var matrix = styles.transform.replace('matrix(', '').replace(')', '').split(',');
    let r = getRandomInt(56, 130);
    bug.style.transform = 'translate(' + Number(matrix[4]) + 'px, ' + Number(window.innerHeight - r) + 'px) scaleX(' + matrix[0] + ') scaleY(' + matrix[3] + ')';
    if (bug.className.indexOf('bzzz') != -1) {
      window.setTimeout(() => {
        // bug.transitionDuration = '0s';
        bug.style.transform = 'translate(' + Number(matrix[4]) + 'px, ' + Number(window.innerHeight - r) + 'px) scaleX(' + matrix[0] + ') scaleY(' + -matrix[3] + ')';
      }, 5000);
      window.setTimeout(() => {
        bug.className = bug.className + ' alive';
        bug.style.transform = 'translate(' + getRandomInt(0, window.innerWidth) + 'px, -100px) scaleX(' + matrix[0] + ') scaleY(' + -matrix[3] + ')';
      }, getRandomInt(6000, 14000));
    }
  }, 200);
  let bzzz = getRandomInt(0, 100);
  if (bzzz < 20 && (bug.className == 'fly' || bug.className == 'ant')) {
    bug.className = bug.className + ' bzzz';
  }

  let rand = Math.random() + 0.8;
  let randY = (rand * rand) / rand;
  bug.style.transform = 'translate(' + Number(tempX - 20) + 'px, ' + Number(tempY - 20) + 'px) scaleX(' + rand + ') scaleY(' + randY + ')';
  bugs.appendChild(bug);
}

function clearBugs() {
  bugs = document.getElementsByTagName('bugs')[0];
  bugs.innerHTML = '';
}

function keyDown(event) {
  if (event.key.toLowerCase() === 'escape') {
    clearBugs();
  } else if (event.key.toLowerCase() === 's') {
    useBuzzer = !useBuzzer;
  }
}

window.onkeydown = keyDown;
