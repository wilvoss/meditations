/// <reference path="../shared.js" />
/// <reference path="../log.js" />
/// <reference path="levels.js" />

var level, theCell, currentRoomIndex, oldz, coor, theOldMap, menuState, currentSelect, theOffset, ahead, right, theMenuTimer, previousDirection, tc, currentRoomContents, lvl, startingPoints, stairsUp, stairsDown;
var firstTime = 0;
var shiftIsOn = false;
var northDiffs = new Array(31, -1, -33, -65, 32, 0, -32, -64, 33, 1, -31, -63);
var westDiffs = new Array(33, 32, 31, 30, 1, 0, -1, -2, -31, -32, -33, -34);
var southDiffs = new Array(-31, 1, 33, 65, -32, 0, 32, 64, -33, -1, 31, 63);
var eastDiffs = new Array(-33, -32, -31, -30, -1, 0, 1, 2, 31, 32, 33, 34);
var interaction = $('#interaction')[0].getElementsByTagName('r');
var grid = $('#grid');
var TPs = $('#TPs');
var gridToggle = $('#gridToggle');
var tAC = $('#coor');
var lGB = $('#legendButton');
var theIB = $('#theInfoBox');
var tHL = $('#highlight');
var infoButton = $('#infoButton');
var endHighlight = $('#endHighlight');
var legend = $('#legend');
var roomTable = $('#roomTable');
var viewl1 = $('#l1');
var viewl2 = $('#l2');
var viewl3 = $('#l3');
var viewf1 = $('#f1');
var viewf2 = $('#f2');
var viewf3 = $('#f3');
var viewr1 = $('#r1');
var viewr2 = $('#r2');
var viewr3 = $('#r3');
var backgroundView = $('#viewBackground');
var theLegendGs = legend[0].getElementsByTagName('g');
var theLegendDivs = legend[0].getElementsByTagName('r');
var characterDirection = 'north';
var tOS = null;
var tOS2 = null;
var tOS3 = null;
var tOS4 = null;
var tOS5 = null;
var tOE = null;
var theOldTP = null;
var tpH = 'tpHighlight';
var aR = 'aR';
var scaleFactor = 1;
var isFNPressed = false;

var allLevels = new Array(dc(level1), dc(level2), dc(level3), dc(level4), dc(level5), dc(level6), dc(level7), dc(level8), dc(level9), dc(level10), dc(level11), dc(level12), dc(level13), dc(level14), dc(level15), dc(level16));
function fullRoomView() {
  this.l0;
  this.l1;
  this.l2;
  this.l3;
  this.f0;
  this.f1;
  this.f2;
  this.f3;
  this.r0;
  this.r1;
  this.r2;
  this.r3;
  this.all;
}
var currentView = new fullRoomView();

// utilities
function dc(level) {
  var l = level.split('-');
  return l;
}
function mailToIt(address) {
  var theBits = address.split(' ');
  var theAddy = theBits[0] + '@' + theBits[1] + '.' + theBits[2];
  window.location.href = 'mailto:' + theAddy;
}
function parseAttributes(cell) {
  cell = cell.split(',');
  return cell;
}
function toggleGrid() {
  if (grid.css('display') == 'none') {
    createCookie('grid', 'block', 5000);
    grid.css('display', 'block');
    gridToggle.addClass('numberOn').removeClass('number');
  } else {
    createCookie('grid', 'none', 5000);
    grid.css('display', 'none');
    gridToggle.addClass('number').removeClass('numberOn');
  }
}
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = '; expires=' + date.toGMTString();
  } else var expires = '';
  document.cookie = name + '=' + value + expires + '; path=/';
}
function readCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  createCookie(name, '', -1);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
  if (isNarrowScreen()) {
    document.getElementById('uberControls').style.display = 'none';
    document.getElementById('uberControlsSpan').style.display = 'none';
    document.getElementById('cta').style.display = 'none';
  }
  toggleMain(null);
}

// map
function revealMap(theLevel) {
  top.document.title = 'zavatar maps - level ' + theLevel;
  if (tOS != null) {
    if (tOS2) {
      tOS2.className = aR;
      tOS2.innerHTML = '';
    }
    if (tOS3) {
      tOS3.className = aR;
      tOS3.innerHTML = '';
    }
    if (tOS4) {
      tOS4.className = aR;
      tOS4.innerHTML = '';
    }
    if (tOS5) {
      tOS5.className = aR;
      tOS5.innerHTML = '';
    }
    tOS.className = aR;
    tOE.className = aR;
    roomTable.css('opacity', '1');
    tOS.innerHTML = '';
    theOldTP = null;
  }

  level = theLevel;
  if (level > 16) level = 1;
  createCookie('level', level, 5000);
  if (theOldMap) {
    $('#' + theOldMap)
      .addClass('number')
      .removeClass('numberOn');
  }
  theOldMap = 'map' + theLevel;
  $('#' + theOldMap)
    .addClass('numberOn')
    .removeClass('number');
  $('#levelNumber')[0].innerHTML = theLevel;
  theMap = allLevels[parseInt(theLevel) - 1];
  if (theLevel == '1') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>12, 28</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>1, 7</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>18, 3</a></p>";
  } else if (theLevel == '2') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>18, 19</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>22, 24</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>18, 21</a></p>";
  } else if (theLevel == '3') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>18, 7</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>27, 3</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>15, 15</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>12, 20, 4</a></p>";
  } else if (theLevel == '4') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>17, 8</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>21, 16</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>6, 15</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>14, 5</a></p>";
  } else if (theLevel == '5') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>5, 4</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>15, 14, 2</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>12, 19</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>5, 22</a></p>";
  } else if (theLevel == '6') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>28, 1</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>29, 29, 11</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>14, 26</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>1, 21</a></p>";
  } else if (theLevel == '7') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>29, 26</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>24, 16, 5</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>20, 4</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>8, 5</a></p>";
  } else if (theLevel == '8') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>17, 4</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>17, 14</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>15, 5</a></p>";
  } else if (theLevel == '9') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>15, 13</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>18, 8, 7</a></p>";
  } else if (theLevel == '10') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>14, 24</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>4, 4</a></p><p>3: <a href='javascript:' onclick='toggleTP(3);'>1, 26</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>25, 1</a></p>";
  } else if (theLevel == '11') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>28, 3, 7</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>1, 11</a></p>";
  } else if (theLevel == '12') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>20, 2</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>7, 2</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>4, 27</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>9, 15</a></p>";
  } else if (theLevel == '13') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>16, 16</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>28, 6</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>13, 17</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>6, 19</a></p>";
  } else if (theLevel == '14') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>25, 25</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>10, 18</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>25, 6</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>9, 18, 12</a></p>";
  } else if (theLevel == '15') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>16, 29</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>25, 30</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>20, 6</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>9, 18</a></p>";
  } else if (theLevel == '16') {
    theTPDetails = "<p>1: <a href='javascript:' onclick='toggleTP(1);'>15, 15</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>13, 23</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>21, 18</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>8, 12</a></p> <p>5: <a href='javascript:' onclick='toggleTP(5);'>28, 11</a></p>";
  }

  for (x = 0; x < theMap.length; x++) {
    theCell = parseAttributes(theMap[x]);
    for (y = 0; y < 5; y++) {
      var theDivs = $('#mainRoom')[0].getElementsByTagName('td')[x].getElementsByTagName('r');
      if (y < theCell.length) {
        theDivs[y].className = theCell[y];
      } else {
        theDivs[y].className = 'noW';
      }
    }
    theCell = null;
  }
  $('#TPs')[0].innerHTML = theTPDetails;
  if (currentSelect != null) tM(currentSelect, true);
}
function placeDiv(a, z) {
  a.style.left = z.offsetLeft - 25 + 'px';
  a.style.top = z.offsetTop - 1 + 'px';
}

