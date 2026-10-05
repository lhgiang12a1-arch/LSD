for (let i = 0; i < 1000; i++) {
  console.error(i + ".Xuân Triều 😡😡");
}

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const totalSlides = slides.length;

const counterEl = document.getElementById("current-slide-num");
const notesPanel = document.getElementById("notes-panel");
const notesContent = document.getElementById("notes-content");

function updateSlide() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentSlide) {
      slide.classList.add("active");
    }
  });
  counterEl.innerText = currentSlide + 1;
  updateNotes();
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

function toggleNotes() {
  notesPanel.classList.toggle("open");
  updateNotes();
}

function updateNotes() {
  const currentNotes = slides[currentSlide].getAttribute("data-notes");
  if (currentNotes) {
    notesContent.innerText = currentNotes;
  } else {
    notesContent.innerText = "(Slide này không có ghi chú.)";
  }
}

// Bắt sự kiện bàn phím (Mũi tên Trái/Phải)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

// Init
updateSlide();

// Responsive scaling
function resizePresentation() {
  const container = document.querySelector(".presentation-container");
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const containerWidth = 1280;
  const containerHeight = 720;

  const scaleX = windowWidth / containerWidth;
  const scaleY = windowHeight / containerHeight;
  
  // Scale to fit screen exactly, like PPTX (no margin)
  const scale = Math.min(scaleX, scaleY);

  container.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("resize", resizePresentation);
resizePresentation();

// Swipe navigation for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left (next)
    nextSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right (previous)
    prevSlide();
  }
}
