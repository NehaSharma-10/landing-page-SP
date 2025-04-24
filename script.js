const track = document.querySelector(".carousel-track");
const items = Array.from(document.querySelectorAll(".carousel-item"));
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

// Create dots
items.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

// Autoplay
let autoplayInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}, 5000);

// Pause on hover
track.addEventListener("mouseover", () => clearInterval(autoplayInterval));
track.addEventListener("mouseout", () => {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }, 5000);
});

// Swipe Support
let startX = 0;
track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
track.addEventListener("touchend", (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50) nextBtn.click();
  else if (diff < -50) prevBtn.click();
});

// Init
updateCarousel();
// play - video - 2;
const videoButtons = document.querySelectorAll(".play-video");
const modal = document.getElementById("video-modal");
const videoFrame = document.getElementById("video-frame");
const closeBtn = document.querySelector(".close-button");

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoUrl = button.getAttribute("data-video");
    modal.style.display = "flex";
    videoFrame.src = videoUrl;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  videoFrame.src = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    videoFrame.src = "";
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    const fieldsToValidate = [
      {
        id: "firstName",
        message: "This field can’t be empty. Please fill it in.",
      },
      {
        id: "lastName",
        message: "This field can’t be empty. Please fill it in.",
      },
      { id: "email", message: "Please enter a valid email address." },
      {
        id: "company",
        message: "This field can’t be empty. Please fill it in.",
      },
      { id: "country", message: "Please select a country." },
    ];

    fieldsToValidate.forEach(({ id, message }) => {
      const field = document.getElementById(id);
      const errorMsg = field.parentElement.querySelector(".error-msg");

      // Reset error message
      errorMsg.textContent = message;
      errorMsg.style.display = "none";

      // Check validation
      if (field.value.trim() === "") {
        showError(field, errorMsg);
        isValid = false;
      }

      // Special email validation
      if (
        id === "email" &&
        field.value.trim() !== "" &&
        !validateEmail(field.value)
      ) {
        errorMsg.textContent = message;
        showError(field, errorMsg);
        isValid = false;
      }
    });

    if (isValid) {
      setTimeout(() => {
        window.location.href = "thankyoupage.html";
      }, 1000);
    }
  });

// Add input listeners to clear errors
document
  .querySelectorAll(".floating-input input, .floating-select")
  .forEach((field) => {
    field.addEventListener("input", () => {
      const errorMsg = field.parentElement.querySelector(".error-msg");
      errorMsg.style.display = "none";
      field.classList.remove("input-error");
    });
  });

function showError(field, errorMsg) {
  errorMsg.style.display = "block";
  field.classList.add("input-error");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document
  .querySelectorAll(".floating-input input, .floating-select")
  .forEach((field) => {
    field.addEventListener("input", () => {
      const errorMsg = field.parentElement.querySelector(".error-msg");
      errorMsg.style.display = "none";
      field.classList.remove("input-error");
    });
  });

document
  .querySelectorAll(".floating-input input, .floating-input select")
  .forEach((field) => {
    field.addEventListener("input", () => {
      const errorMsg = field.parentElement.querySelector(".error-msg");
      errorMsg.style.display = "none";
      field.classList.remove("input-error");
    });
  });

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});