function restoreGrid(gridState) {
  if (gridState != null) {
    grid.css('display', gridState);
    if (gridState == 'block') {
      gridToggle.addClass('numberOn').removeClass('number');
    } else {
      gridToggle.addClass('number').removeClass('numberOn');
    }
  }
}

function getRoomName(z) {
  for (var i = 0; i < interaction.length; i++) {
    if (interaction[i] == z) {
      return 'Room ' + (i % 32) + '_' + (31 - Math.floor(i / 32));
    }
  }
}
function getRoomCoor(z) {
  for (var i = 0; i < interaction.length; i++) {
    if (interaction[i] == z) {
      return [i % 32, 31 - Math.floor(i / 32)];
    }
  }
}
function getRoomIndex(tcoor) {
  //console.log(tcoor);
  if (tcoor != null) {
    var tcx = parseInt(tcoor[0]);
    var tcy = parseInt(tcoor[1]);
    lvl = allLevels[level - 1];
    return tcx + (31 - tcy) * 32;
  }
}
function getElementBasedOnRoomName(roomname) {
  var b = roomname.replace('Room ', '').split('_');
  var index = parseInt(b[0]) + (31 - parseInt(b[1])) * 32;
  return interaction[index];
}

function tM(z, bypassMenu) {
  currentSelect = z;
  bypassMenu = bypassMenu == null ? false : bypassMenu;
  var room = getRoomName(z);
  tc = getRoomCoor(z);
  createCookie('room', room, 5000);
  getCurrentRoomContents();
  highlightLegend();
  if (bypassMenu || ($('#coor')[0].innerHTML.indexOf('Room') == -1 && $('#endCoor')[0].innerHTML.indexOf('Room') == -1)) {
    showStart();
  } else {
    var hl = $('#menu');
    hl.css('display', 'block');
    placeDiv(hl[0], z);
    menuOn();
  }
  reactToRoomContents();
}
function getCurrentRoomContents() {
  currentRoomIndex = getRoomIndex(tc);
  currentRoomContents = getRoomContents(currentRoomIndex, true);
  getBaseRoomViewElements();
}
function reactToRoomContents() {
  if (currentView.f1.indexOf('dtp') != -1) {
    revealMap(parseInt(level) + 1);
  } else if (currentView.f1.indexOf('utp') != -1) {
    revealMap(parseInt(level) - 1);
  } else if (currentView.f1.indexOf('c1') != -1) {
    revealMap(parseInt(level) + 1);
  } else if (currentView.f1.indexOf('c2') != -1) {
    revealMap(parseInt(level) + 2);
  } else if (currentView.f1.indexOf('c3') != -1) {
    revealMap(parseInt(level) + 3);
  } else if (currentView.f1.indexOf('ra') != -1) {
    changeDir('right');
  } else if (currentView.f1.indexOf('ua') != -1) {
    changeDir('up');
  } else if (currentView.f1.indexOf('la') != -1) {
    changeDir('left');
  } else if (currentView.f1.indexOf('da') != -1) {
    changeDir('down');
  } else if (currentView.f1.indexOf('tp1') != -1) {
    teleportToTP(1);
  } else if (currentView.f1.indexOf('tp2') != -1) {
    teleportToTP(2);
  } else if (currentView.f1.indexOf('tp3') != -1) {
    teleportToTP(3);
  } else if (currentView.f1.indexOf('tp4') != -1) {
    teleportToTP(4);
  } else if (currentView.f1.indexOf('tp5') != -1) {
    teleportToTP(5);
  } else if (currentView.f1.indexOf('rtp') != -1) {
    var tpRoom = getElementBasedOnRoomName('Room ' + getRandomInt(1, 30) + '_' + getRandomInt(1, 30));
    tM(tpRoom, true);
  } else if (currentView.f1.indexOf('sp') != -1) {
    var d = getRandomInt(1, 4);
    switch (d) {
      case 1:
        changeDir('left');
        break;
      case 2:
        changeDir('up');
        break;
      case 3:
        changeDir('right');
        break;
      case 4:
        changeDir('down');
        break;
    }
  } else if (currentView.f1.indexOf('bl') != -1) {
    upKeyPressed();
  }
}
function teleportToTP(int) {
  var tpa = TPs[0].getElementsByTagName('a')[int - 1].innerHTML;
  var tpac = tpa.split(',');
  var tpRoom = getElementBasedOnRoomName('Room ' + tpac[0] + '_' + tpac[1]);
  if (tpac.length == 3) {
    revealMap(parseInt(tpac[2].replace(' ', '')));
  }
  tM(tpRoom, true);
}

function getRoomContents(roomIndex, showStructures) {
  //console.log(roomIndex);
  try {
    if (roomIndex != null && lvl != null) {
      var roomContents = lvl[roomIndex].split(',');
      if (!showStructures) {
        /*
				for (var i = roomContents.length-1; i >=0; i--) {
				if (roomContents[i] != "b" && 
				roomContents[i] != "v" && 
				roomContents[i] != "bs" && 
				roomContents[i] != "u" && 
				roomContents[i] != "j" && 
				roomContents[i] != "rs" && 
				roomContents[i] != "r"){
				roomContents.splice(i, 1)
				}
				}
				*/
      } else {
        for (var i = roomContents.length - 1; i >= 0; i--) {
          if (roomContents[i] == 'b' || roomContents[i] == 'v' || roomContents[i] == 'bs' || roomContents[i] == 'u' || roomContents[i] == 'j' || roomContents[i] == 'rs' || roomContents[i] == 'r') {
            roomContents.splice(i, 1);
          }
        }
      }
      return roomContents;
    }
  } catch (e) {
    return (roomContents = new Array(''));
  }
}

