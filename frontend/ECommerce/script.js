// Ensure all code runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Toggle mobile menu
  function toggleMenu() {
    const menu = document.getElementById("menu-options");
    if (menu) {
      menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }
  }

  // Menu icon click handler
  const menuIcon = document.getElementById('menu-icon');
  const menuOptions = document.getElementById('menu-options');

  if (menuIcon && menuOptions) {
    menuIcon.addEventListener('click', toggleMenu);

    // Optional: hide menu when clicking on menu options
    menuOptions.addEventListener('click', () => {
      menuOptions.style.display = (menuOptions.style.display === 'block') ? 'none' : 'block';
    });
  }

  // Update cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }
  updateCartCount();

  // Handle contact form submission
  async function handleContactFormSubmit(e) {
    e.preventDefault();
    const formStatus = document.getElementById('form-status');
    const submitBtn = e.target.querySelector('.btn-submit');

    if (!submitBtn || !formStatus) return;

    // Get form data
    const formData = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      subject: document.getElementById('subject')?.value || '',
      message: document.getElementById('message')?.value || '',
      timestamp: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/hassanshaikh77866@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `HANJEC Contact Form: ${formData.subject}`,
          message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}

Submitted at: ${new Date(formData.timestamp).toLocaleString()}
          `,
          _subject: `New Contact Form Submission from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
        e.target.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      formStatus.className = 'form-status error';
      formStatus.textContent = '✗ Sorry, there was an error sending your message. Please try again or email us directly at support@hanjec.com';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

      // Hide status after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }
  }

  // Attach form handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }

});
