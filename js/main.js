// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
  console.log('Main JS loaded');

  // Mobile Menu Toggle
  const initMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const toggleBtn = document.querySelector('.mobile-toggle');

    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
      });
    }
  };

  initMobileMenu();
});
