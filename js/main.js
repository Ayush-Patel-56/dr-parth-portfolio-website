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

  // Clinic Tour Image Slider
  const initSlider = () => {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateDots = (index) => {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    };

    const goToSlide = (index) => {
      if (index < 0) {
        currentIndex = slideCount - 1;
      } else if (index >= slideCount) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots(currentIndex);
      resetAutoPlay();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto Play
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    // Initialize
    startAutoPlay();

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', startAutoPlay);
  };

  initSlider();



  // Contact Form Handling
  const initContactForm = () => {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form fields
      const nameInput = document.getElementById('fullname');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn.innerHTML;

      // Basic Validation
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill in all required fields.');
        return;
      }

      // Simulate Sending State
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // WhatsApp Integration Logic
      const sendToWhatsApp = () => {
        const phoneNumber = "918238427405"; // Doctor's number

        // Professional formatted message
        const text = `*New Inquiry from Website*` +
          `%0A%0A*Name:* ${nameInput.value}` +
          `%0A*Email:* ${emailInput.value}` +
          `%0A%0A*Message:*%0A${messageInput.value}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

        window.open(whatsappUrl, '_blank');
      };

      // Mock Submission Delay (e.g., 1.5 seconds)
      setTimeout(() => {
        // Success Action
        submitBtn.innerHTML = 'Message Sent!';
        submitBtn.style.backgroundColor = '#48bb78'; // Green color indicating success

        // Send to WhatsApp
        sendToWhatsApp();

        // Reset Form
        form.reset();

        // Revert Button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
          submitBtn.style.backgroundColor = '';
        }, 3000);

        // Show Custom Toast
        showToast(`Thank you, ${nameInput.value}! Redirecting to WhatsApp...`);
      }, 1500);
    });

    // Toast Notification Logic
    const showToast = (message) => {
      // Remove existing toast if any
      const existingToast = document.querySelector('.form-success-toast');
      if (existingToast) existingToast.remove();

      // Create new toast
      const toast = document.createElement('div');
      toast.className = 'form-success-toast';
      toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>${message}</span>
        `;

      document.body.appendChild(toast);

      // Trigger animation
      setTimeout(() => toast.classList.add('active'), 10);

      // Remove after 4 seconds
      setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 400);
      }, 4000);
    };
  };

  initContactForm();
});