function getBaseRoomViewElements() {
  currentView.all = '';
  var diffs;
  switch (characterDirection) {
    case 'north':
      diffs = northDiffs;
      break;
    case 'west':
      diffs = westDiffs;
      break;
    case 'south':
      diffs = southDiffs;
      break;
    case 'east':
      diffs = eastDiffs;
      break;
  }
  //console.log("currentRoomIndex" + ": " + currentRoomIndex);

  currentView.l0 = getRoomContents(currentRoomIndex + diffs[0], false);
  currentView.l1 = getRoomContents(currentRoomIndex + diffs[1], false);
  currentView.l2 = getRoomContents(currentRoomIndex + diffs[2], false);
  currentView.l3 = getRoomContents(currentRoomIndex + diffs[3], false);
  currentView.f0 = getRoomContents(currentRoomIndex + diffs[4], false);
  currentView.f1 = getRoomContents(currentRoomIndex + diffs[5], false);
  currentView.f2 = getRoomContents(currentRoomIndex + diffs[6], false);
  currentView.f3 = getRoomContents(currentRoomIndex + diffs[7], false);
  currentView.r0 = getRoomContents(currentRoomIndex + diffs[8], false);
  currentView.r1 = getRoomContents(currentRoomIndex + diffs[9], false);
  currentView.r2 = getRoomContents(currentRoomIndex + diffs[10], false);
  currentView.r3 = getRoomContents(currentRoomIndex + diffs[11], false);

  if (currentView.l1 != null) {
    currentView.all += currentView.l0.join() + ' | ';
    currentView.all += currentView.l1.join() + ' | ';
    currentView.all += currentView.l2.join() + ' | ';
    currentView.all += currentView.l3.join() + ' | ';
    currentView.all += currentView.f0.join() + ' | ';
    currentView.all += currentView.f1.join() + ' | ';
    currentView.all += currentView.f2.join() + ' | ';
    currentView.all += currentView.f3.join() + ' | ';
    currentView.all += currentView.r0.join() + ' | ';
    currentView.all += currentView.r1.join() + ' | ';
    currentView.all += currentView.r2.join() + ' | ';
    currentView.all += currentView.r3.join();

    //console.log(characterDirection + ": " + currentView.all);
  }
  viewl1[0].className = null;
  viewl2[0].className = null;
  viewf1[0].className = null;
  viewf2[0].className = null;
  viewr1[0].className = null;
  viewr2[0].className = null;

  if (currentView.f1.indexOf('k') == -1 && currentView.f1.indexOf('d') == -1) {
    switch (characterDirection) {
      case 'north':
        // left 2 wall/door
        if (currentView.l2.indexOf('r') != -1 || currentView.l2.indexOf('u') != -1) {
          viewl2[0].className = 'lwall';
          if (currentView.l2.indexOf('j') != -1) {
            viewl2[0].className = 'ldoor';
          }
        } else if (currentView.l3.indexOf('b') != -1 || currentView.l3.indexOf('u') != -1) {
          viewl2[0].className = 'wall';
          if (currentView.l3.indexOf('v') != -1) {
            viewl2[0].className = 'door';
          }
        }

        // left 1 wall/door
        if (currentView.l1.indexOf('r') != -1 || currentView.l1.indexOf('u') != -1) {
          viewl1[0].className = 'lwall';
          if (currentView.l1.indexOf('j') != -1) {
            viewl1[0].className = 'ldoor';
          }
        } else if (currentView.l2.indexOf('b') != -1 || currentView.l2.indexOf('u') != -1) {
          viewl1[0].className = 'wall';
          if (currentView.l2.indexOf('v') != -1) {
            viewl1[0].className = 'door';
          }
        }

        // right 2 wall/door
        if (currentView.f2.indexOf('r') != -1 || currentView.f2.indexOf('u') != -1) {
          viewr2[0].className = 'rwall';
          if (currentView.f2.indexOf('j') != -1) {
            viewr2[0].className = 'rdoor';
          }
        } else if (currentView.r3.indexOf('b') != -1 || currentView.r3.indexOf('u') != -1) {
          viewr2[0].className = 'wall';
          if (currentView.r3.indexOf('v') != -1) {
            viewr2[0].className = 'door';
          }
        }

        // right 1 wall/door
        if (currentView.f1.indexOf('r') != -1 || currentView.f1.indexOf('u') != -1) {
          viewr1[0].className = 'rwall';
          if (currentView.f1.indexOf('j') != -1) {
            viewr1[0].className = 'rdoor';
          }
        } else if (currentView.r2.indexOf('b') != -1 || currentView.r2.indexOf('u') != -1) {
          viewr1[0].className = 'wall';
          if (currentView.r2.indexOf('v') != -1) {
            viewr1[0].className = 'door';
          }
        }

        // forward 1 and 2 wall/door
        if (currentView.f2.indexOf('b') != -1 || currentView.f2.indexOf('u') != -1) {
          viewf1[0].className = 'wall';
          if (currentView.f2.indexOf('v') != -1) {
            viewf1[0].className = 'door';
          }
        } else if (currentView.f3.indexOf('b') != -1 || currentView.f3.indexOf('u') != -1) {
          viewf2[0].className = 'wall';
          if (currentView.f3.indexOf('v') != -1) {
            viewf2[0].className = 'door';
          }
        }
        break;
      case 'west':
        // left 2 wall/door
        if (currentView.f2.indexOf('b') != -1 || currentView.f2.indexOf('u') != -1) {
          viewl2[0].className = 'lwall';
          if (currentView.f2.indexOf('v') != -1) {
            viewl2[0].className = 'ldoor';
          }
        } else if (currentView.l3.indexOf('r') != -1 || currentView.l3.indexOf('u') != -1) {
          viewl2[0].className = 'wall';
          if (currentView.l3.indexOf('j') != -1) {
            viewl2[0].className = 'door';
          }
        }

        // left 1 wall/door
        if (currentView.f1.indexOf('b') != -1 || currentView.f1.indexOf('u') != -1) {
          viewl1[0].className = 'lwall';
          if (currentView.f1.indexOf('v') != -1) {
            viewl1[0].className = 'ldoor';
          }
        } else if (currentView.l2.indexOf('r') != -1 || currentView.l2.indexOf('u') != -1) {
          viewl1[0].className = 'wall';
          if (currentView.l2.indexOf('j') != -1) {
            viewl1[0].className = 'door';
          }
        }

        // right 2 wall/door
        if (currentView.r2.indexOf('b') != -1 || currentView.r2.indexOf('u') != -1) {
          viewr2[0].className = 'rwall';
          if (currentView.r2.indexOf('v') != -1) {
            viewr2[0].className = 'rdoor';
          }
        } else if (currentView.r3.indexOf('r') != -1 || currentView.r3.indexOf('u') != -1) {
          viewr2[0].className = 'wall';
          if (currentView.r3.indexOf('j') != -1) {
            viewr2[0].className = 'door';
          }
        }

        // right 1 wall/door
        if (currentView.r1.indexOf('b') != -1 || currentView.r1.indexOf('u') != -1) {
          viewr1[0].className = 'rwall';
          if (currentView.r1.indexOf('v') != -1) {
            viewr1[0].className = 'rdoor';
          }
        } else if (currentView.r2.indexOf('r') != -1 || currentView.r2.indexOf('u') != -1) {
          viewr1[0].className = 'wall';
          if (currentView.r2.indexOf('j') != -1) {
            viewr1[0].className = 'door';
          }
        }

        // forward wall/door
        if (currentView.f2.indexOf('r') != -1 || currentView.f2.indexOf('u') != -1) {
          viewf1[0].className = 'wall';
          if (currentView.f2.indexOf('j') != -1) {
            viewf1[0].className = 'door';
          }
        } else if (currentView.f3.indexOf('r') != -1 || currentView.f3.indexOf('u') != -1) {
          viewf2[0].className = 'wall';
          if (currentView.f3.indexOf('j') != -1) {
            viewf2[0].className = 'door';
          }
        }
        break;
      case 'south':
        // left 2 wall/door
        if (currentView.f2.indexOf('r') != -1 || currentView.f2.indexOf('u') != -1) {
          viewl2[0].className = 'lwall';
          if (currentView.f2.indexOf('j') != -1) {
            viewl2[0].className = 'ldoor';
          }
        } else if (currentView.l2.indexOf('b') != -1 || currentView.l2.indexOf('u') != -1) {
          viewl2[0].className = 'wall';
          if (currentView.l2.indexOf('v') != -1) {
            viewl2[0].className = 'door';
          }
        }

        // left 1 wall/door
        if (currentView.f1.indexOf('r') != -1 || currentView.f1.indexOf('u') != -1) {
          viewl1[0].className = 'lwall';
          if (currentView.f1.indexOf('j') != -1) {
            viewl1[0].className = 'ldoor';
          }
        } else if (currentView.l1.indexOf('b') != -1 || currentView.l1.indexOf('u') != -1) {
          viewl1[0].className = 'wall';
          if (currentView.l1.indexOf('v') != -1) {
            viewl1[0].className = 'door';
          }
        }

        // right 2 wall/door
        if (currentView.r2.indexOf('r') != -1 || currentView.r2.indexOf('u') != -1) {
          viewr2[0].className = 'rwall';
          if (currentView.r2.indexOf('j') != -1) {
            viewr2[0].className = 'rdoor';
          }
        } else if (currentView.r2.indexOf('b') != -1 || currentView.r2.indexOf('u') != -1) {
          viewr2[0].className = 'wall';
          if (currentView.r2.indexOf('v') != -1) {
            viewr2[0].className = 'door';
          }
        }

        // right 1 wall/door
        if (currentView.r1.indexOf('r') != -1 || currentView.r1.indexOf('u') != -1) {
          viewr1[0].className = 'rwall';
          if (currentView.r1.indexOf('j') != -1) {
            viewr1[0].className = 'rdoor';
          }
        } else if (currentView.r1.indexOf('b') != -1 || currentView.r1.indexOf('u') != -1) {
          viewr1[0].className = 'wall';
          if (currentView.r1.indexOf('v') != -1) {
            viewr1[0].className = 'door';
          }
        }

        // forward wall/door
        if (currentView.f1.indexOf('b') != -1 || currentView.f1.indexOf('u') != -1) {
          viewf1[0].className = 'wall';
          if (currentView.f1.indexOf('v') != -1) {
            viewf1[0].className = 'door';
          }
        } else if (currentView.f2.indexOf('b') != -1 || currentView.f2.indexOf('u') != -1) {
          viewf2[0].className = 'wall';
          if (currentView.f2.indexOf('v') != -1) {
            viewf2[0].className = 'door';
          }
        }
        break;
      case 'east':
        // left 2 wall/door
        if (currentView.l2.indexOf('b') != -1 || currentView.l2.indexOf('u') != -1) {
          viewl2[0].className = 'lwall';
          if (currentView.l2.indexOf('v') != -1) {
            viewl2[0].className = 'ldoor';
          }
        } else if (currentView.l2.indexOf('r') != -1 || currentView.l2.indexOf('u') != -1) {
          viewl2[0].className = 'wall';
          if (currentView.l2.indexOf('j') != -1) {
            viewl2[0].className = 'door';
          }
        }

        // left 1 wall/door
        if (currentView.l1.indexOf('b') != -1 || currentView.l1.indexOf('u') != -1) {
          viewl1[0].className = 'lwall';
          if (currentView.l1.indexOf('v') != -1) {
            viewl1[0].className = 'ldoor';
          }
        } else if (currentView.l1.indexOf('r') != -1 || currentView.l1.indexOf('u') != -1) {
          viewl1[0].className = 'wall';
          if (currentView.l1.indexOf('j') != -1) {
            viewl1[0].className = 'door';
          }
        }

        // right 2 wall/door
        if (currentView.f2.indexOf('b') != -1 || currentView.f2.indexOf('u') != -1) {
          viewr2[0].className = 'rwall';
          if (currentView.f2.indexOf('v') != -1) {
            viewr2[0].className = 'rdoor';
          }
        } else if (currentView.r2.indexOf('r') != -1 || currentView.r2.indexOf('u') != -1) {
          viewr2[0].className = 'wall';
          if (currentView.r2.indexOf('j') != -1) {
            viewr2[0].className = 'door';
          }
        }

        // right 1 wall/door
        if (currentView.f1.indexOf('b') != -1 || currentView.f1.indexOf('u') != -1) {
          viewr1[0].className = 'rwall';
          if (currentView.f1.indexOf('v') != -1) {
            viewr1[0].className = 'rdoor';
          }
        } else if (currentView.r1.indexOf('r') != -1 || currentView.r1.indexOf('u') != -1) {
          viewr1[0].className = 'wall';
          if (currentView.r1.indexOf('j') != -1) {
            viewr1[0].className = 'door';
          }
        }

        // forward wall/door
        if (currentView.f1.indexOf('r') != -1 || currentView.f1.indexOf('u') != -1) {
          viewf1[0].className = 'wall';
          if (currentView.f1.indexOf('j') != -1) {
            viewf1[0].className = 'door';
          }
        } else if (currentView.f2.indexOf('r') != -1 || currentView.f2.indexOf('u') != -1) {
          viewf2[0].className = 'wall';
          if (currentView.f2.indexOf('j') != -1) {
            viewf2[0].className = 'door';
          }
        }
        break;
    }
  }
}

