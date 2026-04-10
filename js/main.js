let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
document.getElementById('totalSlides').textContent = totalSlides;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'previous');
    if (i === index) slide.classList.add('active');
    else if (i < index) slide.classList.add('previous');
  });
  document.getElementById('currentSlide').textContent = index + 1;
  document.getElementById('prevBtn').disabled = index === 0;
  document.getElementById('nextBtn').disabled = index === totalSlides - 1;
}

function nextSlide() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    showSlide(currentIndex);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    prevSlide();
  } else if (e.key === 'Home') {
    e.preventDefault();
    currentIndex = 0;
    showSlide(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    currentIndex = totalSlides - 1;
    showSlide(currentIndex);
  }
});

document.getElementById('stage').addEventListener('click', (e) => {
  if (e.target.closest('.nav-controls')) return;
  nextSlide();
});

// Touch/swipe support for mobile
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) nextSlide();
    else prevSlide();
  }
});

showSlide(0);
