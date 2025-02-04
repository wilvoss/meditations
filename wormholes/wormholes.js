/// <reference path="../shared.js" />
/// <reference path="../log.js" />

var r = document.querySelector(':root');
var image1 = 'url(images/big_28.jpg)';
var image1Small = 'url(images/small_28.jpg)';
var image2 = 'url(images/big_27.jpg)';
var image2Small = 'url(images/small_27.jpg)';
var imgPreload;
var thumbPreload;
var tunnels = document.getElementById('tunnels');
var tunnel;
var skin = document.getElementsByTagName('skin')[0];
var isGlass = true;
var isSphere = true;
var isDeep = false;
var tempX = window.innerWidth < window.innerHeight ? 130 : 420;
var tempY = window.innerWidth < window.innerHeight ? 380 : 100;
var baseLineX = 0;
var baseLineY = 0;
var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;
var isDragging = false;
var draggedElement;
var current = image1;
var worm = image2Small;
var currentNumber = 28;
var wormNumber = 27;
var wormInterval = window.setInterval(squiggleTunnels, 8000);
var wormTimer = window.setTimeout(squiggleTunnels, 1);
var rings = document.getElementsByTagName('ring');
var mouseDetected = false;
var touchDetected = false;
var changeScale = false;
var count = 1;
var scale = 0.9;
var wormInt;

function squiggleTunnels() {
  rings = document.getElementsByTagName('ring');
  for (let index = 0; index < rings.length; index++) {
    const ring = rings[index];
    if (ring.parentElement.tagName.toLowerCase() == 'tunnel') {
      var randoX = getRdmInt(4, 12);
      var randoY = getRdmInt(4, 12);
      var randoScale = getRdmInt(9, 12) / 10;
      randoScale = changeScale ? randoScale : 1;
    }
    ring.randoX = randoX;
    ring.randoY = randoY;
    ring.randoScale = randoScale;
  }
  applySquiggles();
}

function applySquiggles() {
  for (let index = 0; index < rings.length; index++) {
    const ring = rings[index];
    ring.style.setProperty('--positionX', ring.randoX + 'px');
    ring.style.setProperty('--positionY', ring.randoY + 'px');
    ring.style.setProperty('--scale', ring.randoScale);
  }
}

function blowOutTunnel(event, element) {
  if (!isDragging) {
    if (event != null) {
      event.stopPropagation();
    }
    r.style.setProperty('--backgroundBlendMode', 'normal');
    if (tunnel != null && tunnel != undefined) {
      tunnel = document.getElementById('tunnel');
      tunnels = document.getElementById('tunnels');
      skin = document.getElementsByTagName('skin')[0];
      tunnels.innerHTML = '';
      skin.classList.add('blowout');
      currentNumber = wormNumber;
      wormNumber = wormInt;
      toggleBackground(element);
      window.setTimeout(function () {
        skin.classList.remove('blowout');
        tunnel = null;
      }, 250);
    }
  }
}

function toggleBackground(element) {
  current = element.style.backgroundImage.replace('small', 'big');
  document.body.style.backgroundImage = current;
}

function getRdmInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function touchMove(event) {
  event.stopPropagation();
  event.preventDefault();
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
  dragElement();
  return (touchDetected = true);
}

function GetMouseXY(a) {
  tempX = a.clientX;
  tempY = a.clientY;

  dragElement();

  return (mouseDetected = true);
}

function beginDragging(event, element) {
  event.stopPropagation();
  event.preventDefault();

  if (!isDragging) {
    isDragging = true;

    draggedElement = element;
  }
}

function dragElement() {
  if (baseLineX == 0 && draggedElement != undefined && draggedElement != null) {
    const style = window.getComputedStyle(draggedElement);
    const matrix = style.transform;
    const matrixVbase = matrix.match(/matrix.*\((.+)\)/);
    if (matrixVbase != null && matrixVbase.length > 0) {
      const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
      baseLineX = tempX - matrixValues[4];
      baseLineY = tempY - matrixValues[5];
    }
  }
  if (isDragging) {
    var left = tempX - baseLineX;
    var top = tempY - baseLineY;
    draggedElement.tempLeft = left;
    draggedElement.tempTop = top;
    applyDrag();
  }
}

function applyDrag() {
  draggedElement.style.transform = 'translate(' + draggedElement.tempLeft + 'px, ' + draggedElement.tempTop + 'px)';
}

function stopDragging(event, element) {
  event.stopPropagation();
  event.preventDefault();

  isDragging = false;
  baseLineX = 0;
  baseLineY = 0;
  draggedElement = null;
}

function toggleGlass(event) {
  event.stopPropagation();
  event.preventDefault();
  isGlass = !isGlass;
  if (tunnel != undefined) {
    tunnel.className = isGlass ? 'init' : 'init dark';
    r.style.setProperty('--tunnelBackground', isGlass ? 'var(--glassRings)' : 'var(--darkRings)');
  }
  document.body.className = isGlass ? 'glass' : '';
  document.getElementById('glassValue').innerHTML = isGlass;
}

function toggleSphere(event) {
  event.stopPropagation();
  event.preventDefault();
  isSphere = !isSphere;
  r.style.setProperty('--tunnelSphere', isSphere ? '-30px -30px 120px var(--tunnelMediumDark)' : 'none');
  document.getElementById('sphereValue').innerHTML = isSphere;
}