function showStart() {
  if (tOS != null) {
    if (tOS2) {
      tOS2.className = aR;
      tOS2.innerHTML = '';
    }
    if (tOS3) {
      tOS3.className = aR;
      tOS3.innerHTML = '';
    }
    if (tOS4) {
      tOS4.className = aR;
      tOS4.innerHTML = '';
    }
    if (tOS5) {
      tOS5.className = aR;
      tOS5.innerHTML = '';
    }
    tOS.className = aR;
    tOE.className = aR;
    roomTable.css('opacity', '1');
    tOS.innerHTML = '';
    theOldTP = null;
  }
  z = currentSelect;
  document.getElementById('menu').style.display = 'none';
  var hl = document.getElementById('highlight');
  placeDiv(hl, z);
  hl.style.height = z.offsetHeight - 1 + 'px';
  hl.style.width = z.offsetWidth - 1 + 'px';
  hl.style.display = 'block';
  coor = getRoomName(z);
  showCoor('start');
}
function showEnd() {
  z = currentSelect;
  document.getElementById('menu').style.display = 'none';
  var hl = document.getElementById('endHighlight');
  placeDiv(hl, z);
  hl.style.height = z.offsetHeight - 1 + 'px';
  hl.style.width = z.offsetWidth - 1 + 'px';
  hl.style.display = 'block';
  roomTable.css('opacity', '.2');
  coor = getRoomName(z);
  showCoor('end');
}

