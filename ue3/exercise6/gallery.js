function showImg(e) {
   document.querySelector("#displayDIV .bigIMG").src=e.target.dataset.large;
   document.querySelector("#displayDIV .desc").innerHTML=e.target.alt;
   document.getElementById("displayDIV").style.display="block";
}

function hideImg(e) {
   if (e.currentTarget != e.target) return;
   e.currentTarget.style.display="none";
}

let imagesLarge = ["hk.JPG", "street.JPG", "taichung.JPG"];

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


buttonBack = document.createElement("button");
buttonBack.innerHTML = "Back";
buttonNext = document.createElement("button");
buttonNext.innerHTML = "Next";

document.getElementById("displayDIV").appendChild(buttonBack);
document.getElementById("displayDIV").appendChild(buttonNext);

buttonBack.addEventListener("click", backImg);
buttonNext.addEventListener("click", nextImg);
