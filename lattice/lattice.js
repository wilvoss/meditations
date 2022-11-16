/// <reference path="../shared.js" />
/// <reference path="../log.js" />

class FabricObject {
  constructor(spec) {
    this.id = spec.id === undefined ? '' : spec.id;
    this.threads = spec.threads === undefined ? [] : spec.threads;
    this.storedTransform = spec.storedTransform === undefined ? '' : spec.storedTransform;
  }
}

let r = document.querySelector(':root');
var drawnThreads;
var allThreads = [];
var allThings = [];
var lattice;
var previousX = 0;
var previousY = 0;
var tempX = window.innerWidth / 2;
var tempY = window.innerHeight / 2;
var threadsInterval;
var pointerDown = false;
var useASinH = false;
var width = 10;
var useDark = false;
var distance = 400;
var contracting = false;
var contracted = false;
var threadsMoving = false;
var mylatesttap;

function addThreads() {
  if (isNarrowScreen()) {
    document.getElementById('fiber1').style.display = 'none';
    document.getElementById('fiber2').style.display = 'none';
    document.getElementById('fiber3').style.display = 'none';
    document.getElementById('fiber4').style.display = 'none';
  }
  // if (getMobileOperatingSystem() !== 'unknown') {
  //   document.getElementById('glow').style.display = 'none';
  // } else {
  document.getElementById('glowRange').value = 10;
  document.getElementById('glowValue').innerHTML = '10px';
  setStyleVar('--glow', '10px');
  // }
  for (let x = 1; x < 5; x++) {
    const fabric = new FabricObject({});
    fabric.id = 'fabric' + parseInt(x - 1);
    let threadCount = window.innerWidth / (getMobileOperatingSystem() === 'unknown' ? 7 : 7);
    for (let z = 0; z < threadCount; z++) {
      const thread = document.createElement('canvas');
      const ratio = window.innerWidth / window.innerHeight;
      var size = 100 + x * 50 + getRandomInt(1, 50);
      thread.style.left = getRandomInt(-distance * ratio, window.innerWidth + distance) + 'px';
      thread.style.top = getRandomInt(-distance * ratio, window.innerHeight + distance) + 'px';
      thread.style.width = size + 'px';
      thread.style.height = size + 'px';
      thread.style.zIndex = x;
      fabric.threads.push(thread);
    }
    allThreads.push(fabric);
  }
  applyAddThreads();
}

function applyAddThreads() {
  lattice = document.getElementsByTagName('lattice')[0];
  for (let x = 0; x < allThreads.length; x++) {
    const fabric = allThreads[x];
    const drawnFabric = document.createElement('fabric');
    drawnFabric.id = fabric.id;
    for (let z = 0; z < fabric.threads.length; z++) {
      const thread = fabric.threads[z];
      drawnFabric.appendChild(thread);
    }
    lattice.appendChild(drawnFabric);
  }
  updateFabrics(true);
}

function updateFabrics() {
  for (let z = 0; z < allThreads.length; z++) {
    const fabric = allThreads[z];

    if (getMobileOperatingSystem() === 'unknown') {
      var modX = ((z + 1) * ((window.innerWidth / 100) * tempX)) / 100;
      var modY = ((z + 1) * ((window.innerHeight / 100) * tempY)) / 100;
      fabric.storedTransform = 'translate(' + modX + 'px, ' + modY + 'px)';
    } else {
      const style = window.getComputedStyle(document.getElementById(fabric.id));
      var px = tempX - previousX;
      var py = tempY - previousY;
      if (px != 0 || py != 0) {
        if (style.transform != 'none') {
          const matrix = style.transform;
          const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
          z = z + isNarrowScreen() ? z : 0;
          var x = Number(z + 1) * (Number(tempX < previousX) ? -1 : 1);
          var y = Number(z + 1) * (Number(tempY < previousY) ? -1 : 1);
          var modX = Number(matrixValues[4]) + x;
          var modY = Number(matrixValues[5]) + y;
          fabric.storedTransform = 'translate3d(' + modX + 'px, ' + modY + 'px, 0px)';
        } else {
          fabric.storedTransform = 'translate3d(0px, 0px, 0px)';
        }
      }
    }
  }
  previousX = tempX;
  previousY = tempY;
  applyFabricsTransforms();
}

function doubletap(event) {
  var now = new Date().getTime();
  var timesince = now - mylatesttap;
  if (timesince < 600 && timesince > 0) {
    contracted = !contracted;
    updateThreads(event);
  } else {
    // too much time to be a doubletap
  }

  mylatesttap = new Date().getTime();
}

function updateThreads(event) {
  event.preventDefault();
  event.stopPropagation();
  window.clearTimeout(threadsInterval);
  threadsMoving = true;
  let drawnThings = document.getElementsByTagName('canvas');
  if (!contracting) {
    contracting = true;
    for (let z = 0; z < drawnThings.length; z++) {
      const thread = drawnThings[z];
      var tx = tempX + thread.clientWidth / 2 - Number(thread.style.left.replace('px', ''));
      var ty = tempY + thread.clientHeight / 2 - Number(thread.style.top.replace('px', ''));
      thread.storedTransform = 'translate3d(' + tx + 'px, ' + ty + 'px, 0px)';
    }
  } else {
    contracting = false;
    for (let z = 0; z < drawnThings.length; z++) {
      const thread = drawnThings[z];
      thread.storedTransform = 'translate3d(0px, 0px, 0px)';
    }
  }

  applyThreadsTransforms();

  threadsInterval = window.setTimeout(() => {
    threadsMoving = false;
  }, 2000);
}

function applyThreadsTransforms() {
  let drawnThings = document.getElementsByTagName('canvas');
  for (let z = 0; z < drawnThings.length; z++) {
    const thread = drawnThings[z];
    thread.style.transform = thread.storedTransform;
  }
}

function applyFabricsTransforms() {
  for (let x = 0; x < allThreads.length; x++) {
    const fabric = allThreads[x];
    document.getElementById(fabric.id).style.transform = fabric.storedTransform;
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
  if (!threadsMoving) {
    updateFabrics();
  }

  return (touchDetected = true);
}

function pointerMove(a) {
  tempX = a.clientX;
  tempY = a.clientY;

  if (!threadsMoving) {
    updateFabrics();
  }

  return (mouseDetected = true);
}

// threadsInterval = window.setInterval(updateThreads, 6);
window.addEventListener('pointermove', pointerMove);
window.addEventListener('pointerdown', doubletap);

window.onload = addThreads;
