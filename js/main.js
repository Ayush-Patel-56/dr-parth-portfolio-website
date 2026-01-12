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
        const phoneNumber = "918433759077"; // Doctor's number

        // Professional formatted message
        const rawText = `*New Inquiry from Website*\n\n` +
          `*Name:* ${nameInput.value}\n` +
          `*Email:* ${emailInput.value}\n\n` +
          `*Message:*\n${messageInput.value}`;

        const encodedText = encodeURIComponent(rawText);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        // Detect Mobile Device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
          window.location.href = whatsappUrl;
        } else {
          window.open(whatsappUrl, '_blank');
        }
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
      }, 1500);
    });
  };

  initContactForm();


  // Certificate Lightbox
  const initLightbox = () => {
    const lightbox = document.getElementById('certLightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const certCards = document.querySelectorAll('.cert-card');

    const openLightbox = (imgSrc) => {
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300); // Clear after transition
      document.body.style.overflow = '';
    };

    // Card Click Events
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.cert-image');
        if (img) {
          openLightbox(img.src);
        }
      });
    });

    // Close Events
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  };

  initLightbox();
  initContactForm();

  const initCertificateLightbox = () => {
    const lightbox = document.getElementById('certLightbox');
    if (!lightbox) return;

    const imgEl = lightbox.querySelector('.cert-lightbox-image');
    const closeBtn = lightbox.querySelector('.cert-lightbox-close');
    const cards = document.querySelectorAll('.cert-gallery-card');

    const open = (src) => {
      if (!imgEl) return;
      imgEl.src = src;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (imgEl) {
        setTimeout(() => {
          imgEl.src = '';
        }, 250);
      }
    };

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const src = card.getAttribute('data-cert-src');
        if (src) open(src);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        close();
      }
    });
  };

  initCertificateLightbox();
});
