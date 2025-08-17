// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle?.addEventListener("click", () => {
    const isActive = navLinks?.classList.toggle("active");
    menuToggle.textContent = isActive ? "✖" : "☰";
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

// Contact modal
const contactToggle = document.getElementById('contact-toggle');
const contactModal = document.getElementById('contact-modal');
const contactClose = document.getElementById('close-modal');

if (contactToggle && contactModal) {
  contactToggle.addEventListener('click', () => {
    contactModal.hidden = false;
    contactToggle.setAttribute('aria-expanded', 'true');
  });
}

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

// Organic Farming dialog
const organicDialog = document.getElementById('organicModal');

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

// Open via text span or button
document.querySelectorAll('.modal-trigger').forEach(el => {
  el.addEventListener('click', openOrganic);
});
const testBtn = document.getElementById('testModalBtn');
if (testBtn) testBtn.addEventListener('click', openOrganic);

 // Carousel
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

const logo = document.getElementById("logo");
logo?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  // If menu was open on mobile, close it
  navLinks?.classList.remove("active");
  menuToggle.textContent = "☰";
});

  // Auto slide every 3 seconds
  setInterval(nextSlide, 3000);

function next() {
  index = (index + 1) % slides.length;
  show(index);
}
function prev() {
  index = (index - 1 + slides.length) % slides.length;
  show(index);
}
if (slides.length > 0) {
  document.getElementById('hero')?.addEventListener('click', next);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

