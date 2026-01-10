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

  // Gallery Lightbox
  const initLightbox = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImage = document.querySelector('.lightbox-image');
    const modalTitle = document.querySelector('.lightbox-title');
    const modalSubtitle = document.querySelector('.lightbox-subtitle');
    const modalCounter = document.querySelector('.lightbox-counter');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!modal || galleryItems.length === 0) return;

    let currentIndex = 0;

    const openModal = (index) => {
      currentIndex = index;
      updateModalContent();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    const updateModalContent = () => {
      const item = galleryItems[currentIndex];
      const img = item.querySelector('img');
      const title = item.querySelector('h3').textContent;

      modalImage.src = img.src;
      modalTitle.textContent = title;
      // You can add subtitles or categories if available
      modalSubtitle.textContent = 'Healthcare Facility';
      modalCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateModalContent();
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateModalContent();
    };

    // Event Listeners
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  };

  initLightbox();

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
