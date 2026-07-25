/*=========================================================
        ST. JOSEPH'S UNIVERSITY
        SCIENCE BLOCK V2
=========================================================*/


/*=========================================================
                    DOM ELEMENTS
=========================================================*/

const introScreen = document.getElementById("introScreen");
const introVideo = document.getElementById("introVideo");

const transitionScreen = document.getElementById("transitionScreen");
const transitionVideo = document.getElementById("transitionVideo");

const sky = document.getElementById("sky");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");

const locations = document.querySelectorAll(".location");

const loadingIndicator =
document.getElementById("loadingIndicator");

const fadeLayer =
document.getElementById("fadeLayer");

const infoTitle =
document.getElementById("infoTitle");

const infoDescription =
document.getElementById("infoDescription");

const currentLocation =
document.getElementById("currentLocation");

const toggleInfo =
document.getElementById("toggleInfo");

const infoContent =
document.getElementById("infoContent");

const search =
document.getElementById("search");

const hotspotContainer =
document.getElementById("hotspots");



/*=========================================================
                    TOUR DATABASE
=========================================================*/

const TOUR = {

current:"entrance",

locations:{

entrance:{

title:"Entrance",

description:
"Main entrance of the Science Block.",

image:"../images/science/entrance.jpeg",

transition:
"../videos/science/intro.mov",

hotspots:[
{
target:"corridor",
position:"0 1.6 -4",
rotation:"0 0 0"
}
]

},

corridor:{

title:"Main Corridor",

description:
"Central corridor connecting all laboratories.",

image:"../images/science/corridor.jpeg",

transition:
"../videos/science/entrance_corridor.mov",

hotspots:[

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

]

},

physics:{

title:"Physics Laboratory",

description:
"Physics laboratory with modern equipment.",

image:"../images/science/physics.jpeg",

transition:
"../videos/science/corridor_physics.mov",

hotspots:[

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

]

},

chemistry:{

title:"Chemistry Laboratory",

description:
"Chemistry laboratory for practical experiments.",

image:"../images/science/chemistry.jpeg",

transition:
"../videos/science/physics_chemistry.mov",

hotspots:[

{
target:"corridor",
position:"0 1.6 4",
rotation:"0 180 0"
}

]

},

computer:{

title:"Computer Laboratory",

description:
"Computer laboratory with modern systems.",

image:"../images/science/computer.jpeg",

transition:
"../videos/science/chemistry_computer.mov",

hotspots:[

{
target:"physics",
position:"0 1.6 4",
rotation:"0 180 0"
}

]

}

}

};



/*=========================================================
                LOADING FUNCTIONS
=========================================================*/

function showLoader(){

loadingIndicator.style.display="flex";

}

function hideLoader(){

loadingIndicator.style.display="none";

}



/*=========================================================
                FADE FUNCTIONS
=========================================================*/

function fadeIn(){

fadeLayer.style.opacity=0;

}

function fadeOut(){

fadeLayer.style.opacity=1;

}



/*=========================================================
                INTRO VIDEO
=========================================================*/

window.addEventListener("load",()=>{

introVideo.play();

});


introVideo.onended=()=>{

introScreen.style.display="none";

loadPanorama("entrance");

};



/*=========================================================
                UPDATE UI
=========================================================*/

function updateUI(location){

infoTitle.innerHTML=
location.title;

infoDescription.innerHTML=
location.description;

currentLocation.innerHTML=
location.title;

locations.forEach(item=>{

item.classList.remove("active");

if(item.dataset.id===TOUR.current){

item.classList.add("active");

}

});

}/*=========================================================
                LOAD PANORAMA
=========================================================*/

function loadPanorama(id){

    if(!TOUR.locations[id]) return;

    showLoader();

    fadeOut();

    const location = TOUR.locations[id];

    TOUR.current = id;

    // Create an image to preload
    const img = new Image();

    img.src = location.image;

    img.onload = ()=>{

        sky.setAttribute("src", location.image);

        updateUI(location);

        createHotspots(location);

        setTimeout(()=>{

            fadeIn();

            hideLoader();

        },300);

    };

    img.onerror = ()=>{

        hideLoader();

        alert("Unable to load panorama.");

    };

}

/*=========================================================
            CREATE HOTSPOTS
=========================================================*/

function createHotspots(location){

    hotspotContainer.innerHTML = "";

    location.hotspots.forEach(point=>{

        const arrow =
        document.createElement("a-image");

        arrow.setAttribute(
            "src",
            "../icons/arrow.png"
        );

        arrow.setAttribute(
            "position",
            point.position
        );

        arrow.setAttribute(
            "rotation",
            point.rotation
        );

        arrow.setAttribute(
            "width",
            "0.9"
        );

        arrow.setAttribute(
            "height",
            "0.9"
        );

        arrow.setAttribute(
            "class",
            "hotspot"
        );

        arrow.addEventListener("click",()=>{

            goToLocation(point.target);

        });

        hotspotContainer.appendChild(arrow);

    });

}

