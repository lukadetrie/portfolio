document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  // Sécurité
  if (!track || slides.length === 0 || !nextBtn || !prevBtn) return; 

  let index = 0;
  const slideCount = slides.length;

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

  // Défilement automatique
  let intervalId = setInterval(nextSlide, 5000);

  // Stopper le défilement au survol
  const carousel = track.closest('.carousel');
  if(carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
      carousel.addEventListener('mouseleave', () => {
          intervalId = setInterval(nextSlide, 5000);
      });
  }
});