function showImg(e) {
   document.querySelector("#displayDIV .bigIMG").src=e.target.dataset.large;
   document.querySelector("#displayDIV .desc").innerHTML=e.target.alt;
   document.getElementById("displayDIV").style.display="block";
}

function hideImg(e) {
   if (e.currentTarget != e.target) return;
   e.currentTarget.style.display="none";
}


let imagesLarge = [];

let gallery = document.getElementsByClassName("gallery")[0];
for (let i = 0; i < gallery.children.length; i++) {
   imagesLarge.push(gallery.children[i].dataset.large);
}

function nextImg() {
   let currentSrc = document.querySelector("#displayDIV .bigIMG").getAttribute("src")
   nextIndex = (imagesLarge.indexOf(currentSrc) + 1 + 3) % 3;
   document.querySelector("#displayDIV .bigIMG").src = imagesLarge[nextIndex]
}

function backImg() {
   let currentSrc = document.querySelector("#displayDIV .bigIMG").getAttribute("src")
   nextIndex = (imagesLarge.indexOf(currentSrc) - 1 + 3) % 3;
   document.querySelector("#displayDIV .bigIMG").src = imagesLarge[nextIndex]
}

let images = document.querySelectorAll('.gallery img');
for (let i=0; i< images.length; i++) {
   images[i].addEventListener("click", showImg);
}
document.getElementById("displayDIV").addEventListener("click", hideImg);


function playSlideshow() {
   slideshowInterval = setInterval(nextImg, 2000);
}

function pauseSlideshow() {
   clearInterval(slideshowInterval);
}

buttonBack = document.createElement("button");
buttonBack.innerHTML = "Back";
buttonNext = document.createElement("button");
buttonNext.innerHTML = "Next";

playButton = document.createElement("button");
playButton.innerHTML = "Play Slideshow";
pauseButton = document.createElement("button");
pauseButton.innerHTML = "Pause Slideshow";


document.getElementById("displayDIV").appendChild(buttonBack);
document.getElementById("displayDIV").appendChild(buttonNext);
document.getElementById("displayDIV").appendChild(document.createElement("br"));
document.getElementById("displayDIV").appendChild(playButton);
document.getElementById("displayDIV").appendChild(pauseButton);


buttonBack.addEventListener("click", backImg);
buttonNext.addEventListener("click", nextImg);
playButton.addEventListener("click", playSlideshow);
pauseButton.addEventListener("click", pauseSlideshow);

