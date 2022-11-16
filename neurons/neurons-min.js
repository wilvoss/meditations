let brain,branches,branchesInterval,doit,r=document.querySelector(":root"),neurons=[],tempX=0,tempY=0,influence=-1,pointerDown=!1,useASinH=!1,width=25,useDark=!1,classes=["a","c","d","b","e"],count=0,previousNeuron=null,currentNeuron=null,allLines=[];function addNeurons(){brain=document.getElementsByTagName("brain")[0];for(let n=0;n<Math.round(window.innerHeight/width);n++)for(let t=0;t<Math.round(window.innerWidth/width);t++){var e=document.createElement("neuron");e.id="neuron"+count++;let o=getRandomInt(0,classes.length);e.className=classes[o],e.originalClassName=e.className,e.onmousedown=changeNeuron;let a=t*width,r=n*width;e.storedStyleTransform="translate("+a+"px, "+r+"px)",neurons.push(e)}applyNeurons()}function applyNeurons(){brain=document.getElementsByTagName("brain")[0];for(let e=0;e<neurons.length;e++){const n=neurons[e];n.style.transform=n.storedStyleTransform,brain.appendChild(n)}}function resetNeurons(){for(neurons.forEach((e=>{"neuron"==e.className&&changeNeuron({currentTarget:e})})),brain=document.getElementsByTagName("brain")[0];brain.firstChild;)brain.removeChild(brain.firstChild);neurons=[],addNeurons()}function addLine(e,n){var t=document.createElement("div");const o=window.getComputedStyle(e).transform.match(/matrix.*\((.+)\)/)[1].split(", "),a=window.getComputedStyle(n).transform.match(/matrix.*\((.+)\)/)[1].split(", "),r=o[4]-a[4],s=o[5]-a[5],u=Math.sqrt(Math.pow(r,2)+Math.pow(s,2)),l=Number(a[4]-o[4]),i=Number(a[5]-o[5]),c=180*Math.atan2(i,l)/Math.PI-90;t.className=e.id+" "+n.id,t.style.left=o[4]+"px",t.style.top=o[5]+"px",t.style.height=u+"px",t.style.transform="rotate("+c+"deg)",allLines.push(t)}function applyLines(){for(let e=0;e<allLines.length;e++){const n=allLines[e];document.getElementsByTagName("brain")[0].appendChild(n)}allLines=[]}function clearNeuron(e){const n=e.currentTarget,t=document.getElementsByTagName("brain")[0],o=document.getElementsByClassName(n.id);for(let e=o.length-1;e>=0;e--){const n=o[e];t.removeChild(n)}n.className=n.originalClassName}function changeNeuron(e){if(brain=document.getElementsByTagName("neuron"),currentNeuron=e.currentTarget,"neuron"!=currentNeuron.className){const e=document.getElementsByClassName("neuron");if(currentNeuron.className="neuron",e.length>0){for(let n=0;n<e.length;n++){const t=e[n];addLine(currentNeuron,t)}applyLines()}previousNeuron=currentNeuron,getNewQuote()}else clearNeuron(e),hideMessage()}function hideMessage(){document.getElementsByTagName("message")[0].className="",document.getElementsByTagName("attribute")[0].className=""}function getNewQuote(){let e=Quotes[getRandomInt(0,Quotes.length)];null!=currentNeuron&&null==currentNeuron.quote?currentNeuron.quote=e:e=new QuoteObject(currentNeuron.quote),document.getElementsByTagName("quote")[0].innerHTML=e.quote,document.getElementsByTagName("message")[0].className="";var n=document.getElementsByTagName("attribute")[0];n.innerHTML="- "+e.attribution,n.className="",window.setTimeout((function(){document.getElementsByTagName("message")[0].className="show",document.getElementsByTagName("attribute")[0].className="show"}),100)}function applyNeuronChange(){brain=document.getElementsByTagName("neuron");for(let e=0;e<brain.length;e++){let n=brain[e];n.className=n.newClassName}}function touchMove(e){trackTouch(e)}function touchStart(e){trackTouch(e)}function trackTouch(e){return tempX=e.touches[0].pageX,tempY=e.touches[0].pageY,tempX<0&&(tempX=0),tempY<0&&(tempY=0),touchDetected=!0}function pointerMove(e){return tempX=e.clientX,tempY=e.clientY,mouseDetected=!0}function keyUp(e){"escape"===e.key.toLowerCase()&&resetNeurons()}window.onresize=function(){clearTimeout(doit),doit=setTimeout(resetNeurons,100)},window.addEventListener("keyup",keyUp,!1),window.addEventListener("pointermove",pointerMove),window.onload=addNeurons;