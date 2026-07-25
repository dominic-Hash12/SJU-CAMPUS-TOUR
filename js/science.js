/*=====================================================
    ST. JOSEPH'S UNIVERSITY
    SCIENCE BLOCK VR ENGINE
======================================================*/

/* ===========================
   DOM ELEMENTS
=========================== */

const loader = document.getElementById("loader");

const viewer = document.getElementById("viewer");

const sidebar = document.getElementById("sidebar");

const locations = document.querySelectorAll(".location");

const videoContainer = document.getElementById("videoContainer");

const video = document.getElementById("transitionVideo");

const sky = document.getElementById("sky");

const videoTitle = document.getElementById("videoTitle");


/* ===========================
   PANORAMA DATABASE
=========================== */

const TOUR = {

current:"entrance",

locations:{

entrance:{

title:"Science Block Entrance",

image:"#entrance",

transition:"../videos/science/intro.mp4"

},

corridor:{

title:"Main Corridor",

image:"#corridor",

transition:"../videos/science/walk1.mp4"

},

physics:{

title:"Physics Laboratory",

image:"#physics",

transition:"../videos/science/walk2.mp4"

},

chemistry:{

title:"Chemistry Laboratory",

image:"#chemistry",

transition:"../videos/science/walk3.mp4"

},

computer:{

title:"Computer Laboratory",

image:"#computer",

transition:"../videos/science/walk4.mp4"

}

}

};


/* ===========================
   LOADER
=========================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

playIntro();

},500);

},1200);

});


/* ===========================
   PLAY INTRO VIDEO
=========================== */

function playIntro(){

videoContainer.style.display="flex";

videoTitle.innerHTML="Science Block";

video.src="../videos/science/intro.mp4";

video.load();

video.play();

video.onended=()=>{

videoContainer.style.display="none";

viewer.style.display="flex";

loadPanorama("entrance");

};

}


/* ===========================
   LOAD PANORAMA
=========================== */

function loadPanorama(id){

const pano=TOUR.locations[id];

if(!pano) return;

TOUR.current=id;

sky.setAttribute("src",pano.image);

highlightLocation(id);

}


/* ===========================
   ACTIVE SIDEBAR
=========================== */

function highlightLocation(id){

locations.forEach(item=>{

item.classList.remove("active");

if(item.dataset.id===id){

item.classList.add("active");

}

});

}


/* ===========================
   PLAY TRANSITION
=========================== */

function playTransition(target){

const pano=TOUR.locations[target];

if(!pano) return;

videoContainer.style.display="flex";

videoTitle.innerHTML=pano.title;

video.src=pano.transition;

video.load();

video.play();

video.onended=()=>{

videoContainer.style.display="none";

loadPanorama(target);

};

}


/* ===========================
   FADE EFFECT
=========================== */

function fadeOut(element){

element.style.opacity="0";

}

function fadeIn(element){

element.style.opacity="1";

}


/* ===========================
   PRELOAD IMAGES
=========================== */

function preloadImages(){

Object.values(TOUR.locations).forEach(location=>{

const img=new Image();

img.src=location.image.replace("#","../images/science/")+".jpg";

});

}


/* ===========================
   START PRELOAD
=========================== */

preloadImages();
/*=====================================================
    PART 3B
    USER INTERACTION
======================================================*/


/* ===========================
   SIDEBAR CLICK EVENTS
=========================== */

locations.forEach(location=>{

    location.addEventListener("click",()=>{

        const target=location.dataset.id;

        if(target===TOUR.current) return;

        playTransition(target);

    });

});


/* ===========================
   MOBILE SIDEBAR
=========================== */

let toggleButton=document.getElementById("toggleSidebar");

if(toggleButton){

    toggleButton.addEventListener("click",()=>{

        sidebar.classList.toggle("open");

    });

}


/* ===========================
   CLOSE SIDEBAR AFTER SELECT
=========================== */

locations.forEach(location=>{

    location.addEventListener("click",()=>{

        if(window.innerWidth<900){

            sidebar.classList.remove("open");

        }

    });

});


/* ===========================
   HOME BUTTON
=========================== */

const homeButton=document.getElementById("homeButton");

if(homeButton){

    homeButton.addEventListener("click",()=>{

        window.location.href="../vr.html";

    });

}


/* ===========================
   KEYBOARD SHORTCUTS
=========================== */

document.addEventListener("keydown",(event)=>{

    switch(event.key){

        case "Escape":

            sidebar.classList.remove("open");

            break;

        case "ArrowRight":

            nextLocation();

            break;

        case "ArrowLeft":

            previousLocation();

            break;

        case "f":

        case "F":

            toggleFullscreen();

            break;

    }

});


/* ===========================
   NEXT PANORAMA
=========================== */

function nextLocation(){

    const ids=Object.keys(TOUR.locations);

    let index=ids.indexOf(TOUR.current);

    index++;

    if(index>=ids.length){

        index=0;

    }

    playTransition(ids[index]);

}


