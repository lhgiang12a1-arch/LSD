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
