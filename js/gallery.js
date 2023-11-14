// js/gallery.js

const imageFolder = 'img/';
let imageList = ['apt.jpg', 'aptn.jpg', 'bcg.jpg', 'favicon.png'];
let currentIndex = 0;

const imageElement = document.getElementById('image');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const homeButton = document.getElementById('home');

homeButton.addEventListener('click', function () {
    window.location.href = "index.html";
});

function showImage(index) {
    let imageUrl = imageFolder + imageList[index];
    imageElement.src = imageUrl;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageList.length;
    showImage(currentIndex);
}

prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

showImage(currentIndex);
