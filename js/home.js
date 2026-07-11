const slides = document.querySelectorAll('.hero-slide');
if (slides.length) {
  const captions = ['Safari Villas', 'Luxury Suites', 'Archery Experiences', 'Sunset Sundowners', 'Nature Trails'];
  const dotsWrap = document.getElementById('slideDots');
  let current = 0;

  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(d);
  });

  function goToSlide(i) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.dot')[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    document.querySelectorAll('.dot')[current].classList.add('active');
    document.getElementById('heroCaption').textContent = captions[current];
  }

  setInterval(() => goToSlide((current + 1) % slides.length), 4500);

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      slides.forEach((s) => { s.style.transform = `translateY(${y * 0.15}px) scale(1.05)`; });
    }
  });
}

document.querySelectorAll('.acc-head').forEach((head) => {
  head.addEventListener('click', () => {
    const item = head.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach((i) => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
