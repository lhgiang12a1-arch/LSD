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

// --- Script chống mở F12 / DevTools / Console (CÓ MẬT KHẨU) ---
let isDevToolsUnlocked = false;

// Bẫy debugger liên tục để cản trở console
let debuggerInterval = setInterval(function () {
  if (!isDevToolsUnlocked) {
    debugger;
  }
}, 100);

// Ngăn chuột phải & yêu cầu mật khẩu
document.addEventListener('contextmenu', event => {
  if (isDevToolsUnlocked) return; // Nếu đã mở khóa thì cho phép chuột phải bình thường

  event.preventDefault(); // Chặn chuột phải

  // Hiển thị hộp thoại nhập mật khẩu
  const password = prompt("Nhập mật khẩu để mở khóa DevTools:");
  if (password === "123456") { // Mật khẩu mặc định là 123456
    isDevToolsUnlocked = true;
    clearInterval(debuggerInterval);
    alert("Đã mở khóa DevTools thành công! Bây giờ bạn có thể chuột phải hoặc nhấn F12.");
  } else if (password !== null) {
    alert("Sai mật khẩu!");
  }
});

// Ngăn các phím tắt mở DevTools
document.addEventListener('keydown', (e) => {
  if (isDevToolsUnlocked) return; // Nếu đã mở khóa thì cho dùng phím tắt

  // F12
  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
  }
  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
    e.preventDefault();
  }
  // Ctrl+U (Xem mã nguồn)
  if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
    e.preventDefault();
  }
});
