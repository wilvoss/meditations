/// <reference path="../shared.js" />
/// <reference path="../log.js" />

let r = document.querySelector(':root');
let allBlinds = [];
let midPoint = window.innerWidth / 2;
var tempX = midPoint;
var tempY;
var allDrawnBlinds;

function touchMove(event) {
  trackTouch(event);
}

function touchStart(event) {
  trackTouch(event);
}

function addBlinds(togglenav = true) {
  const adjustment = window.innerWidth / 20;
  // adjustment = Math.parse(adjustment + 2);
  for (let x = 0; x < adjustment + 2; x++) {
    const blind = document.createElement('blind');
    blind.style.left = x * 20 + 'px';
    blind.style.transform = 'rotate3d(0,1,0,' + (tempX / 20 - x) + 'deg) matrix(1, 0, 0, 1, 0, 0)';
    allBlinds.push(blind);
  }
  applyAddBlinds();
  if (togglenav) toggleNav(event);
  updateLayout();
}

function applyAddBlinds() {
  const blinds = document.getElementsByTagName('blinds')[0];
  for (let x = 0; x < allBlinds.length; x++) {
    const blind = allBlinds[x];
    blinds.appendChild(blind);
  }
  allDrawnBlinds = document.getElementsByTagName('blind');
}

function updateLayout() {
  allDrawnBlinds = document.getElementsByTagName('blind');
  for (let x = 0; x < allDrawnBlinds.length; x++) {
    const blind = allDrawnBlinds[x];
    blind.storedTransform = 'rotate3d(0,1,0,' + (90 - (tempX / 20 - x)) + 'deg) matrix(1, 0, 0, 1, 0, 0)';
  }
  applyUpdate();
}

function applyUpdate() {
  allDrawnBlinds = document.getElementsByTagName('blind');
  for (let x = 0; x < allDrawnBlinds.length; x++) {
    const blind = allDrawnBlinds[x];
    // log(blind.storedTransform);
    blind.style.transform = blind.storedTransform;
  }
}

function trackTouch(event) {
  tempX = event.touches[0].pageX;
  tempY = event.touches[0].pageY;
  if (tempX < 0) tempX = 0;
  if (tempY < 0) tempY = 0;
  return (touchDetected = true);
}

function pointerMove(a) {
  tempX = a.clientX;
  tempY = a.clientY;
  updateLayout();
  return (mouseDetected = true);
}

function resetBlinds() {
  allBlinds = [];
  const blinds = document.getElementsByTagName('blinds')[0];
  blinds.innerHTML = '';
  addBlinds(false);
}

window.addEventListener('pointermove', pointerMove);
window.onload = addBlinds;
window.onresize = resetBlinds;
