/// <reference path="../shared.js" />
/// <reference path="../log.js" />

var r = document.querySelector(':root');
var c = window.getComputedStyle(r);
var backgroundImageURL = 'url(typeset-phone.jpg)';

var hue = 167;
var primaryHue = 247;
var newHue;
var newPrimaryHue;

var tempX;
var tempY;
var previousX;
var previousY;
var deltaX;
var deltaY;

function touchMove(event) {
  trackTouch(event);
}

function touchStart(event) {
  trackTouch(event);
}

function trackTouch(event) {
  tempX = event.touches[0].pageX;
  tempY = event.touches[0].pageY;
  if (tempX < 0) tempX = 0;
  if (tempY < 0) tempY = 0;
  return (touchDetected = true);
}

function GetMouseXY(a) {
  tempX = a.clientX;
  tempY = a.clientY;
  moveGradient();
  manipulateHue();
  return (mouseDetected = true);
}

function moveGradient() {
  var newX = (tempX / window.innerWidth) * 100;
  var newY = (tempY / window.innerHeight) * 100;
  r.style.setProperty('--locationX', newX + '%');
  r.style.setProperty('--locationY', newY + '%');
}

function manipulateHue() {
  deltaX = tempX - previousX;
  deltaY = tempY - previousY;
  var delta = (deltaX * deltaX > deltaY * deltaY ? deltaX : deltaY) / 2;

  if (!isNaN(delta)) {
    hue = Number(hue) + delta;
    if (hue > 360) {
      hue = hue - 360;
    }
    if (hue < 0) {
      hue = hue + 360;
    }
    r.style.setProperty('--hue', hue);

    primaryHue = hue + 180;
    if (primaryHue > 360) {
      primaryHue = primaryHue - 360;
    }
    if (primaryHue < 0) {
      primaryHue = primaryHue + 360;
    }
    r.style.setProperty('--primaryHue', primaryHue);
  }

  previousX = tempX;
  previousY = tempY;
}

window.onpointermove = GetMouseXY;
window.addEventListener('touchmove', touchMove, false);
window.addEventListener('touchstart', touchStart, false);
