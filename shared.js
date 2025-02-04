var showFooterNav = true;
class ProjectObject {
  constructor(spec) {
    this.name = spec.name;
    this.path = spec.path;
    this.category = spec.category;
    this.description = spec.description;
    this.show = spec.show;
    this.pcOnly = spec.pcOnly;
  }
}
var projects = [
  new ProjectObject({ name: 'Particles', path: 'particles', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Wormholes', path: 'wormholes', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Poles', path: 'poles', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Neurons', path: 'neurons', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Lattice', path: 'lattice', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Moiré', path: 'moire', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Pop', path: 'pop', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Interlace', path: 'interlace', category: 'Emergent', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Exposure', path: 'exposure', category: 'Exploratory', description: '', show: true, pcOnly: false }),
  new ProjectObject({ name: 'Bugs', path: 'bugs', category: 'Exploratory', description: '', show: false, pcOnly: false }),
  new ProjectObject({ name: 'Dungeon', path: 'dungeon', category: 'Exploratory', description: '', show: false, pcOnly: false }),
];

function toggleNav(e, value, closeMain = false) {
  if (e !== undefined && e !== null) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (closeMain) {
    toggleMain(e);
  }

  element = document.getElementsByTagName('controls')[0];
  nav = document.getElementsByTagName('nav')[0];
  if (value != undefined && value != null) {
    element.className = value ? 'open' : '';
    nav.className = value ? 'open' : '';
  } else {
    element.className = element.className == '' ? 'open' : '';
    var top = nav.className.indexOf('top') == -1 ? '' : 'top ';
    nav.className = top + nav.className == '' ? 'open' : '';
  }
}

function toggleMain(e) {
  if (e !== undefined && e !== null) {
    e.stopPropagation();
    e.preventDefault();
  }
  var main = document.getElementsByTagName('main')[0];
  var label = document.getElementById('showTextValue');

  if (main.className.indexOf('shifted') == -1) {
    main.className = main.className + ' shifted';
  } else {
    main.className = main.className.toString().replace(' shifted', '');
    if (label != null) label.innerHTML = 'visible';
  }
}

function setStyleVar(property, value) {
  r.style.setProperty(property, value);
}

function updateCSSAndLabel(source, target, suffix = '') {
  var updateLabel = true;
  var control = source.parentElement;
  var label = control.children[0];
  var span = label.children[0];
  if (target == '--image') {
    updateLabel = false;
    setStyleVar(target, source.checked ? backgroundImageURL : 'none');
    span.innerHTML = source.checked ? 'visible' : 'hidden';
  } else {
    setStyleVar(target, source.value + suffix);
  }
  if (updateLabel) {
    span.innerHTML = source.value + suffix;
  }
}

function preventBubbledEvent(event) {
  event.stopPropagation();
}

function onKeyUp(e) {
  if (e.key.toLowerCase() == 'z') {
    toggleNav(e);
  }
  if (e.key.toLowerCase() == 'x') {
    toggleMain(e);
  }
}

function gotoPreviousProject(project) {
  var path = document.location.pathname;
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    if (path.indexOf(project.path) != -1) {
      var previousProject = document.location.origin + '/' + projects[index == 0 ? projects.length - 1 : index - 1].path + '/';
      document.location.href = previousProject;
    }
  }
}

function gotoNextProject(project) {
  var path = document.location.pathname;
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    if (path.indexOf(project.path) != -1) {
      var nextProject = document.location.origin + '/' + projects[index == projects.length - 1 ? 0 : index + 1].path + '/';
      document.location.href = nextProject;
    }
  }
}

function initMain() {
  var main = document.getElementsByTagName('main')[0];
  if (main != undefined) {
    var anchors = main.getElementsByTagName('a');

    for (let index = 0; index < anchors.length; index++) {
      const a = anchors[index];
      a.onpointerup = function (event) {
        event.stopPropagation();
      };
    }
  }
}
function initBottom() {
  var targetElement = document.getElementsByTagName('footer')[0].getElementsByTagName('p')[0];
  if (showFooterNav) {
    var path = document.location.pathname;
    if (isNarrowScreen()) {
      document.getElementsByTagName('footer')[0].className = 'mobile';
      var previousProject = document.createElement('button');
      previousProject.innerHTML = 'prev ';
      previousProject.onclick = gotoPreviousProject;
      targetElement.appendChild(previousProject);
      var nextProject = document.createElement('button');
      nextProject.innerHTML = 'next ';
      nextProject.onclick = gotoNextProject;
      targetElement.appendChild(nextProject);
    } else {
      for (let index = 0; index < projects.length; index++) {
        const project = projects[index];
        if (project.show == true) {
          var b = document.createElement('button');
          b.innerHTML = `<num>${index + 1}</num> <name>${project.name}</name>`;
          if ((b.className = path.indexOf(project.path) == -1)) {
            b.onclick = function () {
              document.location.href = '/' + project.path + '/';
            };
          }

          b.className = path.indexOf(project.path) == -1 ? 'hidden' : 'revealed';
          targetElement.appendChild(b);
        }
      }
    }
  } else {
    targetElement.innerHTML = '&copy; <a href="mailto:wilvoss@me.com">•//•/•</a>';
    targetElement.style.marginBottom = '1em';
  }
}

function initTop() {
  // if (window.location.href.indexOf('showsettings') != -1) {
  setTimeout(() => {
    toggleNav(null, true);
  }, 400);
  // }
  if (document.body.className == 'top') {
    var controls = document.getElementsByTagName('controls')[0];
    label = '';
    controls.innerHTML = '';
    projects.forEach((project) => {
      if (project.show == true) {
        if (label != project.category) {
          label = project.category;
          var l = document.createElement('p');
          l.innerHTML = project.category;
          controls.appendChild(l);
        }
        var control = document.createElement('control');
        control.className = 'button';
        control.innerHTML = '<button onclick="location.href=\'' + project.path + '\'">' + project.name + '<span>❭</span></button>';
        controls.appendChild(control);
      }
    });
  }
}

function isNarrowScreen() {
  return window.innerWidth < 761;
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)) {
    return 'iPad';
  }

  return 'unknown';
}

onkeyup = onKeyUp;

document.addEventListener(
  'touchmove',
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  { passive: false },
);

document.addEventListener('touchmove', function (event) {
  if (event.scale != 1) {
    event.stopPropagation();
  }
});

window.addEventListener('load', initTop);
window.addEventListener('load', initMain);
window.addEventListener('load', initBottom);
