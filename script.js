// ===== Mobile Menu =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  // Toggle menu on click
  menuToggle.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    menuToggle.textContent = isActive ? "✖" : "☰";
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = "☰"; // Reset icon
    });
  });

  // Close menu if clicking outside of it
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.textContent = "☰"; // Reset icon
      }
    }
  });
}

// ===== Contact Modal =====
const contactToggle = document.getElementById('contact-toggle');
const contactModal = document.getElementById('contact-modal');
const contactClose = document.getElementById('close-modal');

// ===== Thank You Modal =====
const thankYouModal = document.getElementById("thankYouModal");
const closeThankYou = document.getElementById("closeThankYou");

if (thankYouModal) thankYouModal.hidden = true;

// Open contact modal
if (contactToggle && contactModal) {
  contactToggle.addEventListener('click', () => {
    contactModal.hidden = false;
    contactToggle.setAttribute('aria-expanded', 'true');
  });
}

// Close contact modal
if (contactClose && contactModal) {
  contactClose.addEventListener('click', () => {
    contactModal.hidden = true;
    contactToggle.setAttribute('aria-expanded', 'false');
  });

  // Close when clicking backdrop
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.hidden = true;
      contactToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !contactModal.hidden) {
      contactModal.hidden = true;
      contactToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== Contact Form & Telegram Integration =====
const contactForm = document.querySelector("#contact-section form");
const returnHome = document.getElementById("return-home");

if (thankYouModal) thankYouModal.hidden = true;

// Handle form submit
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      number: contactForm.number.value,
      message: contactForm.message.value
    };

    try {
      const response = await fetch('https://rvistech.rishi2kita.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // console.log("Message sent:", data);

      // Close contact modal
      if (contactModal) contactModal.hidden = true;
      if (contactToggle) contactToggle.setAttribute('aria-expanded', 'false');

      // Show Thank You modal
      if (thankYouModal) thankYouModal.hidden = false;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
}

// Close Thank You modal
if (closeThankYou && thankYouModal) {
  closeThankYou.addEventListener("click", () => {
    thankYouModal.hidden = true;
  });
}

// Return to top from Thank You modal
if (returnHome && thankYouModal) {
  returnHome.addEventListener("click", (e) => {
    e.preventDefault();             // Prevent page reload
    thankYouModal.hidden = true;    // Close the Thank You popup
    window.scrollTo({               // Scroll to top smoothly
      top: 0,
      behavior: "smooth"
    });
  });
}

// ===== Organic Farming Dialog =====
const organicDialog = document.getElementById('organicModal');
const secondaryTrigger = document.getElementById('open-organic-from-other');

function closeModal() {
  if (organicDialog && typeof organicDialog.close === 'function') {
    organicDialog.close();
  }
}
window.closeModal = closeModal; // expose for inline onclick

function openOrganic() {
  if (organicDialog && typeof organicDialog.showModal === 'function') {
    organicDialog.showModal();
  }
}
window.openOrganic = openOrganic; 
if (secondaryTrigger) {
  secondaryTrigger.addEventListener('click', openOrganic);
}

// Open via text span or button
document.querySelectorAll('.modal-trigger').forEach(el => {
  el.addEventListener('click', () => {
    openedByClick = true;
    organicDialog.showModal();
  });
});


const testBtn = document.getElementById('testModalBtn');
if (testBtn) testBtn.addEventListener('click', openOrganic);

// ===== Carousel =====
const slides = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Auto slide every 3 seconds
if (slides.length > 0) {
  setInterval(nextSlide, 3000);

  document.getElementById('hero')?.addEventListener('click', nextSlide);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }
  });
}

// ===== Scroll to Top Logo =====
const logo = document.getElementById("logo");
logo?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Close mobile menu if open
  navLinks?.classList.remove("active");
  menuToggle.textContent = "☰";
});

