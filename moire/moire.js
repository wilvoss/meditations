/// <reference path="../shared.js" />
/// <reference path="../log.js" />

let r = document.querySelector(':root');
var cycle = 5000;
var backgroundImageURL = 'url(../site/images/big_1.jpg';
var grids = ['a', 'b', 'c', 'd'];
var imageCheckbox = document.getElementById('imageCheckbox');
var query = '?';
var control;
var input1;
var input2;
var input3;
var input4;
var currentLayer;
var layerProperties;
var tempX = 0;
var tempY = 0;
var baselineX = 0;
var baselineY = 0;
var mouseDetected;
var isDragging = false;

function selectLayer(source) {
  for (let index = 0; index < document.getElementsByTagName('control').length; index++) {
    const layer = document.getElementsByTagName('control')[index];
    if (source == layer) {
      source.className = source.className == '' ? 'selected' : '';
      currentLayer = source.className == 'selected' ? layer : null;
    } else {
      if (layer.getAttribute('type') == 'radio') {
        layer.className = '';
      }
    }
  }
  const inputs = document.getElementsByTagName('input');
  for (let x = 0; x < inputs.length; x++) {
    const input = inputs[x];
    if (input.parentElement.parentElement.tagName.toLowerCase() == 'control') {
      input.tabIndex = currentLayer == input.parentElement.parentElement ? 0 : -1;
    }
  }
}

function updateSpecialValue(source, target, suffix = '') {
  var updateLabel = true;
  var control = source.parentElement;
  var label = control.children[0];
  var span = label.children[0];

  if (target.toLowerCase().indexOf('deg') != -1) {
    setStyleVar(target, source.value + 'deg');
    setStyleVar(target.replace('Deg', '') + 'Opacity', source.value == -1 ? 0 : 1);
  } else {
    setStyleVar(target, source.value + suffix);
  }
  if (updateLabel && label.children.length > 0) {
    var span = label.children[0];
    if (suffix == '°') {
      if (source.value == -1) {
        span.innerHTML = 'OFF';
        control.setAttribute('value', 'off');
      } else {
        span.innerHTML = source.value + suffix;
        control.setAttribute('value', 'on');
      }
    } else {
      span.innerHTML = source.value + suffix;
    }
  }
}

function loadSettings() {
  if (location.href.indexOf('?') != -1) {
    layerProperties = location.href.split('?')[1].split('&');

    // first check against unwanted input
    if (layerProperties.length != 4) {
      location.href = location.href.domain;
    } else {
      for (let index = 0; index < layerProperties.length; index++) {
        const layerName = layerProperties[index].substr(0, 1);
        const lp = layerProperties[index].substr(2).split(',');
        const control = document.getElementById(layerName);

        input1 = control.getElementsByTagName('input')[0];
        input1.value = lp[0];
        updateSpecialValue(input1, '--' + layerName + 'Deg', '°');

        input2 = control.getElementsByTagName('input')[1];
        input2.value = lp[1];
        updateSpecialValue(input2, '--' + layerName + 'Gap', 'px');

        input3 = control.getElementsByTagName('input')[2];
        input3.value = lp[2];
        updateSpecialValue(input3, '--' + layerName + 'Weight', 'px');
      }
    }
  }
}

function GetMouseXY(a) {
  tempX = a.clientX;
  tempY = a.clientY;

  dragDegrees();
  baselineY = tempY;
  baselineX = tempX;

  return (mouseDetected = true);
}

function beginDragging(a) {
  a.stopPropagation();
  baselineY = a.clientY;
  baselineX = a.clientX;
  isDragging = true;
}

function dragDegrees() {
  if (isDragging && currentLayer != null) {
    const deltaX = (tempX - baselineX) / 5;
    const deltaY = (tempY - baselineY) / 5;
    const degDelta = deltaX * deltaX > deltaY * deltaY ? deltaX : deltaY;
    const degProperty = '--' + currentLayer.id.replace('grid', '') + 'Deg';

    var selectedInput = currentLayer.getElementsByTagName('input')[0];
    var newValue = Number(selectedInput.value) + Number(degDelta);
    selectedInput.value = newValue;
    baselineY = tempY;
    baselineX = tempX;
    updateSpecialValue(selectedInput, degProperty, '°');
  }
}

function stopDragging(a) {
  a.stopPropagation();
  isDragging = false;
  constructQuery();
}

function constructQuery() {
  query = '?';
  for (let index = 0; index < 4; index++) {
    control = document.getElementById(grids[index]);
    input1Value = control.getElementsByTagName('input')[0].value;
    input2Value = control.getElementsByTagName('input')[1].value;
    input3Value = control.getElementsByTagName('input')[2].value;
    query += grids[index] + '=' + input1Value + ',' + input2Value + ',' + input3Value + (index < 3 ? '&' : '');
  }

  const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + query;
  history.pushState({ path: newUrl }, '', newUrl);
  return query;
}

function shareTransposition() {
  query = constructQuery();

  if (getMobileOperatingSystem() == 'unknown') {
    var textarea = document.createElement('textarea');
    textarea.value = document.location.origin + document.location.pathname + query;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    document.location.search = query;
    alert('A unique URL has been copied to the clipboard!');
  } else {
    document.location.href = 'sms:&body=' + encodeURIComponent(document.location.origin + document.location.pathname + query);
  }
}

function onKeyUp(e) {
  if (e.key.toLowerCase() == '1') {
    selectLayer(document.getElementById('a'));
  }
  if (e.key.toLowerCase() == '2') {
    selectLayer(document.getElementById('b'));
  }
  if (e.key.toLowerCase() == '3') {
    selectLayer(document.getElementById('c'));
  }
  if (e.key.toLowerCase() == '4') {
    selectLayer(document.getElementById('d'));
  }
}

if (window.addEventListener) {
  window.addEventListener('keyup', onKeyUp);
} else {
  window.attachEvent('onkeyup', onKeyUp);
}

window.onload = function () {
  loadSettings();
  selectLayer(document.getElementsByTagName('control')[0]);
  document.getElementsByTagName('grids')[0].ondragstart = () => false;
};
if (document.location.search === '') {
  document.location.search = '?a=135,5,3&b=134,5,1&c=136,5,1&d=137,5,2';
}

window.onpointermove = GetMouseXY;
document.body.ondragstart = () => false;
