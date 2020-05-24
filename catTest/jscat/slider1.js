var slides = document.querySelectorAll('#slides1 .slide1');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);
 
function nextSlide() {
    slides[currentSlide].className = 'slide1';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide1 showing1';
}