/*=========================================================
            GO TO LOCATION
=========================================================*/

function goToLocation(id){

    const destination = TOUR.locations[id];

    if(!destination) return;

    transitionScreen.style.display="flex";

    transitionVideo.src = destination.transition;

    transitionVideo.currentTime = 0;

    transitionVideo.play();

transitionVideo.play();

transitionVideo.onended = ()=>{

    transitionScreen.style.display="none";

    loadPanorama(id);

};       

}

/*=========================================================
            SIDEBAR NAVIGATION
=========================================================*/

locations.forEach(item=>{

    item.addEventListener("click",()=>{

        const id = item.dataset.id;

        if(id !== TOUR.current){

            goToLocation(id);

        }

    });

});

/*=========================================================
            SEARCH FILTER
=========================================================*/

search.addEventListener("keyup",()=>{

    const keyword =
    search.value.toLowerCase();

    locations.forEach(item=>{

        const text =
        item.innerText.toLowerCase();

        item.style.display =
        text.includes(keyword)
        ? "flex"
        : "none";

    });

});
/*=========================================================
                INFO PANEL
=========================================================*/

let infoCollapsed = false;

toggleInfo.addEventListener("click",()=>{

    infoCollapsed = !infoCollapsed;

    if(infoCollapsed){

        infoContent.style.display = "none";
        toggleInfo.innerHTML = "+";

    }else{

        infoContent.style.display = "block";
        toggleInfo.innerHTML = "−";

    }

});


/*=========================================================
                MOBILE SIDEBAR
=========================================================*/

menuBtn.addEventListener("click",()=>{

    sidebar.classList.toggle("open");

    menuOverlay.classList.toggle("show");

});

menuOverlay.addEventListener("click",()=>{

    sidebar.classList.remove("open");

    menuOverlay.classList.remove("show");

});


locations.forEach(item=>{

    item.addEventListener("click",()=>{

        sidebar.classList.remove("open");

        menuOverlay.classList.remove("show");

    });

});


/*=========================================================
                KEYBOARD SHORTCUTS
=========================================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "Escape":

            sidebar.classList.remove("open");
            menuOverlay.classList.remove("show");

        break;

        case "i":
        case "I":

            toggleInfo.click();

        break;

    }

});


/*=========================================================
                HOTSPOT ANIMATION
=========================================================*/

setInterval(()=>{

    document
    .querySelectorAll(".hotspot")
    .forEach(h=>{

        h.object3D.scale.set(1,1,1);

        setTimeout(()=>{

            h.object3D.scale.set(1.2,1.2,1.2);

        },300);

    });

},1200);


/*=========================================================
                TRANSITION VIDEO ERROR
=========================================================*/

transitionVideo.onerror = ()=>{

    transitionScreen.style.display="none";

    loadPanorama(TOUR.current);

};


/*=========================================================
                IMAGE CACHE
=========================================================*/

const cache = {};

function preloadImage(src){

    if(cache[src]) return;

    const img = new Image();

    img.src = src;

    cache[src] = img;

}

Object.values(TOUR.locations).forEach(location=>{

    preloadImage(location.image);

});


/*=========================================================
                PRELOAD NEXT LOCATION
=========================================================*/

function preloadNext(){

    const current = TOUR.locations[TOUR.current];

    if(!current.hotspots.length) return;

    const next = current.hotspots[0].target;

    if(next){

        preloadImage(

            TOUR.locations[next].image

        );

    }

}


/*=========================================================
                LOAD MODIFICATION
=========================================================*/

const originalLoad = loadPanorama;

loadPanorama = function(id){

    originalLoad(id);

    setTimeout(preloadNext,500);

};


/*=========================================================
                MOBILE ORIENTATION
=========================================================*/

window.addEventListener("orientationchange",()=>{

    setTimeout(()=>{

        window.dispatchEvent(

            new Event("resize")

        );

    },300);

});


/*=========================================================
                PERFORMANCE
=========================================================*/

window.addEventListener("blur",()=>{

    transitionVideo.pause();

});

window.addEventListener("focus",()=>{

    if(

        transitionScreen.style.display==="flex"

    ){

        transitionVideo.play();

    }

});


/*=========================================================
                STARTUP
=========================================================*/

console.log(

"%cScience Block V2 Loaded",

"color:#2563eb;font-size:18px;font-weight:bold;"

);

console.log(

"Panoramas :",

Object.keys(TOUR.locations).length

);

console.log(

"Ready for Tour."

);