function toggleDepth(event) {
  event.stopPropagation();
  event.preventDefault();
  isDeep = !isDeep;
  r.style.setProperty('--tunnelDepth', isDeep ? '75%' : '82%');
  document.getElementById('depthValue').innerHTML = isDeep;
}

function toggleAnimation(event) {
  changeScale = !changeScale;
  var label = document.getElementById('animateCheckboxValue');
  label.innerHTML = changeScale;
  squiggleTunnels(); // document.body.className = document.body.className == 'moveRings' ? '' : 'moveRings';
}

var tunnelInc = 0;

function clearAllTunnels() {
  tunnels = document.getElementsByTagName('tunnel');
  for (let index = tunnels.length - 1; index >= 0; index--) {
    const tunnel = tunnels[index];
    document.getElementsByTagName('tunnels')[0].removeChild(tunnel);
  }
  r.style.setProperty('--backgroundBlendMode', 'normal');
}

function placeTunnel(event, center = false) {
  if (event !== null) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!isDragging || draggedElement == null) {
    r.style.setProperty('--backgroundBlendMode', 'luminosity');
    tunnels = document.getElementById('tunnels');
    var scale = 1;
    var size = getRdmInt(10, 15);
    var x = tempX - 50 * scale;
    var y = tempY - 30 * scale;
    if (center) {
      x = window.innerWidth / 2 - 50 * scale;
      y = window.innerHeight / 2 - 30 * scale;
    }

    // if (tunnel != undefined && tunnel != null) {
    //   tunnels.removeChild(tunnel);
    // }

    tunnel = document.createElement('tunnel');
    tunnel.className = 'init' + (isGlass ? ' glass' : ' dark');
    tunnel.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    tunnels.appendChild(tunnel);
    tunnel.style.width = size + 'em';
    tunnel.style.height = size + 'em';
    tunnel.id = 'tunnel' + tunnelInc++;
    var r1 = document.createElement('ring');
    tunnel.appendChild(r1);
    var r2 = document.createElement('ring');
    r1.appendChild(r2);
    var r3 = document.createElement('ring');
    r2.appendChild(r3);
    var r4 = document.createElement('ring');
    r3.appendChild(r4);
    var r5 = document.createElement('ring');
    r4.appendChild(r5);
    var r6 = document.createElement('ring');
    r5.appendChild(r6);
    var r7 = document.createElement('ring');
    r6.appendChild(r7);
    var r8 = document.createElement('ring');
    r8.className = 'exit';
    r7.appendChild(r8);
    setTimeout(() => {
      r8.onpointerdown = function () {
        blowOutTunnel(event, r8);
      };
      tunnel.onpointerdown = function () {
        beginDragging(event, this);
      };
      tunnel.onpointerup = function () {
        stopDragging(event, this);
      };
      tunnel.ondragstart = () => false;
    }, 300);

    window.clearInterval(wormInterval);
    window.clearTimeout(wormTimer);

    currentNumber = wormNumber;
    worm = 'url(' + thumbPreload.src + ')';
    wormInt = preloadWormInt();
    var img = document.createElement('img');
    img.src = 'images/big_' + wormInt + '.jpg';
    img.title = 'This is a non-visible large placeholder for pre-caching upcoming images.';
    img.onload = function () {
      document.body.removeChild(this);
    };
    document.body.appendChild(img);

    thumbPreload.src = 'images/small_' + wormInt + '.jpg';
    r8.style.backgroundImage = worm;
    wormInterval = window.setInterval(squiggleTunnels, 8000);
    wormTimer = window.setTimeout(squiggleTunnels, 100);
  }
}

function test() {
  alert('hi');
}

function preloadWormInt() {
  var int = getRdmInt(1, 36);
  if (int == currentNumber) {
    while (Number(int) == Number(currentNumber)) {
      int = getRdmInt(1, 36);
      if (int != currentNumber) {
        break;
      }
    }
  }
  return int;
}

window.onload = function () {
  wormInt = preloadWormInt();

  imgPreload = document.createElement('img');
  imgPreload.id = 'preloadLarge';
  imgPreload.title = 'This is a non-visible large placeholder for pre-caching upcoming images.';
  imgPreload.src = 'images/big_' + wormInt + '.jpg';
  document.body.appendChild(imgPreload);

  thumbPreload = document.createElement('img');
  thumbPreload.id = 'preloadSmall';
  thumbPreload.style.overflow = 'hidden';
  thumbPreload.title = 'This is a non-visible small placeholder for pre-caching upcoming images.';
  thumbPreload.src = 'images/small_' + wormInt + '.jpg';

  document.body.appendChild(thumbPreload);
  placeTunnel(null, true);
};

function onKeyUp(e) {
  switch (e.key.toLowerCase()) {
    case 'g':
      toggleGlass(e);
      break;

    case 'r':
      toggleSphere(e);
      break;

    case 'd':
      toggleDepth(e);
      break;

    case 'o':
      toggleAnimation(e);
      break;

    case 'escape':
      clearAllTunnels();
      break;
  }
}

if (window.addEventListener) {
  window.addEventListener('keyup', onKeyUp);
} else {
  window.attachEvent('onkeyup', onKeyUp);
}

window.onunload = function () {
  window.clearInterval(wormInterval);
  window.clearTimeout(wormTimer);
};

window.onpointermove = GetMouseXY;
window.addEventListener('touchmove', touchMove, false);
window.addEventListener('touchstart', touchStart, false);
