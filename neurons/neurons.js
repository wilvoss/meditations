/// <reference path="../shared.js" />
/// <reference path="../log.js" />

let r = document.querySelector(':root'),
  brain,
  neurons = [],
  branches,
  tempX = 0,
  tempY = 0,
  branchesInterval,
  influence = -1,
  pointerDown = false,
  useASinH = false,
  width = 25,
  useDark = false,
  classes = ['a', 'c', 'd', 'b', 'e'],
  doit,
  count = 0,
  previousNeuron = null,
  currentNeuron = null,
  allLines = [];

window.onresize = function () {
  clearTimeout(doit);
  doit = setTimeout(resetNeurons, 100);
};

function addNeurons() {
  brain = document.getElementsByTagName('brain')[0];
  for (let z = 0; z < Math.round(window.innerHeight / width); z++) {
    for (let x = 0; x < Math.round(window.innerWidth / width); x++) {
      var neuron = document.createElement('neuron');
      neuron.id = 'neuron' + count++;
      let num = getRandomInt(0, classes.length);
      neuron.className = classes[num];
      neuron.originalClassName = neuron.className;
      neuron.onmousedown = changeNeuron;
      let nx = x * width;
      let ny = z * width;
      neuron.storedStyleTransform = 'translate(' + nx + 'px, ' + ny + 'px)';
      neurons.push(neuron);
    }
  }
  applyNeurons();
}

function applyNeurons() {
  brain = document.getElementsByTagName('brain')[0];
  for (let x = 0; x < neurons.length; x++) {
    const neuron = neurons[x];
    neuron.style.transform = neuron.storedStyleTransform;
    brain.appendChild(neuron);
  }
  //neurons = [];
}

function resetNeurons() {
  neurons.forEach((neuron) => {
    if (neuron.className == 'neuron') {
      changeNeuron({ currentTarget: neuron });
    }
  });
  brain = document.getElementsByTagName('brain')[0];
  while (brain.firstChild) {
    brain.removeChild(brain.firstChild);
  }
  neurons = [];
  addNeurons();
  return;
}

function addLine(first, second) {
  var line = document.createElement('div');
  const firstNeuronStyle = window.getComputedStyle(first);
  const firstNeuronMatrix = firstNeuronStyle.transform;
  const firstNeuronMatrixValues = firstNeuronMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');

  const secondNeuronStyle = window.getComputedStyle(second);
  const secondNeuronMatrix = secondNeuronStyle.transform;
  const secondNeuronMatrixValues = secondNeuronMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');

  const a = firstNeuronMatrixValues[4] - secondNeuronMatrixValues[4];
  const b = firstNeuronMatrixValues[5] - secondNeuronMatrixValues[5];
  const height = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  const wx = Number(secondNeuronMatrixValues[4] - firstNeuronMatrixValues[4]);
  const wy = Number(secondNeuronMatrixValues[5] - firstNeuronMatrixValues[5]);
  const deg = (Math.atan2(wy, wx) * 180) / Math.PI - 90;

  line.className = first.id + ' ' + second.id;
  line.style.left = firstNeuronMatrixValues[4] + 'px';
  line.style.top = firstNeuronMatrixValues[5] + 'px';
  line.style.height = height + 'px';
  line.style.transform = 'rotate(' + deg + 'deg)';

  allLines.push(line);
}

function applyLines() {
  for (let x = 0; x < allLines.length; x++) {
    const line = allLines[x];
    document.getElementsByTagName('brain')[0].appendChild(line);
  }
  allLines = [];
}

function clearNeuron(event) {
  const neuron = event.currentTarget;
  const brain = document.getElementsByTagName('brain')[0];
  const allNeuronLines = document.getElementsByClassName(neuron.id);
  for (let x = allNeuronLines.length - 1; x >= 0; x--) {
    const line = allNeuronLines[x];
    brain.removeChild(line);
  }

  neuron.className = neuron.originalClassName;
}

function changeNeuron(event) {
  brain = document.getElementsByTagName('neuron');
  currentNeuron = event.currentTarget;
  if (currentNeuron.className != 'neuron') {
    const allRevealedNeurons = document.getElementsByClassName('neuron');
    currentNeuron.className = 'neuron';
    if (allRevealedNeurons.length > 0) {
      for (let z = 0; z < allRevealedNeurons.length; z++) {
        const neuron = allRevealedNeurons[z];
        addLine(currentNeuron, neuron);
      }
      applyLines();
    }

    previousNeuron = currentNeuron;
    getNewQuote();
  } else {
    clearNeuron(event);
    hideMessage();
  }
}

function hideMessage() {
  var message = document.getElementsByTagName('message')[0];
  message.className = '';
  var attribute = document.getElementsByTagName('attribute')[0];

  attribute.className = '';
}

function getNewQuote() {
  let quoteObject = Quotes[getRandomInt(0, Quotes.length)];
  if (currentNeuron != null && currentNeuron.quote == undefined) {
    currentNeuron.quote = quoteObject;
  } else {
    quoteObject = new QuoteObject(currentNeuron.quote);
  }
  document.getElementsByTagName('quote')[0].innerHTML = quoteObject.quote;
  var message = document.getElementsByTagName('message')[0];
  message.className = '';
  var attribute = document.getElementsByTagName('attribute')[0];
  attribute.innerHTML = '- ' + quoteObject.attribution;
  attribute.className = '';
  window.setTimeout(function () {
    var message = document.getElementsByTagName('message')[0];
    message.className = 'show';
    var attribute = document.getElementsByTagName('attribute')[0];

    attribute.className = 'show';
  }, 100);
}

function applyNeuronChange() {
  brain = document.getElementsByTagName('neuron');
  for (let index = 0; index < brain.length; index++) {
    let element = brain[index];
    element.className = element.newClassName;
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
  return (touchDetected = true);
}

function pointerMove(a) {
  tempX = a.clientX;
  tempY = a.clientY;
  return (mouseDetected = true);
}

function keyUp(event) {
  if (event.key.toLowerCase() === 'escape') {
    resetNeurons();
  }
}

window.addEventListener('keyup', keyUp, false);

window.addEventListener('pointermove', pointerMove);
// branchesInterval = window.setInterval(applyNeuronChange, 12000);
window.onload = addNeurons;
