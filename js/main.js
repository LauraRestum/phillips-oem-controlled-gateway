let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
document.getElementById('totalSlides').textContent = totalSlides;

function buildProgressBar() {
  const bar = document.getElementById('progressBar');
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'progress-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.dataset.index = i;
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(i);
    });
    bar.appendChild(dot);
  }
}

function updateProgress(index) {
  const fill = document.getElementById('progressFill');
  fill.style.width = totalSlides > 1 ? (index / (totalSlides - 1)) * 100 + '%' : '100%';
  document.querySelectorAll('.progress-dot').forEach((dot, i) => {
    dot.classList.remove('completed', 'current');
    if (i < index) dot.classList.add('completed');
    else if (i === index) dot.classList.add('current');
  });
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'previous');
    if (i === index) slide.classList.add('active');
    else if (i < index) slide.classList.add('previous');
  });
  document.getElementById('currentSlide').textContent = index + 1;
  document.getElementById('prevBtn').disabled = index === 0;
  document.getElementById('nextBtn').disabled = index === totalSlides - 1;
  updateProgress(index);
}

function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  currentIndex = index;
  showSlide(index);
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
    goToSlide(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    goToSlide(totalSlides - 1);
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

buildProgressBar();
showSlide(0);