function showDiff() {
  if (document.getElementById('coor').innerHTML.indexOf('Room') != -1 && document.getElementById('endCoor').innerHTML.indexOf('Room') != -1) {
    a = document.getElementById('coor').innerHTML;
    b = document.getElementById('endCoor').innerHTML;
    a = a.replace('Room', '');
    a = a.replace(' ', '');
    b = b.replace('Room', '');
    b = b.replace(' ', '');
    a2 = a.split('_');
    b2 = b.split('_');
    calcOffset(a2, b2);
    document.getElementById('difference').innerHTML = 'Ahead ' + ahead + ', Right ' + right;
    ahead = null;
    right = null;
  }
}
function calcOffset(a, b) {
  var c = 0;
  var d = 0;
  if (document.getElementById('highlight').title == 'up') {
    if (b[1] < a[1]) {
      c = 30;
    }
    if (b[0] < a[0]) {
      d = 30;
    }
    ahead = b[1] - a[1] + c;
    right = b[0] - a[0] + d;
  } else if (document.getElementById('highlight').title == 'right') {
    if (b[1] > a[1]) {
      d = 30;
    }
    if (b[0] < a[0]) {
      c = 30;
    }
    ahead = b[0] - a[0] + c;
    right = a[1] - b[1] + d;
  } else if (document.getElementById('highlight').title == 'down') {
    if (a[1] < b[1]) {
      c = 30;
    }
    if (a[0] < b[0]) {
      d = 30;
    }
    ahead = a[1] - b[1] + c;
    right = a[0] - b[0] + d;
  } else if (document.getElementById('highlight').title == 'left') {
    if (b[1] < a[1]) {
      d = 30;
    }
    if (b[0] > a[0]) {
      c = 30;
    }
    ahead = a[0] - b[0] + c;
    right = b[1] - a[1] + d;
  }
  if (ahead > 30) {
    ahead = ahead - 30;
  }
  if (ahead < 0) {
    ahead = ahead + 30;
  }
  if (right > 30) {
    right = right - 30;
  }
  if (right < 0) {
    right = right + 30;
  }
}
function showCoor(highlightType) {
  if (highlightType == 'start') {
    document.getElementById('coor').innerHTML = coor + ', ' + level;
  } else {
    document.getElementById('endCoor').innerHTML = coor + ', ' + level;
  }
  showDiff();
}

