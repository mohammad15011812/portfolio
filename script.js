const sections = document.querySelectorAll('.section');
let currentSection = 0;

function nextSection() {
  sections[currentSection].classList.remove('active');
  currentSection++;
  if (currentSection < sections.length) {
    sections[currentSection].classList.add('active');
  }
}

/* Image fade slideshow */
const slides = document.querySelectorAll('.slide');
let slideIndex = 0;

setInterval(() => {
  slides[slideIndex].classList.remove('active-img');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active-img');
}, 2500);
