let r=document.querySelector(":root");var drawnFiliments,filimentsElement,filimentsInterval,allFiliments=[],tempX=0,tempY=0,influence=-1,pointerDown=!1,useASinH=!1,width=10,useDark=!1;function addFiliments(){filimentsElement=document.getElementsByTagName("filiments")[0];let e=isNarrowScreen()?800:2e3;for(let t=0;t<e;t++){const e=document.createElement("filiment");e.storedStyleLeft=getRandomInt(-300,window.innerWidth+100)+"px",e.storedStyleTop=getRandomInt(-300,window.innerHeight+100)+"px",e.storedStyleZIndex=t,allFiliments.push(e)}applyAddFiliments(),updateFiliments(!0)}function applyAddFiliments(){for(let e=0;e<allFiliments.length;e++){const t=allFiliments[e];t.style.left=t.storedStyleLeft,t.style.top=t.storedStyleTop,t.style.zIndex=t.storedStyleZIndex,filimentsElement.appendChild(t)}}function repositionFiliments(){for(let e=0;e<allFiliments.length;e++){const t=allFiliments[e];t.style.left=getRandomInt(-300,window.innerWidth+100)+"px",t.style.top=getRandomInt(-300,window.innerHeight+100)+"px"}updateFiliments(!0)}function updateFiliments(e=!1,t){null!=t&&(influence=t),width=Number(r.style.getPropertyValue("--filimentWidth").replace("px",""));for(let e=0;e<allFiliments.length;e++){const t=allFiliments[e],n=Number(t.offsetLeft+width-tempX-t.clientWidth/2),i=Number(t.offsetTop-tempY+t.clientHeight/2),l="rotate("+influence*(useASinH?100*Math.asinh(n,i):100*Math.atan2(n,i))+"deg)";t.storedTransform=l}applyTransforms()}function switchColor(){for(let e=0;e<allFiliments.length;e++){allFiliments[e].className=useDark?"dark":""}}function applyTransforms(){for(let e=0;e<allFiliments.length;e++){const t=allFiliments[e];t.style.transform=t.storedTransform}}function touchMove(e){trackTouch(e)}function touchStart(e){trackTouch(e)}function trackTouch(e){return tempX=e.touches[0].pageX,tempY=e.touches[0].pageY,tempX<0&&(tempX=0),tempY<0&&(tempY=0),updateFiliments(),touchDetected=!0}function pointerMove(e){return tempX=e.clientX,tempY=e.clientY,updateFiliments(),mouseDetected=!0}window.addEventListener("pointermove",pointerMove),window.onload=addFiliments,window.onresize=repositionFiliments;