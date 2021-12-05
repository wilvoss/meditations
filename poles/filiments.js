/// <reference path="../shared.js" />
/// <reference path="../log.js" />

let r = document.querySelector(':root');
var drawnFiliments;
var allFiliments = [];
var filimentsElement;
var tempX = 0;
var tempY = 0;
var filimentsInterval;
var influence = -1;
var pointerDown = false;
var useASinH = false;
var width = 10;
var useDark = false;

function addFiliments() {
  filimentsElement = document.getElementsByTagName('filiments')[0];
  let count = !isNarrowScreen() ? 2000 : 800;
  for (let x = 0; x < count; x++) {
    const filiment = document.createElement('filiment');
    filiment.storedStyleLeft = getRandomInt(-300, window.innerWidth + 100) + 'px';
    filiment.storedStyleTop = getRandomInt(-300, window.innerHeight + 100) + 'px';
    filiment.storedStyleZIndex = x;
    allFiliments.push(filiment);
  }
  applyAddFiliments();
  updateFiliments(true);
}

function applyAddFiliments() {
  for (let x = 0; x < allFiliments.length; x++) {
    const filiment = allFiliments[x];
    filiment.style.left = filiment.storedStyleLeft;
    filiment.style.top = filiment.storedStyleTop;
    filiment.style.zIndex = filiment.storedStyleZIndex;
    filimentsElement.appendChild(filiment);
  }
}

function repositionFiliments() {
  for (let x = 0; x < allFiliments.length; x++) {
    const filiment = allFiliments[x];
    filiment.style.left = getRandomInt(-300, window.innerWidth + 100) + 'px';
    filiment.style.top = getRandomInt(-300, window.innerHeight + 100) + 'px';
  }
  updateFiliments(true);
}

function updateFiliments(clean = false, _influence) {
  if (_influence != undefined) {
    influence = _influence;
  }
  if (pointerDown || clean) {
    width = Number(r.style.getPropertyValue('--filimentWidth').replace('px', ''));

    for (let x = 0; x < allFiliments.length; x++) {
      const filiment = allFiliments[x];
      const wx = Number(filiment.offsetLeft + width - tempX - filiment.clientWidth / 2);
      const wy = Number(filiment.offsetTop - tempY + filiment.clientHeight / 2);
      const deg = influence * (useASinH ? Math.asinh(wx, wy) * 100 : Math.atan2(wx, wy) * 100);
      const transform = 'rotate(' + deg + 'deg)';
      filiment.storedTransform = transform;
    }
  }
  applyTransforms();
}

function switchColor() {
  for (let x = 0; x < allFiliments.length; x++) {
    const filiment = allFiliments[x];
    filiment.className = useDark ? 'dark' : '';
  }
}

function applyTransforms() {
  for (let x = 0; x < allFiliments.length; x++) {
    const filiment = allFiliments[x];
    filiment.style.transform = filiment.storedTransform;
  }
}

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
  updateFiliments();
  return (touchDetected = true);
}

function pointerMove(a) {
  tempX = a.clientX;
  tempY = a.clientY;
  updateFiliments();
  return (mouseDetected = true);
}

// filimentsInterval = window.setInterval(updateFiliments, 16);
window.addEventListener('pointermove', pointerMove);

window.onload = addFiliments;
window.onresize = repositionFiliments;
