// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
  console.log('Main JS loaded');

  // Mobile Menu Toggle
  const initMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    // We'll assume a toggle button will be added with class 'mobile-toggle'
    const toggleBtn = document.querySelector('.mobile-toggle');

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('active');
      });
    }
  };

  initMobileMenu();
});
