var level,theCell,currentRoomIndex,oldz,coor,theOldMap,menuState,currentSelect,theOffset,ahead,right,theMenuTimer,previousDirection,tc,currentRoomContents,lvl,startingPoints,stairsUp,stairsDown,firstTime=0,shiftIsOn=!1,northDiffs=new Array(31,-1,-33,-65,32,0,-32,-64,33,1,-31,-63),westDiffs=new Array(33,32,31,30,1,0,-1,-2,-31,-32,-33,-34),southDiffs=new Array(-31,1,33,65,-32,0,32,64,-33,-1,31,63),eastDiffs=new Array(-33,-32,-31,-30,-1,0,1,2,31,32,33,34),interaction=$("#interaction")[0].getElementsByTagName("r"),grid=$("#grid"),TPs=$("#TPs"),gridToggle=$("#gridToggle"),tAC=$("#coor"),lGB=$("#legendButton"),theIB=$("#theInfoBox"),tHL=$("#highlight"),infoButton=$("#infoButton"),endHighlight=$("#endHighlight"),legend=$("#legend"),roomTable=$("#roomTable"),viewl1=$("#l1"),viewl2=$("#l2"),viewl3=$("#l3"),viewf1=$("#f1"),viewf2=$("#f2"),viewf3=$("#f3"),viewr1=$("#r1"),viewr2=$("#r2"),viewr3=$("#r3"),backgroundView=$("#viewBackground"),theLegendGs=legend[0].getElementsByTagName("g"),theLegendDivs=legend[0].getElementsByTagName("r"),characterDirection="north",tOS=null,tOS2=null,tOS3=null,tOS4=null,tOS5=null,tOE=null,theOldTP=null,tpH="tpHighlight",aR="aR",scaleFactor=1,isFNPressed=!1,currentTheme="",allLevels=new Array(dc(level1),dc(level2),dc(level3),dc(level4),dc(level5),dc(level6),dc(level7),dc(level8),dc(level9),dc(level10),dc(level11),dc(level12),dc(level13),dc(level14),dc(level15),dc(level16));function fullRoomView(){this.l0,this.l1,this.l2,this.l3,this.f0,this.f1,this.f2,this.f3,this.r0,this.r1,this.r2,this.r3,this.all}var currentView=new fullRoomView;function dc(e){return e.split("-")}function mailToIt(e){var t=e.split(" "),r=t[0]+"@"+t[1]+"."+t[2];window.location.href="mailto:"+r}function parseAttributes(e){return e=e.split(",")}function toggleGrid(){"none"==grid.css("display")?(createCookie("grid","block",5e3),grid.css("display","block"),gridToggle.addClass("numberOn").removeClass("number")):(createCookie("grid","none",5e3),grid.css("display","none"),gridToggle.addClass("number").removeClass("numberOn"))}function createCookie(e,t,r){if(r){var n=new Date;n.setTime(n.getTime()+24*r*60*60*1e3);var i="; expires="+n.toGMTString()}else i="";document.cookie=e+"="+t+i+"; path=/"}function readCookie(e){for(var t=e+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){for(var i=r[n];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return null}function eraseCookie(e){createCookie(e,"",-1)}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function init(){isNarrowScreen()&&(document.getElementById("uberControls").style.display="none",document.getElementById("uberControlsSpan").style.display="none",document.getElementById("cta").style.display="none"),toggleMain(null)}function revealMap(e){for(top.document.title="zavatar maps - level "+e,null!=tOS&&(tOS2&&(tOS2.className=aR,tOS2.innerHTML=""),tOS3&&(tOS3.className=aR,tOS3.innerHTML=""),tOS4&&(tOS4.className=aR,tOS4.innerHTML=""),tOS5&&(tOS5.className=aR,tOS5.innerHTML=""),tOS.className=aR,tOE.className=aR,roomTable.css("opacity","1"),tOS.innerHTML="",theOldTP=null),(level=e)>16&&(level=1),createCookie("level",level,5e3),theOldMap&&$("#"+theOldMap).addClass("number").removeClass("numberOn"),theOldMap="map"+e,$("#"+theOldMap).addClass("numberOn").removeClass("number"),$("#levelNumber")[0].innerHTML=e,theMap=allLevels[parseInt(e)-1],"1"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>12, 28</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>1, 7</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>18, 3</a></p>":"2"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>18, 19</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>22, 24</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>18, 21</a></p>":"3"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>18, 7</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>27, 3</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>15, 15</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>12, 20, 4</a></p>":"4"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>17, 8</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>21, 16</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>6, 15</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>14, 5</a></p>":"5"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>5, 4</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>15, 14, 2</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>12, 19</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>5, 22</a></p>":"6"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>28, 1</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>29, 29, 11</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>14, 26</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>1, 21</a></p>":"7"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>29, 26</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>24, 16, 5</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>20, 4</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>8, 5</a></p>":"8"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>17, 4</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>17, 14</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>15, 5</a></p>":"9"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>15, 13</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>18, 8, 7</a></p>":"10"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>14, 24</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>4, 4</a></p><p>3: <a href='javascript:' onclick='toggleTP(3);'>1, 26</a></p><p>4: <a href='javascript:' onclick='toggleTP(4);'>25, 1</a></p>":"11"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>28, 3, 7</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>1, 11</a></p>":"12"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>20, 2</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>7, 2</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>4, 27</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>9, 15</a></p>":"13"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>16, 16</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>28, 6</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>13, 17</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>6, 19</a></p>":"14"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>25, 25</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>10, 18</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>25, 6</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>9, 18, 12</a></p>":"15"==e?theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>16, 29</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>25, 30</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>20, 6</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>9, 18</a></p>":"16"==e&&(theTPDetails="<p>1: <a href='javascript:' onclick='toggleTP(1);'>15, 15</a></p> <p>2: <a href='javascript:' onclick='toggleTP(2);'>13, 23</a></p> <p>3: <a href='javascript:' onclick='toggleTP(3);'>21, 18</a></p> <p>4: <a href='javascript:' onclick='toggleTP(4);'>8, 12</a></p> <p>5: <a href='javascript:' onclick='toggleTP(5);'>28, 11</a></p>"),x=0;x<theMap.length;x++){for(theCell=parseAttributes(theMap[x]),y=0;y<5;y++){var t=$("#mainRoom")[0].getElementsByTagName("td")[x].getElementsByTagName("r");y<theCell.length?t[y].className=theCell[y]:t[y].className="noW"}theCell=null}$("#TPs")[0].innerHTML=theTPDetails,null!=currentSelect&&tM(currentSelect,!0)}function placeDiv(e,t){e.style.left=t.offsetLeft-25+"px",e.style.top=t.offsetTop-1+"px"}function restoreGrid(e){null!=e&&(grid.css("display",e),"block"==e?gridToggle.addClass("numberOn").removeClass("number"):gridToggle.addClass("number").removeClass("numberOn"))}function getRoomName(e){for(var t=0;t<interaction.length;t++)if(interaction[t]==e)return"Room "+t%32+"_"+(31-Math.floor(t/32))}function getRoomCoor(e){for(var t=0;t<interaction.length;t++)if(interaction[t]==e)return[t%32,31-Math.floor(t/32)]}function getRoomIndex(e){if(null!=e){var t=parseInt(e[0]),r=parseInt(e[1]);return lvl=allLevels[level-1],t+32*(31-r)}}function getElementBasedOnRoomName(e){var t=e.replace("Room ","").split("_"),r=parseInt(t[0])+32*(31-parseInt(t[1]));return interaction[r]}function tM(e,t){currentSelect=e,t=null!=t&&t;var r=getRoomName(e);if(tc=getRoomCoor(e),createCookie("room",r,5e3),getCurrentRoomContents(),highlightLegend(),t||-1==$("#coor")[0].innerHTML.indexOf("Room")&&-1==$("#endCoor")[0].innerHTML.indexOf("Room"))showStart();else{var n=$("#menu");n.css("display","block"),placeDiv(n[0],e),menuOn()}reactToRoomContents()}function getCurrentRoomContents(){currentRoomIndex=getRoomIndex(tc),currentRoomContents=getRoomContents(currentRoomIndex,!0),getBaseRoomViewElements()}function reactToRoomContents(){if(-1!=currentView.f1.indexOf("dtp"))revealMap(parseInt(level)+1);else if(-1!=currentView.f1.indexOf("utp"))revealMap(parseInt(level)-1);else if(-1!=currentView.f1.indexOf("c1"))revealMap(parseInt(level)+1);else if(-1!=currentView.f1.indexOf("c2"))revealMap(parseInt(level)+2);else if(-1!=currentView.f1.indexOf("c3"))revealMap(parseInt(level)+3);else if(-1!=currentView.f1.indexOf("ra"))changeDir("right");else if(-1!=currentView.f1.indexOf("ua"))changeDir("up");else if(-1!=currentView.f1.indexOf("la"))changeDir("left");else if(-1!=currentView.f1.indexOf("da"))changeDir("down");else if(-1!=currentView.f1.indexOf("tp1"))teleportToTP(1);else if(-1!=currentView.f1.indexOf("tp2"))teleportToTP(2);else if(-1!=currentView.f1.indexOf("tp3"))teleportToTP(3);else if(-1!=currentView.f1.indexOf("tp4"))teleportToTP(4);else if(-1!=currentView.f1.indexOf("tp5"))teleportToTP(5);else if(-1!=currentView.f1.indexOf("rtp")){tM(getElementBasedOnRoomName("Room "+getRandomInt(1,30)+"_"+getRandomInt(1,30)),!0)}else if(-1!=currentView.f1.indexOf("sp")){switch(getRandomInt(1,4)){case 1:changeDir("left");break;case 2:changeDir("up");break;case 3:changeDir("right");break;case 4:changeDir("down");break}}else-1!=currentView.f1.indexOf("bl")&&upKeyPressed()}function teleportToTP(e){var t=TPs[0].getElementsByTagName("a")[e-1].innerHTML.split(","),r=getElementBasedOnRoomName("Room "+t[0]+"_"+t[1]);3==t.length&&revealMap(parseInt(t[2].replace(" ",""))),tM(r,!0)}function getRoomContents(e,t){try{if(null!=e&&null!=lvl){var r=lvl[e].split(",");if(t)for(var n=r.length-1;n>=0;n--)"b"!=r[n]&&"v"!=r[n]&&"bs"!=r[n]&&"u"!=r[n]&&"j"!=r[n]&&"rs"!=r[n]&&"r"!=r[n]||r.splice(n,1);else;return r}}catch(e){return r=new Array("")}}function getBaseRoomViewElements(){var e;switch(currentView.all="",characterDirection){case"north":e=northDiffs;break;case"west":e=westDiffs;break;case"south":e=southDiffs;break;case"east":e=eastDiffs;break}if(currentView.l0=getRoomContents(currentRoomIndex+e[0],!1),currentView.l1=getRoomContents(currentRoomIndex+e[1],!1),currentView.l2=getRoomContents(currentRoomIndex+e[2],!1),currentView.l3=getRoomContents(currentRoomIndex+e[3],!1),currentView.f0=getRoomContents(currentRoomIndex+e[4],!1),currentView.f1=getRoomContents(currentRoomIndex+e[5],!1),currentView.f2=getRoomContents(currentRoomIndex+e[6],!1),currentView.f3=getRoomContents(currentRoomIndex+e[7],!1),currentView.r0=getRoomContents(currentRoomIndex+e[8],!1),currentView.r1=getRoomContents(currentRoomIndex+e[9],!1),currentView.r2=getRoomContents(currentRoomIndex+e[10],!1),currentView.r3=getRoomContents(currentRoomIndex+e[11],!1),null!=currentView.l1&&(currentView.all+=currentView.l0.join()+" | ",currentView.all+=currentView.l1.join()+" | ",currentView.all+=currentView.l2.join()+" | ",currentView.all+=currentView.l3.join()+" | ",currentView.all+=currentView.f0.join()+" | ",currentView.all+=currentView.f1.join()+" | ",currentView.all+=currentView.f2.join()+" | ",currentView.all+=currentView.f3.join()+" | ",currentView.all+=currentView.r0.join()+" | ",currentView.all+=currentView.r1.join()+" | ",currentView.all+=currentView.r2.join()+" | ",currentView.all+=currentView.r3.join()),viewl1[0].className=null,viewl2[0].className=null,viewf1[0].className=null,viewf2[0].className=null,viewr1[0].className=null,viewr2[0].className=null,-1==currentView.f1.indexOf("k")&&-1==currentView.f1.indexOf("d"))switch(characterDirection){case"north":-1!=currentView.l2.indexOf("r")||-1!=currentView.l2.indexOf("u")?(viewl2[0].className="lwall",-1!=currentView.l2.indexOf("j")&&(viewl2[0].className="ldoor")):-1==currentView.l3.indexOf("b")&&-1==currentView.l3.indexOf("u")||(viewl2[0].className="wall",-1!=currentView.l3.indexOf("v")&&(viewl2[0].className="door")),-1!=currentView.l1.indexOf("r")||-1!=currentView.l1.indexOf("u")?(viewl1[0].className="lwall",-1!=currentView.l1.indexOf("j")&&(viewl1[0].className="ldoor")):-1==currentView.l2.indexOf("b")&&-1==currentView.l2.indexOf("u")||(viewl1[0].className="wall",-1!=currentView.l2.indexOf("v")&&(viewl1[0].className="door")),-1!=currentView.f2.indexOf("r")||-1!=currentView.f2.indexOf("u")?(viewr2[0].className="rwall",-1!=currentView.f2.indexOf("j")&&(viewr2[0].className="rdoor")):-1==currentView.r3.indexOf("b")&&-1==currentView.r3.indexOf("u")||(viewr2[0].className="wall",-1!=currentView.r3.indexOf("v")&&(viewr2[0].className="door")),-1!=currentView.f1.indexOf("r")||-1!=currentView.f1.indexOf("u")?(viewr1[0].className="rwall",-1!=currentView.f1.indexOf("j")&&(viewr1[0].className="rdoor")):-1==currentView.r2.indexOf("b")&&-1==currentView.r2.indexOf("u")||(viewr1[0].className="wall",-1!=currentView.r2.indexOf("v")&&(viewr1[0].className="door")),-1!=currentView.f2.indexOf("b")||-1!=currentView.f2.indexOf("u")?(viewf1[0].className="wall",-1!=currentView.f2.indexOf("v")&&(viewf1[0].className="door")):-1==currentView.f3.indexOf("b")&&-1==currentView.f3.indexOf("u")||(viewf2[0].className="wall",-1!=currentView.f3.indexOf("v")&&(viewf2[0].className="door"));break;case"west":-1!=currentView.f2.indexOf("b")||-1!=currentView.f2.indexOf("u")?(viewl2[0].className="lwall",-1!=currentView.f2.indexOf("v")&&(viewl2[0].className="ldoor")):-1==currentView.l3.indexOf("r")&&-1==currentView.l3.indexOf("u")||(viewl2[0].className="wall",-1!=currentView.l3.indexOf("j")&&(viewl2[0].className="door")),-1!=currentView.f1.indexOf("b")||-1!=currentView.f1.indexOf("u")?(viewl1[0].className="lwall",-1!=currentView.f1.indexOf("v")&&(viewl1[0].className="ldoor")):-1==currentView.l2.indexOf("r")&&-1==currentView.l2.indexOf("u")||(viewl1[0].className="wall",-1!=currentView.l2.indexOf("j")&&(viewl1[0].className="door")),-1!=currentView.r2.indexOf("b")||-1!=currentView.r2.indexOf("u")?(viewr2[0].className="rwall",-1!=currentView.r2.indexOf("v")&&(viewr2[0].className="rdoor")):-1==currentView.r3.indexOf("r")&&-1==currentView.r3.indexOf("u")||(viewr2[0].className="wall",-1!=currentView.r3.indexOf("j")&&(viewr2[0].className="door")),-1!=currentView.r1.indexOf("b")||-1!=currentView.r1.indexOf("u")?(viewr1[0].className="rwall",-1!=currentView.r1.indexOf("v")&&(viewr1[0].className="rdoor")):-1==currentView.r2.indexOf("r")&&-1==currentView.r2.indexOf("u")||(viewr1[0].className="wall",-1!=currentView.r2.indexOf("j")&&(viewr1[0].className="door")),-1!=currentView.f2.indexOf("r")||-1!=currentView.f2.indexOf("u")?(viewf1[0].className="wall",-1!=currentView.f2.indexOf("j")&&(viewf1[0].className="door")):-1==currentView.f3.indexOf("r")&&-1==currentView.f3.indexOf("u")||(viewf2[0].className="wall",-1!=currentView.f3.indexOf("j")&&(viewf2[0].className="door"));break;case"south":-1!=currentView.f2.indexOf("r")||-1!=currentView.f2.indexOf("u")?(viewl2[0].className="lwall",-1!=currentView.f2.indexOf("j")&&(viewl2[0].className="ldoor")):-1==currentView.l2.indexOf("b")&&-1==currentView.l2.indexOf("u")||(viewl2[0].className="wall",-1!=currentView.l2.indexOf("v")&&(viewl2[0].className="door")),-1!=currentView.f1.indexOf("r")||-1!=currentView.f1.indexOf("u")?(viewl1[0].className="lwall",-1!=currentView.f1.indexOf("j")&&(viewl1[0].className="ldoor")):-1==currentView.l1.indexOf("b")&&-1==currentView.l1.indexOf("u")||(viewl1[0].className="wall",-1!=currentView.l1.indexOf("v")&&(viewl1[0].className="door")),-1!=currentView.r2.indexOf("r")||-1!=currentView.r2.indexOf("u")?(viewr2[0].className="rwall",-1!=currentView.r2.indexOf("j")&&(viewr2[0].className="rdoor")):-1==currentView.r2.indexOf("b")&&-1==currentView.r2.indexOf("u")||(viewr2[0].className="wall",-1!=currentView.r2.indexOf("v")&&(viewr2[0].className="door")),-1!=currentView.r1.indexOf("r")||-1!=currentView.r1.indexOf("u")?(viewr1[0].className="rwall",-1!=currentView.r1.indexOf("j")&&(viewr1[0].className="rdoor")):-1==currentView.r1.indexOf("b")&&-1==currentView.r1.indexOf("u")||(viewr1[0].className="wall",-1!=currentView.r1.indexOf("v")&&(viewr1[0].className="door")),-1!=currentView.f1.indexOf("b")||-1!=currentView.f1.indexOf("u")?(viewf1[0].className="wall",-1!=currentView.f1.indexOf("v")&&(viewf1[0].className="door")):-1==currentView.f2.indexOf("b")&&-1==currentView.f2.indexOf("u")||(viewf2[0].className="wall",-1!=currentView.f2.indexOf("v")&&(viewf2[0].className="door"));break;case"east":-1!=currentView.l2.indexOf("b")||-1!=currentView.l2.indexOf("u")?(viewl2[0].className="lwall",-1!=currentView.l2.indexOf("v")&&(viewl2[0].className="ldoor")):-1==currentView.l2.indexOf("r")&&-1==currentView.l2.indexOf("u")||(viewl2[0].className="wall",-1!=currentView.l2.indexOf("j")&&(viewl2[0].className="door")),-1!=currentView.l1.indexOf("b")||-1!=currentView.l1.indexOf("u")?(viewl1[0].className="lwall",-1!=currentView.l1.indexOf("v")&&(viewl1[0].className="ldoor")):-1==currentView.l1.indexOf("r")&&-1==currentView.l1.indexOf("u")||(viewl1[0].className="wall",-1!=currentView.l1.indexOf("j")&&(viewl1[0].className="door")),-1!=currentView.f2.indexOf("b")||-1!=currentView.f2.indexOf("u")?(viewr2[0].className="rwall",-1!=currentView.f2.indexOf("v")&&(viewr2[0].className="rdoor")):-1==currentView.r2.indexOf("r")&&-1==currentView.r2.indexOf("u")||(viewr2[0].className="wall",-1!=currentView.r2.indexOf("j")&&(viewr2[0].className="door")),-1!=currentView.f1.indexOf("b")||-1!=currentView.f1.indexOf("u")?(viewr1[0].className="rwall",-1!=currentView.f1.indexOf("v")&&(viewr1[0].className="rdoor")):-1==currentView.r1.indexOf("r")&&-1==currentView.r1.indexOf("u")||(viewr1[0].className="wall",-1!=currentView.r1.indexOf("j")&&(viewr1[0].className="door")),-1!=currentView.f1.indexOf("r")||-1!=currentView.f1.indexOf("u")?(viewf1[0].className="wall",-1!=currentView.f1.indexOf("j")&&(viewf1[0].className="door")):-1==currentView.f2.indexOf("r")&&-1==currentView.f2.indexOf("u")||(viewf2[0].className="wall",-1!=currentView.f2.indexOf("j")&&(viewf2[0].className="door"));break}}function showStart(){null!=tOS&&(tOS2&&(tOS2.className=aR,tOS2.innerHTML=""),tOS3&&(tOS3.className=aR,tOS3.innerHTML=""),tOS4&&(tOS4.className=aR,tOS4.innerHTML=""),tOS5&&(tOS5.className=aR,tOS5.innerHTML=""),tOS.className=aR,tOE.className=aR,roomTable.css("opacity","1"),tOS.innerHTML="",theOldTP=null),z=currentSelect,document.getElementById("menu").style.display="none";var e=document.getElementById("highlight");placeDiv(e,z),e.style.height=z.offsetHeight-1+"px",e.style.width=z.offsetWidth-1+"px",e.style.display="block",coor=getRoomName(z),showCoor("start")}function showEnd(){z=currentSelect,document.getElementById("menu").style.display="none";var e=document.getElementById("endHighlight");placeDiv(e,z),e.style.height=z.offsetHeight-1+"px",e.style.width=z.offsetWidth-1+"px",e.style.display="block",roomTable.css("opacity",".2"),coor=getRoomName(z),showCoor("end")}function showDiff(){-1!=document.getElementById("coor").innerHTML.indexOf("Room")&&-1!=document.getElementById("endCoor").innerHTML.indexOf("Room")&&(a=document.getElementById("coor").innerHTML,b=document.getElementById("endCoor").innerHTML,a=a.replace("Room",""),a=a.replace(" ",""),b=b.replace("Room",""),b=b.replace(" ",""),a2=a.split("_"),b2=b.split("_"),calcOffset(a2,b2),document.getElementById("difference").innerHTML="Ahead "+ahead+", Right "+right,ahead=null,right=null)}function calcOffset(e,t){var r=0,n=0;"up"==document.getElementById("highlight").title?(t[1]<e[1]&&(r=30),t[0]<e[0]&&(n=30),ahead=t[1]-e[1]+r,right=t[0]-e[0]+n):"right"==document.getElementById("highlight").title?(t[1]>e[1]&&(n=30),t[0]<e[0]&&(r=30),ahead=t[0]-e[0]+r,right=e[1]-t[1]+n):"down"==document.getElementById("highlight").title?(e[1]<t[1]&&(r=30),e[0]<t[0]&&(n=30),ahead=e[1]-t[1]+r,right=e[0]-t[0]+n):"left"==document.getElementById("highlight").title&&(t[1]<e[1]&&(n=30),t[0]>e[0]&&(r=30),ahead=e[0]-t[0]+r,right=t[1]-e[1]+n),ahead>30&&(ahead-=30),ahead<0&&(ahead+=30),right>30&&(right-=30),right<0&&(right+=30)}function showCoor(e){"start"==e?document.getElementById("coor").innerHTML=coor+", "+level:document.getElementById("endCoor").innerHTML=coor+", "+level,showDiff()}function toggleSimpleView(){-1==document.getElementById("simple").href.indexOf("simple.css")?(document.getElementById("simple").href="simple.css",document.getElementById("simpleView").className="numberOn",createCookie("simpleView","simple",5e3)):(document.getElementById("simple").href="null",document.getElementById("simpleView").className="number",createCookie("simpleView",null,5e3))}function restoreSimpleView(){s=readCookie("simpleView"),"simple"==s&&toggleSimpleView()}function changeDir(e){if("up"==e&&"north"!=characterDirection||"left"==e&&"west"!=characterDirection||"down"==e&&"south"!=characterDirection||"right"==e&&"east"!=characterDirection){var t=document.getElementById("highlight");document.getElementById("up").className="number",document.getElementById("down").className="number",document.getElementById("right").className="number",document.getElementById("left").className="number",document.getElementById(e).className="numberOn","left"==e?(t.style.transform="rotate(-90deg)",t.title="left",characterDirection="west",showDiff()):"up"==e?(t.style.transform="rotate(0deg)",t.title="up",characterDirection="north",showDiff()):"right"==e?(t.style.transform="rotate(90deg)",t.title="right",characterDirection="east",showDiff()):"down"==e&&(t.style.transform="rotate(180deg)",t.title="down",characterDirection="south",showDiff()),createCookie("dir",e,5e3),getCurrentRoomContents()}}function closeMenu(){"off"==menuState&&(document.getElementById("menu").style.display="none")}function menuOn(){menuState="on",window.clearTimeout(theMenuTimer)}function menuOff(){menuState="off"}function clearCoor(){clearLegendHighlight(),document.getElementById("highlight").style.display="none",document.getElementById("endHighlight").style.display="none",document.getElementById("coor").innerHTML="&nbsp;",document.getElementById("endCoor").innerHTML="&nbsp;",document.getElementById("difference").innerHTML="&nbsp;"}function swapTheme(e){""==e?(currentTheme="normal",document.getElementById("normal").className="numberOn",document.getElementById("pterm").className="number"):"pterm"==e&&(currentTheme="pterm",document.getElementById("normal").className="number",document.getElementById("pterm").className="numberOn"),null!=tOS&&(tOS2&&(tOS2.className=aR,tOS2.innerHTML=""),tOS3&&(tOS3.className=aR,tOS3.innerHTML=""),tOS4&&(tOS4.className=aR,tOS4.innerHTML=""),tOS5&&(tOS5.className=aR,tOS5.innerHTML=""),tOS.className=aR,tOE.className=aR,roomTable.css("opacity","1"),tOS.innerHTML="",theOldTP=null),document.getElementById("theme").href=null!=e&&""!=e?e+".css":"",clearCoor(),roomTable.css("opacity","1"),createCookie("theme",e,5e3),window.setTimeout((function(){null!=currentSelect&&tM(currentSelect,!0)}),100)}function restorePreviousSession(){init();var e=readCookie("theme");level=readCookie("level");var t=readCookie("legend");restoreSimpleView(),null==level&&(level="1"),restoreGrid(readCookie("grid")),null!=t&&restoreLegend(t),swapTheme(e),-1!=document.location.href.indexOf("#")&&(c=document.location.href.split("#"),""!=c[1]&&(level=c[1])),revealMap(level);var r=readCookie("room");tM(getElementBasedOnRoomName(null!=r?r:"Room 12_17")),changeDir(readCookie("dir"))}function restoreLegend(e){document.getElementById("legend").style.display=e,"block"==e&&(document.getElementById("legendButton").className="numberOn")}function getRoomDiv(e,t,r,n){if(null!=startingPoints){for(var i=0;i<startingPoints.length;i++){var a="Room "+(l=startingPoints[i].split(","))[0]+"_"+l[1];(tOS=getElementBasedOnRoomName(a)).innerHTML="",tOS.className=aR}tOE.className=aR}if(null==theOldTP||e!=theOldTP){startingPoints=t.split("|"),tOE=getElementBasedOnRoomName("Room "+r+"_"+n);for(i=0;i<startingPoints.length;i++){var l;a="Room "+(l=startingPoints[i].split(","))[0]+"_"+l[1];(tOS=getElementBasedOnRoomName(a)).innerHTML=tOS.innerHTML==e?"":e,tOS.className=tOS.className==tpH?aR:tpH}tOE.className="tpEndHighlight"==tOE.className?aR:"tpEndHighlight",theOldTP=e}else theOldTP=null}function toggleTP(e){if(e!=theOldTP&&null!=tOS&&(roomTable.css("opacity","1"),tOS.innerHTML=""),clearCoor(),roomTable.css("opacity","1"==roomTable.css("opacity")?".2":"1"),1==level)switch(e.toString()){case"1":getRoomDiv(e,"18,2",12,28);break;case"2":getRoomDiv(e,"25,8",1,7);break;case"3":getRoomDiv(e,"12,29",18,3);break}else if(2==level)switch(e.toString()){case"1":getRoomDiv(e,"18,12",18,19);break;case"2":getRoomDiv(e,"11,14",22,24);break;case"3":getRoomDiv(e,"18,22",18,21);break}else if(3==level)switch(e.toString()){case"1":getRoomDiv(e,"13,7",18,7);break;case"2":getRoomDiv(e,"7,20",27,3);break;case"3":getRoomDiv(e,"22,20|5,25|25,10",15,15);break;case"4":getRoomDiv(e,"17,18",12,20);break}else if(4==level)switch(e.toString()){case"1":getRoomDiv(e,"21,24",17,8);break;case"2":getRoomDiv(e,"9,24|11,21|11,11|2,21|3,11",21,16);break;case"3":getRoomDiv(e,"17,24|13,20",6,15);break;case"4":getRoomDiv(e,"28,27",14,5);break}else if(5==level)switch(e.toString()){case"1":getRoomDiv(e,"26,18|26,10",5,4);break;case"2":getRoomDiv(e,"28,12",15,14);break;case"3":getRoomDiv(e,"26,14",12,19);break;case"4":getRoomDiv(e,"19,19",5,22);break}else if(6==level)switch(e.toString()){case"1":getRoomDiv(e,"25,18",28,1);break;case"2":getRoomDiv(e,"13,17|14,17|14,16",29,29);break;case"3":getRoomDiv(e,"8,20",14,26);break;case"4":getRoomDiv(e,"9,23",1,21);break}else if(7==level)switch(e.toString()){case"1":getRoomDiv(e,"10,5",29,26);break;case"2":getRoomDiv(e,"22,5",24,16);break;case"3":getRoomDiv(e,"15,15",20,4);break;case"4":getRoomDiv(e,"27,26",8,5);break}else if(8==level)switch(e.toString()){case"1":getRoomDiv(e,"8,2",17,4);break;case"2":getRoomDiv(e,"23,16",17,14);break;case"3":getRoomDiv(e,"25,23",15,5);break}else if(9==level)switch(e.toString()){case"1":getRoomDiv(e,"15,12",15,13);break;case"2":getRoomDiv(e,"9,23",18,8);break}else if(10==level)switch(e.toString()){case"1":getRoomDiv(e,"11,12",14,24);break;case"2":getRoomDiv(e,"25,22",4,4);break;case"3":getRoomDiv(e,"1,24|1,25|1,27|1,28",1,26);break;case"4":getRoomDiv(e,"10,24",25,1);break}else if(11==level)switch(e.toString()){case"1":getRoomDiv(e,"19,9",28,3);break;case"2":getRoomDiv(e,"11,17|9,15",1,11);break}else if(12==level)switch(e.toString()){case"1":getRoomDiv(e,"6,2",20,2);break;case"2":getRoomDiv(e,"21,2",7,2);break;case"3":getRoomDiv(e,"26,4",4,27);break;case"4":getRoomDiv(e,"17,26|1,11",9,15);break}else if(13==level)switch(e.toString()){case"1":getRoomDiv(e,"11,4|11,5",16,16);break;case"2":getRoomDiv(e,"7,7",28,6);break;case"3":getRoomDiv(e,"4,13|5,13",13,17);break;case"4":getRoomDiv(e,"15,18",6,19);break}else if(14==level)switch(e.toString()){case"1":getRoomDiv(e,"6,6",25,25);break;case"2":getRoomDiv(e,"23,20",10,18);break;case"3":getRoomDiv(e,"6,25",25,6);break;case"4":getRoomDiv(e,"14,29",9,18);break}else if(15==level)switch(e.toString()){case"1":getRoomDiv(e,"29,21|17,3",16,29);break;case"2":getRoomDiv(e,"4,26|3,13|25,6",25,30);break;case"3":getRoomDiv(e,"20,28|2,7",20,6);break;case"4":getRoomDiv(e,"28,28|23,9|4,8",9,18);break}else if(16==level)switch(e.toString()){case"1":getRoomDiv(e,"4,27",15,15);break;case"2":getRoomDiv(e,"28,11",13,23);break;case"3":getRoomDiv(e,"8,12",21,18);break;case"4":getRoomDiv(e,"21,18",8,12);break;case"5":getRoomDiv(e,"13,23",28,11);break}}function toggleInfo(){theIB.css("display","block"==theIB.css("display")?"none":"block"),infoButton[0].className="block"==theIB.css("display")?"numberOn":"number",tHL.css("visibility","hidden"==tHL.css("visibility")?"visible":"hidden"),endHighlight.css("visibility","hidden"==endHighlight.css("visibility")?"visible":"hidden")}function toggleLegend(){legend.css("display","block"==legend.css("display")?"none":"block"),lGB[0].className="numberOn"==lGB[0].className?"number":"numberOn",createCookie("legend",document.getElementById("legend").style.display,5e3)}function highlightLegend(){backgroundView=$("#viewBackground"),clearLegendHighlight(),roomInfo.innerHTML="","normal"==currentTheme?backgroundView.css("background-image","url(viewImages/floor.png"):backgroundView.css("background-image",""),$("#stairsButton").css("display","none");let e=!1;for(var t=0;t<currentRoomContents.length;t++){for(var r=0;r<theLegendGs.length;r++){if(""!=currentRoomContents[t]&&(currentRoomContents[t]==theLegendGs[r].className||-1!=currentRoomContents[t].indexOf("tp")&&0==theLegendGs[r].className.indexOf("tp"))){theLegendGs[r].className=currentRoomContents[t]+" highlight",-1!=theLegendDivs[r].innerHTML.indexOf("tairs")&&$("#stairsButton").css("display","inline-block"),roomInfo.innerHTML+=theLegendDivs[r].innerHTML.trim()+"</br>",theLegendDivs[r].className=" highlight",e=-1!=currentRoomContents[t].indexOf("h")&&"normal"==currentTheme;break}if(e)break}backgroundView.css("background-image",e?"url(viewImages/floor_with_water.png":"")}roomInfo.innerHTML=""==roomInfo.innerHTML?"</br></br></br>":roomInfo.innerHTML}function clearLegendHighlight(){roomInfo.innerHTML="&nbsp;";for(var e=0;e<theLegendGs.length;e++){var t=theLegendGs[e].className;-1!=t.indexOf("highlight")&&(t=t.replace(" highlight",""),theLegendGs[e].className=t,theLegendDivs[e].className="")}}function detectOnKeyUpEvent(e){var t=e||window.event;16==t.keyCode?shiftIsOn=!1:17==t.keyCode&&(isFNPressed=!1)}function turnLeft(){switch(characterDirection){case"west":changeDir("down");break;case"north":changeDir("left");break;case"east":changeDir("up");break;case"south":changeDir("right");break}shiftIsOn&&upKeyPressed()}function turnRight(){switch(characterDirection){case"west":changeDir("up");break;case"north":changeDir("right");break;case"east":changeDir("down");break;case"south":changeDir("left");break}shiftIsOn&&upKeyPressed()}function uTurn(){var e;switch(characterDirection){case"west":changeDir("right"),e="left";break;case"north":changeDir("down"),e="up";break;case"east":changeDir("left"),e="right";break;case"south":changeDir("up"),e="down";break}shiftIsOn&&(upKeyPressed(),changeDir(e))}function takeStairs(){-1!=currentView.f1.indexOf("ds")?revealMap(parseInt(level)+1):-1!=currentView.f1.indexOf("us")&&1!=level&&revealMap(parseInt(level)-1)}function detectOnKeyDownEvent(e){var t=e||window.event;13==t.keyCode?takeStairs():16==t.keyCode?shiftIsOn=!0:37==t.keyCode?turnLeft():38==t.keyCode?upKeyPressed():39==t.keyCode?turnRight():40==t.keyCode?uTurn():49!=t.keyCode||isFNPressed?49==t.keyCode&&isFNPressed?revealMap("11"):50!=t.keyCode||isFNPressed?50==t.keyCode&&isFNPressed?revealMap("12"):51!=t.keyCode||isFNPressed?51==t.keyCode&&isFNPressed?revealMap("13"):52!=t.keyCode||isFNPressed?52==t.keyCode&&isFNPressed?revealMap("14"):53!=t.keyCode||isFNPressed?53==t.keyCode&&isFNPressed?revealMap("15"):54!=t.keyCode||isFNPressed?54==t.keyCode&&isFNPressed?revealMap("16"):55==t.keyCode?revealMap("7"):56==t.keyCode?revealMap("8"):57==t.keyCode?revealMap("9"):48==t.keyCode?revealMap("10"):112==t.keyCode?revealMap("11"):113==t.keyCode?revealMap("12"):114==t.keyCode?revealMap("13"):115==t.keyCode?revealMap("14"):116==t.keyCode?revealMap("15"):87==t.keyCode?swapTheme(""):80==t.keyCode?swapTheme("pterm"):"h"==t.key.toLowerCase()?toggleSimpleView():71==t.keyCode?toggleGrid():76==t.keyCode?toggleLegend():73==t.keyCode?toggleInfo():17==t.keyCode&&(isFNPressed=!0):revealMap("6"):revealMap("5"):revealMap("4"):revealMap("3"):revealMap("2"):revealMap("1")}function upKeyPressed(){var e,t=getRoomCoor(currentSelect);switch(characterDirection){case"west":(-1!=currentView.f2.indexOf("rs")&&shiftIsOn||-1!=currentView.f2.indexOf("j")&&shiftIsOn||-1==currentView.f2.indexOf("r")&&-1==currentView.f2.indexOf("u"))&&(parseInt(t[0])-1<=0&&(t[0]=31),e="Room "+(parseInt(t[0])-1)+"_"+t[1]);break;case"north":(-1!=currentView.f2.indexOf("bs")&&shiftIsOn||-1!=currentView.f2.indexOf("v")&&shiftIsOn||-1==currentView.f2.indexOf("b")&&-1==currentView.f2.indexOf("u"))&&(parseInt(t[1])+1>=31&&(t[1]=0),e="Room "+t[0]+"_"+(parseInt(t[1])+1));break;case"east":(-1!=currentView.f1.indexOf("rs")&&shiftIsOn||-1!=currentView.f1.indexOf("j")&&shiftIsOn||-1==currentView.f1.indexOf("r")&&-1==currentView.f1.indexOf("u"))&&(parseInt(t[0])+1>=31&&(t[0]=0),e="Room "+(parseInt(t[0])+1)+"_"+t[1]);break;case"south":(-1!=currentView.f1.indexOf("bs")&&shiftIsOn||-1!=currentView.f1.indexOf("v")&&shiftIsOn||-1==currentView.f1.indexOf("b")&&-1==currentView.f1.indexOf("u"))&&(parseInt(t[1])-1<=0&&(t[1]=31),e="Room "+t[0]+"_"+(parseInt(t[1])-1));break}null!=e&&tM(getElementBasedOnRoomName(e),!0)}document.body.addEventListener("touchstart",tapHandler),document.getElementById("moveForwardButton").addEventListener("touchstart",tapHandler),document.getElementById("turnLeft").addEventListener("touchstart",tapHandler),document.getElementById("turnRight").addEventListener("touchstart",tapHandler);var tappedTwice=!1;function tapHandler(e){if(!tappedTwice)return tappedTwice=!0,setTimeout((function(){tappedTwice=!1}),300),!1;e.stopPropagation(),e.preventDefault()}var eventOnKeyDownHandler=detectOnKeyDownEvent,eventOnKeyUpHandler=detectOnKeyUpEvent;document.onkeydown=eventOnKeyDownHandler,document.onkeyup=eventOnKeyUpHandler;