var UseDebug = document.location.href.indexOf('staging') != -1;

function highlight(text, isolate, strip = true) {
  isolate = isolate == undefined ? false : isolate;
  log(text, isolate, 'color:#97FF90;', strip);
}

function warn(text, isolate, strip = true) {
  isolate = isolate == undefined ? false : isolate;
  log(text, isolate, 'color:orange;', strip);
}

function error(text, isolate, strip = true) {
  isolate = isolate == undefined ? false : isolate;
  log(text, isolate, 'color:red;', strip);
}

function note(text, isolate, strip = true) {
  isolate = isolate == undefined ? false : isolate;
  log(text, isolate, 'color:gray;', strip);
}

function log(text, isolate, color, strip = true) {
  text = text.toString();

  color = color == undefined ? 'black' : color;

  isolate = isolate == undefined ? false : isolate;
  var ms = new Date(Date.now()).getMilliseconds();
  ms = ms < 10 ? ms * 100 : ms;
  ms = ms < 100 ? ms * 10 : ms;
  if (UseDebug) {
    if (isolate) {
      console.log('◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦');
    }
    if (warn) {
      console.log('%c' + new Date(Date.now()).toLocaleTimeString('en-US').replace(/ AM/, '').replace(/ PM/, '') + '.' + ms + ' \t%c' + text, 'color:lightgray;', color);
    } else {
      console.log('%c' + new Date(Date.now()).toLocaleTimeString('en-US').replace(/ AM/, '').replace(/ PM/, '') + '.' + ms + text + ' \t' + text);
    }
    if (isolate) {
      console.log('◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦');
    }
  }
}

function getHashValue(key) {
  var matches = location.hash.match(new RegExp(key + '=([^&]*)'));
  return matches ? matches[1] : null;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

//# sourceURL=log.js