/* ===========================
   PREVIOUS PANORAMA
=========================== */

function previousLocation(){

    const ids=Object.keys(TOUR.locations);

    let index=ids.indexOf(TOUR.current);

    index--;

    if(index<0){

        index=ids.length-1;

    }

    playTransition(ids[index]);

}


/* ===========================
   FULLSCREEN
=========================== */

function toggleFullscreen(){

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }

    else{

        document.exitFullscreen();

    }

}


/* ===========================
   DOUBLE CLICK FULLSCREEN
=========================== */

viewer.addEventListener("dblclick",()=>{

    toggleFullscreen();

});


/* ===========================
   SPACE BAR
=========================== */

document.addEventListener("keydown",(event)=>{

    if(event.code==="Space"){

        event.preventDefault();

        if(video.paused){

            video.play();

        }

        else{

            video.pause();

        }

    }

});


/* ===========================
   WINDOW RESIZE
=========================== */

window.addEventListener("resize",()=>{

    if(window.innerWidth>900){

        sidebar.classList.remove("open");

    }

});


/* ===========================
   SWIPE SUPPORT
=========================== */

let touchStartX=0;

let touchEndX=0;

viewer.addEventListener("touchstart",(event)=>{

    touchStartX=event.changedTouches[0].screenX;

});

