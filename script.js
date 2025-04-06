document.addEventListener('DOMContentLoaded', function() {
  // ========== Mobile Navigation ==========
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking links
  document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
      });
  });

  // ========== Insights Functionality ==========
  const filterTabs = document.querySelectorAll('.filter-tab');
  const insightCards = document.querySelectorAll('.insight-card');
  const pageNumbers = document.querySelectorAll('.page-number');
  const nextPageBtn = document.querySelector('.next-page');
  const prevPageBtn = document.querySelector('.prev-page');
  let currentPage = 1;
  const cardsPerPage = 4;

  // Filtering functionality
  filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          filterTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          const filterValue = this.dataset.filter;
          
          insightCards.forEach(card => {
              card.style.display = (filterValue === 'all' || card.dataset.category === filterValue) 
                  ? 'block' 
                  : 'none';
          });
          
          resetPagination();
          showPage(1);
      });
  });

  // Pagination functions
  function getVisibleCards() {
      return Array.from(insightCards).filter(card => 
          window.getComputedStyle(card).display !== 'none'
      );
  }

  function updatePaginationButtons(totalPages) {
      pageNumbers.forEach((num, index) => {
          num.style.display = index < totalPages ? 'block' : 'none';
      });
      
      prevPageBtn.classList.toggle('disabled', currentPage === 1);
      nextPageBtn.classList.toggle('disabled', currentPage >= totalPages);
  }

  function resetPagination() {
      const visibleCards = getVisibleCards();
      const totalPages = Math.ceil(visibleCards.length / cardsPerPage);
      updatePaginationButtons(totalPages);
  }

  function showPage(page) {
      const visibleCards = getVisibleCards();
      const totalPages = Math.ceil(visibleCards.length / cardsPerPage);
      
      currentPage = Math.max(1, Math.min(page, totalPages));
      
      // Hide all cards first
      visibleCards.forEach(card => card.style.display = 'none');
      
      // Calculate visible range
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      
      // Show current page cards
      visibleCards.slice(startIndex, endIndex).forEach(card => {
          card.style.display = 'block';
      });
      
      // Update active state
      pageNumbers.forEach(num => {
          num.classList.toggle('active', parseInt(num.textContent) === currentPage);
      });
      
      updatePaginationButtons(totalPages);
      
      // Smooth scroll to grid
      document.querySelector('.insights-grid').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  }

  // Pagination controls
  pageNumbers.forEach(number => {
      number.addEventListener('click', (e) => {
          e.preventDefault();
          showPage(parseInt(e.target.textContent));
      });
  });
  
  nextPageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(currentPage + 1);
  });
  
  prevPageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(currentPage - 1);
  });

  // Initialize
  resetPagination();
  showPage(1);

  // ========== Newsletter Form ==========
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;
          const feedback = document.createElement('div');
          feedback.className = 'form-feedback';
          
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              feedback.textContent = 'Thank you for subscribing!';
              feedback.style.color = '#4CAF50';
              this.reset();
          } else {
              feedback.textContent = 'Please enter a valid email address';
              feedback.style.color = '#f44336';
          }
          
          this.appendChild(feedback);
          setTimeout(() => feedback.remove(), 3000);
      });
  }

  // ========== Smooth Scrolling ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.hash);
          if (target) {
              window.scrollTo({
                  top: target.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // ========== Animations ==========
  // Typewriter effect
  const typewriterElements = document.querySelectorAll('.typewriter-text');
  typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      let index = 0;
      const typing = setInterval(() => {
          if (index < text.length) {
              element.textContent += text.charAt(index++);
          } else {
              clearInterval(typing);
          }
      }, 100);
  });

  // Scroll animations
  const animateOnScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
              element.classList.add(element.dataset.animation || 'fadeIn');
          }
      });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Card flip animation
  document.querySelectorAll('.expertise-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
      });
      card.addEventListener('mouseleave', () => {
          card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
      });
  });
});