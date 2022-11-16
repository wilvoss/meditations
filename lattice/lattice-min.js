class FabricObject{constructor(e){this.id=void 0===e.id?"":e.id,this.threads=void 0===e.threads?[]:e.threads,this.storedTransform=void 0===e.storedTransform?"":e.storedTransform}}let r=document.querySelector(":root");var drawnThreads,lattice,threadsInterval,mylatesttap,allThreads=[],allThings=[],previousX=0,previousY=0,tempX=window.innerWidth/2,tempY=window.innerHeight/2,pointerDown=!1,useASinH=!1,width=10,useDark=!1,distance=400,contracting=!1,contracted=!1,threadsMoving=!1;function addThreads(){isNarrowScreen()&&(document.getElementById("fiber1").style.display="none",document.getElementById("fiber2").style.display="none",document.getElementById("fiber3").style.display="none",document.getElementById("fiber4").style.display="none"),document.getElementById("glowRange").value=10,document.getElementById("glowValue").innerHTML="10px",setStyleVar("--glow","10px");for(let t=1;t<5;t++){const n=new FabricObject({});n.id="fabric"+parseInt(t-1);let r=window.innerWidth/(getMobileOperatingSystem(),7);for(let a=0;a<r;a++){const r=document.createElement("canvas"),a=window.innerWidth/window.innerHeight;var e=100+50*t+getRandomInt(1,50);r.style.left=getRandomInt(-distance*a,window.innerWidth+distance)+"px",r.style.top=getRandomInt(-distance*a,window.innerHeight+distance)+"px",r.style.width=e+"px",r.style.height=e+"px",r.style.zIndex=t,n.threads.push(r)}allThreads.push(n)}applyAddThreads()}function applyAddThreads(){lattice=document.getElementsByTagName("lattice")[0];for(let e=0;e<allThreads.length;e++){const t=allThreads[e],n=document.createElement("fabric");n.id=t.id;for(let e=0;e<t.threads.length;e++){const r=t.threads[e];n.appendChild(r)}lattice.appendChild(n)}updateFabrics(!0)}function updateFabrics(){for(let a=0;a<allThreads.length;a++){const o=allThreads[a];if("unknown"===getMobileOperatingSystem()){var e=(a+1)*(window.innerWidth/100*tempX)/100,t=(a+1)*(window.innerHeight/100*tempY)/100;o.storedTransform="translate("+e+"px, "+t+"px)"}else{const s=window.getComputedStyle(document.getElementById(o.id));if(0!=tempX-previousX||0!=tempY-previousY)if("none"!=s.transform){const d=s.transform.match(/matrix.*\((.+)\)/)[1].split(", ");a=a+isNarrowScreen()?a:0;var n=Number(a+1)*(Number(tempX<previousX)?-1:1),r=Number(a+1)*(Number(tempY<previousY)?-1:1);e=Number(d[4])+n,t=Number(d[5])+r;o.storedTransform="translate3d("+e+"px, "+t+"px, 0px)"}else o.storedTransform="translate3d(0px, 0px, 0px)"}}previousX=tempX,previousY=tempY,applyFabricsTransforms()}function doubletap(e){var t=(new Date).getTime()-mylatesttap;t<600&&t>0&&(contracted=!contracted,updateThreads(e)),mylatesttap=(new Date).getTime()}function updateThreads(e){e.preventDefault(),e.stopPropagation(),window.clearTimeout(threadsInterval),threadsMoving=!0;let t=document.getElementsByTagName("canvas");if(contracting){contracting=!1;for(let e=0;e<t.length;e++){t[e].storedTransform="translate3d(0px, 0px, 0px)"}}else{contracting=!0;for(let e=0;e<t.length;e++){const a=t[e];var n=tempX+a.clientWidth/2-Number(a.style.left.replace("px","")),r=tempY+a.clientHeight/2-Number(a.style.top.replace("px",""));a.storedTransform="translate3d("+n+"px, "+r+"px, 0px)"}}applyThreadsTransforms(),threadsInterval=window.setTimeout((()=>{threadsMoving=!1}),2e3)}function applyThreadsTransforms(){let e=document.getElementsByTagName("canvas");for(let t=0;t<e.length;t++){const n=e[t];n.style.transform=n.storedTransform}}function applyFabricsTransforms(){for(let e=0;e<allThreads.length;e++){const t=allThreads[e];document.getElementById(t.id).style.transform=t.storedTransform}}function touchMove(e){trackTouch(e)}function touchStart(e){trackTouch(e)}function trackTouch(e){return tempX=e.touches[0].pageX,tempY=e.touches[0].pageY,tempX<0&&(tempX=0),tempY<0&&(tempY=0),threadsMoving||updateFabrics(),touchDetected=!0}function pointerMove(e){return tempX=e.clientX,tempY=e.clientY,threadsMoving||updateFabrics(),mouseDetected=!0}window.addEventListener("pointermove",pointerMove),window.addEventListener("pointerdown",doubletap),window.onload=addThreads;