function toggleSimpleView() {
  if (document.getElementById('simple').href.indexOf('simple.css') == -1) {
    document.getElementById('simple').href = 'simple.css';
    document.getElementById('simpleView').className = 'numberOn';
    createCookie('simpleView', 'simple', 5000);
  } else {
    document.getElementById('simple').href = 'null';
    document.getElementById('simpleView').className = 'number';
    createCookie('simpleView', null, 5000);
  }
}
function restoreSimpleView() {
  s = readCookie('simpleView');
  if (s == 'simple') {
    toggleSimpleView();
  }
}
function changeDir(dir) {
  if ((dir == 'up' && characterDirection != 'north') || (dir == 'left' && characterDirection != 'west') || (dir == 'down' && characterDirection != 'south') || (dir == 'right' && characterDirection != 'east')) {
    var c = document.getElementById('highlight');
    document.getElementById('up').className = 'number';
    document.getElementById('down').className = 'number';
    document.getElementById('right').className = 'number';
    document.getElementById('left').className = 'number';
    document.getElementById(dir).className = 'numberOn';

    if (dir == 'left') {
      c.style.transform = 'rotate(-90deg)';
      c.title = 'left';
      characterDirection = 'west';
      showDiff();
    } else if (dir == 'up') {
      c.style.transform = 'rotate(0deg)';
      c.title = 'up';
      characterDirection = 'north';
      showDiff();
    } else if (dir == 'right') {
      c.style.transform = 'rotate(90deg)';
      c.title = 'right';
      characterDirection = 'east';
      showDiff();
    } else if (dir == 'down') {
      c.style.transform = 'rotate(180deg)';
      c.title = 'down';
      characterDirection = 'south';
      showDiff();
    }
    createCookie('dir', dir, 5000);

    getCurrentRoomContents();
  }
}
function closeMenu() {
  if (menuState == 'off') {
    document.getElementById('menu').style.display = 'none';
  }
}
function menuOn() {
  menuState = 'on';
  window.clearTimeout(theMenuTimer);
}
function menuOff() {
  menuState = 'off';
}
function clearCoor() {
  clearLegendHighlight();
  document.getElementById('highlight').style.display = 'none';
  document.getElementById('endHighlight').style.display = 'none';
  document.getElementById('coor').innerHTML = '&nbsp;';
  document.getElementById('endCoor').innerHTML = '&nbsp;';
  document.getElementById('difference').innerHTML = '&nbsp;';
}
function swapTheme(theme) {
  if (theme == '') {
    document.getElementById('normal').className = 'numberOn';
    document.getElementById('pterm').className = 'number';
  } else if (theme == 'pterm') {
    document.getElementById('normal').className = 'number';
    document.getElementById('pterm').className = 'numberOn';
  }
  if (tOS != null) {
    if (tOS2) {
      tOS2.className = aR;
      tOS2.innerHTML = '';
    }
    if (tOS3) {
      tOS3.className = aR;
      tOS3.innerHTML = '';
    }
    if (tOS4) {
      tOS4.className = aR;
      tOS4.innerHTML = '';
    }
    if (tOS5) {
      tOS5.className = aR;
      tOS5.innerHTML = '';
    }
    tOS.className = aR;
    tOE.className = aR;
    roomTable.css('opacity', '1');
    tOS.innerHTML = '';
    theOldTP = null;
  }
  if (theme != null && theme != '') document.getElementById('theme').href = theme + '.css';
  else document.getElementById('theme').href = null;
  clearCoor();
  roomTable.css('opacity', '1');
  createCookie('theme', theme, 5000);
  if (currentSelect != undefined) tM(currentSelect);
}
function restorePreviousSession() {
  init();
  var theme = readCookie('theme');
  level = readCookie('level');

  var legend = readCookie('legend');
  restoreSimpleView();
  if (level == null) {
    level = '1';
  }
  var grid = readCookie('grid');
  restoreGrid(grid);
  if (legend != null) {
    restoreLegend(legend);
  }
  swapTheme(theme);
  if (document.location.href.indexOf('#') != -1) {
    c = document.location.href.split('#');
    if (c[1] != '') {
      level = c[1];
    }
  }
  revealMap(level);
  var room = readCookie('room');
  if (room != null) {
    tM(getElementBasedOnRoomName(room));
  } else {
    tM(getElementBasedOnRoomName('Room 12_17'));
  }
  var dir = readCookie('dir');
  //console.log(dir);
  changeDir(dir);
}
function restoreLegend(legend) {
  document.getElementById('legend').style.display = legend;
  if (legend == 'block') {
    document.getElementById('legendButton').className = 'numberOn';
  }
}
function getRoomDiv(theTP, params, x2, y2) {
  if (startingPoints != null) {
    for (var i = 0; i < startingPoints.length; i++) {
      var c = startingPoints[i].split(',');
      var roomNumber = 'Room ' + c[0] + '_' + c[1];
      tOS = getElementBasedOnRoomName(roomNumber);
      tOS.innerHTML = '';
      tOS.className = aR;
    }
    tOE.className = aR;
  }
  if (theOldTP == null || theTP != theOldTP) {
    startingPoints = params.split('|');
    tOE = getElementBasedOnRoomName('Room ' + x2 + '_' + y2);
    for (var i = 0; i < startingPoints.length; i++) {
      var c = startingPoints[i].split(',');
      var roomNumber = 'Room ' + c[0] + '_' + c[1];
      tOS = getElementBasedOnRoomName(roomNumber);
      tOS.innerHTML = tOS.innerHTML == theTP ? '' : theTP;
      tOS.className = tOS.className == tpH ? aR : tpH;
    }
    tOE.className = tOE.className == 'tpEndHighlight' ? aR : 'tpEndHighlight';
    theOldTP = theTP;
  } else {
    theOldTP = null;
  }
}
function toggleTP(theTP) {
  if (theTP != theOldTP && tOS != null) {
    roomTable.css('opacity', '1');
    tOS.innerHTML = '';
  }
  clearCoor();
  roomTable.css('opacity', roomTable.css('opacity') == '1' ? '.2' : '1');
  if (level == 1) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '18,2', 12, 28);
        break;
      case '2':
        getRoomDiv(theTP, '25,8', 1, 7);
        break;
      case '3':
        getRoomDiv(theTP, '12,29', 18, 3);
        break;
    }
  } else if (level == 2) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '18,12', 18, 19);
        break;
      case '2':
        getRoomDiv(theTP, '11,14', 22, 24);
        break;
      case '3':
        getRoomDiv(theTP, '18,22', 18, 21);
        break;
    }
  } else if (level == 3) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '13,7', 18, 7);
        break;
      case '2':
        getRoomDiv(theTP, '7,20', 27, 3);
        break;
      case '3':
        getRoomDiv(theTP, '22,20|5,25|25,10', 15, 15);
        break;
      case '4':
        getRoomDiv(theTP, '17,18', 12, 20);
        break;
    }
  } else if (level == 4) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '21,24', 17, 8);
        break;
      case '2':
        getRoomDiv(theTP, '9,24|11,21|11,11|2,21|3,11', 21, 16);
        break;
      case '3':
        getRoomDiv(theTP, '17,24|13,20', 6, 15);
        break;
      case '4':
        getRoomDiv(theTP, '28,27', 14, 5);
        break;
    }
  } else if (level == 5) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '26,18|26,10', 5, 4);
        break;
      case '2':
        getRoomDiv(theTP, '28,12', 15, 14);
        break;
      case '3':
        getRoomDiv(theTP, '26,14', 12, 19);
        break;
      case '4':
        getRoomDiv(theTP, '19,19', 5, 22);
        break;
    }
  } else if (level == 6) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '25,18', 28, 1);
        break;
      case '2':
        getRoomDiv(theTP, '13,17|14,17|14,16', 29, 29);
        break;
      case '3':
        getRoomDiv(theTP, '8,20', 14, 26);
        break;
      case '4':
        getRoomDiv(theTP, '9,23', 1, 21);
        break;
    }
  } else if (level == 7) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '10,5', 29, 26);
        break;
      case '2':
        getRoomDiv(theTP, '22,5', 24, 16);
        break;
      case '3':
        getRoomDiv(theTP, '15,15', 20, 4);
        break;
      case '4':
        getRoomDiv(theTP, '27,26', 8, 5);
        break;
    }
  } else if (level == 8) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '8,2', 17, 4);
        break;
      case '2':
        getRoomDiv(theTP, '23,16', 17, 14);
        break;
      case '3':
        getRoomDiv(theTP, '25,23', 15, 5);
        break;
    }
  } else if (level == 9) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '15,12', 15, 13);
        break;
      case '2':
        getRoomDiv(theTP, '9,23', 18, 8);
        break;
    }
  } else if (level == 10) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '11,12', 14, 24);
        break;
      case '2':
        getRoomDiv(theTP, '25,22', 4, 4);
        break;
      case '3':
        getRoomDiv(theTP, '1,24|1,25|1,27|1,28', 1, 26);
        break;
      case '4':
        getRoomDiv(theTP, '10,24', 25, 1);
        break;
    }
  } else if (level == 11) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '19,9', 28, 3);
        break;
      case '2':
        getRoomDiv(theTP, '11,17|9,15', 1, 11);
        break;
    }
  } else if (level == 12) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '6,2', 20, 2);
        break;
      case '2':
        getRoomDiv(theTP, '21,2', 7, 2);
        break;
      case '3':
        getRoomDiv(theTP, '26,4', 4, 27);
        break;
      case '4':
        getRoomDiv(theTP, '17,26|1,11', 9, 15);
        break;
    }
  } else if (level == 13) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '11,4|11,5', 16, 16);
        break;
      case '2':
        getRoomDiv(theTP, '7,7', 28, 6);
        break;
      case '3':
        getRoomDiv(theTP, '4,13|5,13', 13, 17);
        break;
      case '4':
        getRoomDiv(theTP, '15,18', 6, 19);
        break;
    }
  } else if (level == 14) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '6,6', 25, 25);
        break;
      case '2':
        getRoomDiv(theTP, '23,20', 10, 18);
        break;
      case '3':
        getRoomDiv(theTP, '6,25', 25, 6);
        break;
      case '4':
        getRoomDiv(theTP, '14,29', 9, 18);
        break;
    }
  } else if (level == 15) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '29,21|17,3', 16, 29);
        break;
      case '2':
        getRoomDiv(theTP, '4,26|3,13|25,6', 25, 30);
        break;
      case '3':
        getRoomDiv(theTP, '20,28|2,7', 20, 6);
        break;
      case '4':
        getRoomDiv(theTP, '28,28|23,9|4,8', 9, 18);
        break;
    }
  } else if (level == 16) {
    switch (theTP.toString()) {
      case '1':
        getRoomDiv(theTP, '4,27', 15, 15);
        break;
      case '2':
        getRoomDiv(theTP, '28,11', 13, 23);
        break;
      case '3':
        getRoomDiv(theTP, '8,12', 21, 18);
        break;
      case '4':
        getRoomDiv(theTP, '21,18', 8, 12);
        break;
      case '5':
        getRoomDiv(theTP, '13,23', 28, 11);
        break;
    }
  }
}

