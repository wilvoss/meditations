/// <reference path="../shared.js" />
/// <reference path="../log.js" />

class CreepObject {
  constructor(spec) {
    this.id = spec.id === undefined ? '' : spec.id;
    this.title = spec.title === undefined ? '' : spec.title;
    this.description = spec.description === undefined ? '' : spec.description;
    this.category = spec.category === undefined ? '' : spec.category;
  }
}

function AddRowToInfo(left, right, classname) {
  var p = document.createElement('p');
  p.innerHTML = '<span>' + left + '</span>' + right;
  p.className = classname == undefined ? '' : classname;
  document.getElementsByTagName('creepiness')[0].appendChild(p);
}
function getCreepiness() {
  var creepiness = window.navigator;

  AddRowToInfo('appCodeName', window.navigator.appCodeName);
  AddRowToInfo('appName', window.navigator.appName);
  AddRowToInfo('appVersion', window.navigator.appVersion);
  AddRowToInfo('cookieEnabled', window.navigator.cookieEnabled);
  AddRowToInfo('language', window.navigator.language);
  AddRowToInfo('onLine', window.navigator.onLine);
  AddRowToInfo('platform', window.navigator.platform);
  AddRowToInfo('product', window.navigator.product);
  AddRowToInfo('productSub', window.navigator.productSub);
  AddRowToInfo('orientation', window.screen.orientation.type);
  AddRowToInfo('dimensions', window.screen.availWidth + 'x' + window.screen.availHeight);
  AddRowToInfo('left', window.screenLeft);
  AddRowToInfo('top', window.screenTop);
  AddRowToInfo('userAgent', window.navigator.userAgent);
  AddRowToInfo('vendor', window.navigator.vendor);
  AddRowToInfo('downlink', window.navigator.connection.downlink);
  AddRowToInfo('effectiveType', window.navigator.connection.effectiveType);
  AddRowToInfo('sitesVisited', window.history.length);

  AddRowToInfo('&nbsp;', '&nbsp;');

  for (let x = 0; x < window.navigator.plugins.length; x++) {
    const plugin = window.navigator.plugins[x];
    AddRowToInfo('plugin', plugin.name);
    AddRowToInfo('filename', plugin.filename, 'level1');
    AddRowToInfo('description', plugin.description, 'level1');
  }
}

window.onload = getCreepiness;
