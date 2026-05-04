document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  // Sécurité
  if (!track || slides.length === 0 || !nextBtn || !prevBtn) return; 

  let index = 0;
  const slideCount = slides.length;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % slideCount;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slideCount) % slideCount; 
    showSlide(index);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  function stopAutoScroll() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoScroll() {
    if (!prefersReducedMotion && !intervalId) {
      intervalId = setInterval(nextSlide, 5000);
    }
  }

  // Défilement automatique
  let intervalId = null;
  startAutoScroll();

  // Stopper le défilement au survol
  const carousel = track.closest('.carousel');
  if(carousel) {
      carousel.addEventListener('mouseenter', stopAutoScroll);
      carousel.addEventListener('mouseleave', startAutoScroll);
  }

  // Accessibilité clavier
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    }
    if (event.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Evite de faire tourner le carousel en onglet inactif
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });
});