// info
function toggleInfo() {
  theIB.css('display', theIB.css('display') == 'block' ? 'none' : 'block');
  infoButton[0].className = theIB.css('display') == 'block' ? 'numberOn' : 'number';
  tHL.css('visibility', tHL.css('visibility') == 'hidden' ? 'visible' : 'hidden');
  endHighlight.css('visibility', endHighlight.css('visibility') == 'hidden' ? 'visible' : 'hidden');
}
function toggleLegend() {
  legend.css('display', legend.css('display') == 'block' ? 'none' : 'block');
  lGB[0].className = lGB[0].className == 'numberOn' ? 'number' : 'numberOn';
  createCookie('legend', document.getElementById('legend').style.display, 5000);
}
function highlightLegend() {
  backgroundView = $('#viewBackground');
  clearLegendHighlight();
  roomInfo.innerHTML = '';

  backgroundView.css('background-image', 'url(viewImages/floor.png');

  $('#stairsButton').css('display', 'none');
  for (var i = 0; i < currentRoomContents.length; i++) {
    for (var z = 0; z < theLegendGs.length; z++) {
      if (currentRoomContents[i] != '' && (currentRoomContents[i] == theLegendGs[z].className || (currentRoomContents[i].indexOf('tp') != -1 && theLegendGs[z].className.indexOf('tp') == 0))) {
        theLegendGs[z].className = currentRoomContents[i] + ' highlight';
        if (theLegendDivs[z].innerHTML.indexOf('tairs') != -1) {
          $('#stairsButton').css('display', 'inline-block');
        }
        roomInfo.innerHTML += theLegendDivs[z].innerHTML.trim() + '</br>';
        theLegendDivs[z].className = ' highlight';
        if (currentRoomContents[i].indexOf('h') != -1 && theme == 'normal') {
          backgroundView.css('background-image', 'url(viewImages/floor_with_water.png');
        }
        break;
      }
    }
  }
  roomInfo.innerHTML = roomInfo.innerHTML == '' ? '</br></br></br>' : roomInfo.innerHTML;
}
function clearLegendHighlight() {
  roomInfo.innerHTML = '&nbsp;';
  for (var i = 0; i < theLegendGs.length; i++) {
    var cname = theLegendGs[i].className;
    if (cname.indexOf('highlight') != -1) {
      cname = cname.replace(' highlight', '');
      theLegendGs[i].className = cname;
      theLegendDivs[i].className = '';
    }
  }
}

// events
function detectOnKeyUpEvent(e) {
  var evt = e || window.event;
  if (evt.keyCode == 16) {
    shiftIsOn = false;
  } else if (evt.keyCode == 17) {
    isFNPressed = false;
  }
}

function turnLeft() {
  switch (characterDirection) {
    case 'west':
      changeDir('down');
      break;
    case 'north':
      changeDir('left');
      break;
    case 'east':
      changeDir('up');
      break;
    case 'south':
      changeDir('right');
      break;
  }
  if (shiftIsOn) {
    upKeyPressed();
  }
}

function turnRight() {
  switch (characterDirection) {
    case 'west':
      changeDir('up');
      break;
    case 'north':
      changeDir('right');
      break;
    case 'east':
      changeDir('down');
      break;
    case 'south':
      changeDir('left');
      break;
  }
  if (shiftIsOn) {
    upKeyPressed();
  }
}