viewer.addEventListener("touchend",(event)=>{

    touchEndX=event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe(){

    if(touchEndX-touchStartX>120){

        previousLocation();

    }

    if(touchStartX-touchEndX>120){

        nextLocation();

    }

}


/* ===========================
   IMAGE PRELOAD
=========================== */

Object.values(TOUR.locations).forEach(location=>{

    const img=new Image();

    img.src=location.image.replace("#","../images/science/")+".jpg";

});


/* ===========================
   VIDEO PRELOAD
=========================== */

Object.values(TOUR.locations).forEach(location=>{

    const preload=document.createElement("video");

    preload.src=location.transition;

    preload.preload="auto";

});


/* ===========================
   READY
=========================== */

console.log("Science Engine Loaded");
/*=====================================================
        PART 3C
        HOTSPOTS + INFO PANEL
=====================================================*/


/* ===========================
   REFERENCES
=========================== */

const hotspotContainer=document.getElementById("hotspots");

const locationTitle=document.getElementById("locationTitle");

const locationDescription=document.getElementById("locationDescription");


/* ===========================
   HOTSPOT DATABASE
=========================== */

TOUR.locations.entrance.description=
"Main entrance of the Science Block.";

TOUR.locations.entrance.hotspots=[

{
target:"corridor",
position:"0 1.6 -4",
rotation:"0 0 0"
}

];


TOUR.locations.corridor.description=
"Central corridor connecting all laboratories.";

TOUR.locations.corridor.hotspots=[

{
target:"entrance",
position:"0 1.6 4",
rotation:"0 180 0"
},

{
target:"physics",
position:"4 1.6 0",
rotation:"0 -90 0"
},

{
target:"chemistry",
position:"-4 1.6 0",
rotation:"0 90 0"
}

];


TOUR.locations.physics.description=
"Physics Laboratory equipped with modern instruments.";

TOUR.locations.physics.hotspots=[

{
target:"corridor",
position:"0 1.6 4",
rotation:"0 180 0"
},

{
target:"computer",
position:"0 1.6 -4",
rotation:"0 0 0"
}

];


TOUR.locations.chemistry.description=
"Chemistry Laboratory for practical experiments.";

TOUR.locations.chemistry.hotspots=[

{
target:"corridor",
position:"0 1.6 4",
rotation:"0 180 0"
}

];


TOUR.locations.computer.description=
"Computer Laboratory with high-performance systems.";

TOUR.locations.computer.hotspots=[

{
target:"physics",
position:"0 1.6 4",
rotation:"0 180 0"
}

];


/* ===========================
   UPDATE INFO PANEL
=========================== */

function updateInfo(location){

locationTitle.innerHTML=location.title;

locationDescription.innerHTML=location.description;

}


/* ===========================
   REMOVE HOTSPOTS
=========================== */

function clearHotspots(){

while(hotspotContainer.firstChild){

hotspotContainer.removeChild(

hotspotContainer.firstChild

);

}

}


/* ===========================
   CREATE HOTSPOTS
=========================== */

function buildHotspots(location){

clearHotspots();

location.hotspots.forEach(h=>{

const arrow=document.createElement("a-image");

arrow.setAttribute("src","#arrowTexture");

arrow.setAttribute("position",h.position);

arrow.setAttribute("rotation",h.rotation);

arrow.setAttribute("width","0.9");

arrow.setAttribute("height","0.9");

arrow.setAttribute("class","clickable");

arrow.setAttribute("look-at","#cameraRig");

arrow.setAttribute(

"animation",

"property:scale;from:1 1 1;to:1.25 1.25 1.25;dir:alternate;loop:true;dur:700"

);

arrow.addEventListener("mouseenter",()=>{

arrow.setAttribute(

"scale",

"1.4 1.4 1.4"

);

});

arrow.addEventListener("mouseleave",()=>{

arrow.setAttribute(

"scale",

"1 1 1"

);

});

arrow.addEventListener("click",()=>{

playTransition(h.target);

});

hotspotContainer.appendChild(arrow);

});

}


/* ===========================
   OVERRIDE LOAD PANORAMA
=========================== */

const originalLoad=loadPanorama;

loadPanorama=function(id){

originalLoad(id);

const location=TOUR.locations[id];

updateInfo(location);

buildHotspots(location);

};


/* ===========================
   FADE TRANSITION
=========================== */

function fadeScene(callback){

const fade=document.getElementById("fade");

if(!fade){

callback();

return;

}

fade.style.opacity="1";

setTimeout(()=>{

callback();

fade.style.opacity="0";

},500);

}


/* ===========================
   IMPROVED TRANSITION
=========================== */

const oldTransition=playTransition;

playTransition=function(target){

fadeScene(()=>{

oldTransition(target);

});

};


/* ===========================
   HOTSPOT READY
=========================== */

console.log("Hotspot Engine Loaded");
/*=====================================================
        PART 3D
        PROFESSIONAL FEATURES
=====================================================*/


/* ==========================================
   MINI MAP
========================================== */

const currentLocation =
document.getElementById("currentLocation");

function updateMiniMap(){

    if(currentLocation){

        currentLocation.innerHTML =
        TOUR.locations[TOUR.current].title;

    }

}


/* ==========================================
   CAMERA
========================================== */

const cameraRig =
document.getElementById("cameraRig");

function faceForward(){

    if(!cameraRig) return;

    cameraRig.setAttribute(
        "rotation",
        "0 0 0"
    );

}


/* ==========================================
   HISTORY
========================================== */

const historyStack=[];

const oldLoadPanorama=loadPanorama;

loadPanorama=function(id){

    historyStack.push(id);

    oldLoadPanorama(id);

    updateMiniMap();

    faceForward();

}


/* ==========================================
   BACK BUTTON
========================================== */

const backButton =
document.getElementById("backButton");

if(backButton){

backButton.onclick=function(){

    if(historyStack.length<=1) return;

    historyStack.pop();

    const previous=
    historyStack.pop();

    loadPanorama(previous);

};

}


/* ==========================================
   NUMBER KEYS
========================================== */

document.addEventListener("keydown",(e)=>{

const ids=Object.keys(TOUR.locations);

const number=parseInt(e.key);

if(isNaN(number)) return;

if(number===0) return;

if(number>ids.length) return;

playTransition(ids[number-1]);

});


/* ==========================================
   AUTO PRELOAD NEXT IMAGE
========================================== */

function preloadNext(){

const ids=Object.keys(TOUR.locations);

let index=ids.indexOf(TOUR.current);

index++;

if(index>=ids.length) return;

const img=new Image();

img.src=TOUR.locations[
ids[index]
].image
.replace("#","../images/science/")
+".jpg";

}


/* ==========================================
   OVERRIDE LOAD
========================================== */

const loadAgain=loadPanorama;

loadPanorama=function(id){

loadAgain(id);

preloadNext();

};


/* ==========================================
   SIDEBAR AUTO HIDE
========================================== */

function hideSidebar(){

if(window.innerWidth<900){

sidebar.classList.remove("open");

}

}

locations.forEach(item=>{

item.addEventListener(

"click",

hideSidebar

);

});


/* ==========================================
   LOADING INDICATOR
========================================== */

function showLoader(){

loader.style.display="flex";

loader.style.opacity="1";

}

function hideLoader(){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}


/* ==========================================
   BETTER TRANSITION
========================================== */

const transitionOld=
playTransition;

playTransition=function(target){

showLoader();

transitionOld(target);

video.onended=function(){

hideLoader();

videoContainer.style.display="none";

loadPanorama(target);

};

};


/* ==========================================
   HOTSPOT ANIMATION
========================================== */

setInterval(()=>{

const arrows=
document.querySelectorAll("a-image");

arrows.forEach(a=>{

a.emit("pulse");

});

},1200);


/* ==========================================
   RIGHT CLICK DISABLED
========================================== */

document.addEventListener(

"contextmenu",

e=>e.preventDefault()

);


/* ==========================================
   DRAG & DROP
========================================== */

window.addEventListener(

"dragover",

e=>e.preventDefault()

);

window.addEventListener(

"drop",

e=>e.preventDefault()

);


/* ==========================================
   MOBILE
========================================== */

if(/Android|iPhone|iPad/i.test(

navigator.userAgent

)){

console.log(

"Mobile Device Detected"

);

}


/* ==========================================
   READY
========================================== */

console.log(
"Science VR Tour Ready"
);
