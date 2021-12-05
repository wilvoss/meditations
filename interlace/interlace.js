/// <reference path="../shared.js" />
/// <reference path="../log.js" />

var xUnits, yUnits;
var r = document.querySelector(':root');
var selectedDot;
var dots = [];
var allDots = [];
var allDotsThatWereSelected = [];
var controlIsDown = false;
var eraser = false;
var mouseIsDown = false;
var reset = false;
var roundedCorners = false;
var multiplier = 80;
var query;
var widthChanger;

function init() {
  xUnits = window.innerWidth / multiplier - 1;
  r.style.setProperty('--gap', xUnits + 'px');
  for (var i = 0; i < 1320; i++) {
    var dot = document.createElement('dot');
    dot.id = 'dot' + (i + 1);
    dot.title = dot.id;
    if (i < 1320) {
      dot.style.backgroundImage = "url('images/" + dot.id + ".jpg')";
    }
    dot.onpointerenter = function () {
      if (mouseIsDown) {
        if (eraser) {
          this.className = '';
        } else {
          this.className = 'selected';
        }
      }
    };
    dot.onpointerleave = function () {};
    dot.onpointerdown = function () {
      eraser = this.className == 'selected';
      this.className = this.className == 'selected' ? '' : 'selected';
    };
    dots.push(dot);
  }
  applyDots();
  window.setTimeout(loadQuery, 200);
}

function applyDots() {
  for (let x = 0; x < dots.length; x++) {
    const dot = dots[x];
    document.getElementsByTagName('dots')[0].appendChild(dot);
  }
}

function roundDown(v) {
  return Math.pow(10, Math.floor(Math.log10(v)));
}

function loadQuery() {
  if (document.location.search !== '') {
    decompressDots(document.location.search);
  }
}

function resizeWindowWidth(value) {
  let temp = multiplier / value;
  if (multiplier >= 80) {
    multiplier = multiplier / value;
    xUnits = window.innerWidth / multiplier - 1;
    r.style.setProperty('--gap', xUnits + 'px');
    document.getElementById('doubleButton').disabled = multiplier <= 80;
  }
}

function compressDots() {
  var startingNumber = 0;
  var previousNumber = 0;
  var currentNumber = 0;
  var queryString = '';
  getAllSelectedDots().forEach((dot, dotX, dots) => {
    previousNumber = currentNumber;
    currentNumber = Number(dot.id.replace('dot', ''));
    if ((currentNumber != previousNumber + 1 || dotX === dots.length - 1) && currentNumber != previousNumber) {
      if (previousNumber != 0) {
        if (previousNumber != startingNumber) {
          queryString += '+' + Number(previousNumber - startingNumber) + ',' + currentNumber;
        } else {
          queryString += ',' + currentNumber;
        }
      } else {
        queryString += currentNumber;
      }
      startingNumber = currentNumber;
    }
  });
  return queryString;
}

function decompressDots(query) {
  if (query != '') {
    dotArrays = query.split('=')[1].split(',');
    var offset = Math.round(-dotArrays[0].split('+')[0] / multiplier / 2);
    if (window.innerHeight < window.innerWidth) {
      offset = ((offset + 3) * multiplier) / 2;
    } else {
      offset = 0;
    }
    dotArrays.forEach((dotArray) => {
      if (dotArray.indexOf('+') != -1) {
        dotStart = Number(dotArray.split('+')[0]);
        dotEnd = dotStart + Number(dotArray.split('+')[1]);
        for (let index = dotStart; index <= dotEnd; index++) {
          document.getElementById('dot' + Number(index + offset)).className = 'selected';
        }
      } else {
        document.getElementById('dot' + (Number(dotArray) + Number(offset))).className = 'selected';
      }
    });
  }
}

function saveQuery() {
  allDotsThatWereSelected = getAllSelectedDots();
  query = '?dots=' + compressDots();
  shareTransposition(query);
}

function shareTransposition(query) {
  if (!isNarrowScreen()) {
    var textarea = document.createElement('textarea');
    textarea.value = document.location.origin + document.location.pathname + query;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    // document.location.search = query;
    alert('A unique URL has been copied to the clipboard!');
  } else {
    document.location.href = 'sms:&body=' + encodeURIComponent(document.location.origin + document.location.pathname + query);
  }
}

function resetDots() {
  if (!reset) {
    allDotsThatWereSelected = getAllSelectedDots();
  }

  for (let index = 0; index < allDotsThatWereSelected.length; index++) {
    const dot = allDotsThatWereSelected[index];
    dot.className = !reset ? '' : 'selected';
  }
  reset = !reset;
}

function getAllSelectedDots() {
  allDots = document.getElementsByTagName('dot');
  var dots = [];
  for (let index = 0; index < allDots.length; index++) {
    const dot = allDots[index];
    if (dot.className == 'selected') {
      dots.push(dot);
    }
  }
  return dots;
}

function toggleRadius() {
  roundedCorners = !roundedCorners;
  if (roundedCorners) {
    r.style.setProperty('--borderRadius', '50%');
  } else {
    r.style.setProperty('--borderRadius', '0%');
  }
}

var showInternalDot = false;

function keyDown(e) {
  switch (e.key.toLowerCase()) {
    case 'escape':
      resetDots();
      break;
    case 'control':
      controlIsDown = true;
      break;
    case 'alt':
      eraser = true;
      break;
    case 'r':
      toggleRadius();
      break;
    case 's':
      saveQuery();
      break;
    case 'd':
      resizeWindowWidth(2);
      break;
    case 'h':
      resizeWindowWidth(0.5);
      break;
    default:
      break;
  }
}

function keyUp(e) {
  switch (e.key.toLowerCase()) {
    case 'control':
      controlIsDown = false;
      break;
    case 'alt':
      eraser = false;
      break;
    default:
      break;
  }
}

function pointerDown(e) {
  reset = false;
  allDotsThatWereSelected = [];
  mouseIsDown = true;
}

function pointerUp(e) {
  mouseIsDown = false;
  // saveQuery();
}

function touchMove(event) {
  var dot = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  dot.className = eraser ? '' : 'selected';
}

function pointerMove(event) {
  if (mouseIsDown) {
    var dot = document.elementFromPoint(event.clientX, event.clientY);
    dot.className = eraser ? '' : 'selected';
  }
}

window.onload = init;
window.onkeydown = keyDown;
window.onkeyup = keyUp;
window.onpointermove = pointerMove;
window.ontouchmove = touchMove;
window.onpointerdown = pointerDown;
window.onpointerup = pointerUp;