function uTurn() {
  var tempDir;
  switch (characterDirection) {
    case 'west':
      changeDir('right');
      tempDir = 'left';
      break;
    case 'north':
      changeDir('down');
      tempDir = 'up';
      break;
    case 'east':
      changeDir('left');
      tempDir = 'right';
      break;
    case 'south':
      changeDir('up');
      tempDir = 'down';
      //upKeyPressed();
      break;
  }
  if (shiftIsOn) {
    upKeyPressed();
    changeDir(tempDir);
  }
}

function takeStairs() {
  if (currentView.f1.indexOf('ds') != -1) {
    revealMap(parseInt(level) + 1);
  } else if (currentView.f1.indexOf('us') != -1 && level != 1) {
    revealMap(parseInt(level) - 1);
  }
}

function detectOnKeyDownEvent(e) {
  var evt = e || window.event;
  //console.log(evt.keyCode);
  if (evt.keyCode == 13) {
    takeStairs();
  } else if (evt.keyCode == 16) {
    shiftIsOn = true;
  } else if (evt.keyCode == 37) {
    //changeDir('left');

    turnLeft();
  } else if (evt.keyCode == 38) {
    //changeDir('up');

    upKeyPressed();
  } else if (evt.keyCode == 39) {
    //changeDir('right');

    turnRight();
  } else if (evt.keyCode == 40) {
    //changeDir('down');
    uTurn();
  } else if (evt.keyCode == 49 && !isFNPressed) {
    revealMap('1');
  } else if (evt.keyCode == 49 && isFNPressed) {
    revealMap('11');
  } else if (evt.keyCode == 50 && !isFNPressed) {
    revealMap('2');
  } else if (evt.keyCode == 50 && isFNPressed) {
    revealMap('12');
  } else if (evt.keyCode == 51 && !isFNPressed) {
    revealMap('3');
  } else if (evt.keyCode == 51 && isFNPressed) {
    revealMap('13');
  } else if (evt.keyCode == 52 && !isFNPressed) {
    revealMap('4');
  } else if (evt.keyCode == 52 && isFNPressed) {
    revealMap('14');
  } else if (evt.keyCode == 53 && !isFNPressed) {
    revealMap('5');
  } else if (evt.keyCode == 53 && isFNPressed) {
    revealMap('15');
  } else if (evt.keyCode == 54 && !isFNPressed) {
    revealMap('6');
  } else if (evt.keyCode == 54 && isFNPressed) {
    revealMap('16');
  } else if (evt.keyCode == 55) {
    revealMap('7');
  } else if (evt.keyCode == 56) {
    revealMap('8');
  } else if (evt.keyCode == 57) {
    revealMap('9');
  } else if (evt.keyCode == 48) {
    revealMap('10');
  } else if (evt.keyCode == 112) {
    revealMap('11');
  } else if (evt.keyCode == 113) {
    revealMap('12');
  } else if (evt.keyCode == 114) {
    revealMap('13');
  } else if (evt.keyCode == 115) {
    revealMap('14');
  } else if (evt.keyCode == 116) {
    revealMap('15');
  } else if (evt.keyCode == 87) {
    swapTheme('');
  } else if (evt.keyCode == 80) {
    swapTheme('pterm');
  } else if (evt.key.toLowerCase() == 'h') {
    toggleSimpleView();
  } else if (evt.keyCode == 71) {
    toggleGrid();
  } else if (evt.keyCode == 76) {
    toggleLegend();
  } else if (evt.keyCode == 73) {
    toggleInfo();
  } else if (evt.keyCode == 17) {
    isFNPressed = true;
  }
}
function upKeyPressed() {
  var tct = getRoomCoor(currentSelect);
  var newRoomId;
  switch (characterDirection) {
    case 'west':
      if ((currentView.f2.indexOf('rs') != -1 && shiftIsOn) || (currentView.f2.indexOf('j') != -1 && shiftIsOn) || (currentView.f2.indexOf('r') == -1 && currentView.f2.indexOf('u') == -1)) {
        //console.log(parseInt(tct[0])-1)
        if (parseInt(tct[0]) - 1 <= 0) {
          tct[0] = 31;
        }
        newRoomId = 'Room ' + (parseInt(tct[0]) - 1) + '_' + tct[1];
      }
      break;
    case 'north':
      if ((currentView.f2.indexOf('bs') != -1 && shiftIsOn) || (currentView.f2.indexOf('v') != -1 && shiftIsOn) || (currentView.f2.indexOf('b') == -1 && currentView.f2.indexOf('u') == -1)) {
        if (parseInt(tct[1]) + 1 >= 31) {
          tct[1] = 0;
        }
        newRoomId = 'Room ' + tct[0] + '_' + (parseInt(tct[1]) + 1);
      }
      break;
    case 'east':
      if ((currentView.f1.indexOf('rs') != -1 && shiftIsOn) || (currentView.f1.indexOf('j') != -1 && shiftIsOn) || (currentView.f1.indexOf('r') == -1 && currentView.f1.indexOf('u') == -1)) {
        if (parseInt(tct[0]) + 1 >= 31) {
          tct[0] = 0;
        }
        newRoomId = 'Room ' + (parseInt(tct[0]) + 1) + '_' + tct[1];
      }
      break;
    case 'south':
      if ((currentView.f1.indexOf('bs') != -1 && shiftIsOn) || (currentView.f1.indexOf('v') != -1 && shiftIsOn) || (currentView.f1.indexOf('b') == -1 && currentView.f1.indexOf('u') == -1)) {
        if (parseInt(tct[1]) - 1 <= 0) {
          tct[1] = 31;
        }
        newRoomId = 'Room ' + tct[0] + '_' + (parseInt(tct[1]) - 1);
      }
      break;
  }
  if (newRoomId != undefined) {
    tM(getElementBasedOnRoomName(newRoomId), true);
  }
}

document.body.addEventListener('touchstart', tapHandler);
document.getElementById('moveForwardButton').addEventListener('touchstart', tapHandler);
document.getElementById('turnLeft').addEventListener('touchstart', tapHandler);
document.getElementById('turnRight').addEventListener('touchstart', tapHandler);
var tappedTwice = false;

function tapHandler(event) {
  if (!tappedTwice) {
    tappedTwice = true;
    setTimeout(function () {
      tappedTwice = false;
    }, 300);
    return false;
  }
  event.stopPropagation();
  event.preventDefault();
}

var eventOnKeyDownHandler = detectOnKeyDownEvent;
var eventOnKeyUpHandler = detectOnKeyUpEvent;
document['onkeydown'] = eventOnKeyDownHandler;
document['onkeyup'] = eventOnKeyUpHandler;
