const imageFolder = 'img/'; 
const imageList = ['apt.jpg', 'aptn.jpg', 'bcg.jpg'];
let currentIndex = 0;

const imageElement = document.getElementById('image');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

function showImage(index) {
    const imageUrl = imageFolder + imageList[index];
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
