const searchForm = document.querySelector('#searchForm');
    const searchInput = document.querySelector('#searchInput');
    const searchMessage = document.querySelector('#searchMessage');
    const signin = document.querySelector('#signin');
    const signup = document.querySelector('#signup');

    function showPage() {
      const view = location.hash;
      const accountView = view === '#signin' ? signin : view === '#signup' ? signup : null;
      document.querySelector('main').classList.toggle('page-hidden', Boolean(accountView));
      document.querySelector('footer').classList.toggle('page-hidden', Boolean(accountView));
      signin.classList.toggle('active', accountView === signin);
      signup.classList.toggle('active', accountView === signup);
    }
    if (signin && signup) {
      window.addEventListener('hashchange', showPage);
      showPage();
    }

    if (searchForm && searchInput && searchMessage) searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      searchMessage.textContent = query ? `Searching the collection for â€œ${query}â€...` : 'Type a title, author, or subject to begin your search.';
    });
    const signinForm = document.querySelector('#signinForm');
    if (signinForm) signinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) { document.querySelector('#signinMessage').textContent = 'You are signed in. Welcome back to the library!'; event.currentTarget.reset(); }
    });
    const signupForm = document.querySelector('#signupForm');
    if (signupForm) signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) { const name = document.querySelector('#firstName').value.trim(); document.querySelector('#signupMessage').textContent = `Welcome, ${name}! Your library account is ready.`; event.currentTarget.reset(); }
    });
    const year = document.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();

    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    if (menuButton && navLinks) {
      menuButton.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      });
      navLinks.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          navLinks.classList.remove('open');
          menuButton.setAttribute('aria-expanded', 'false');
          menuButton.setAttribute('aria-label', 'Open navigation');
        }
      });
    }

    document.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
        document.querySelectorAll('.book-card').forEach((book) => {
          book.hidden = filter !== 'all' && book.dataset.genre !== filter;
        });
      });
    });

    const readingText = document.querySelector('.reading-text');
    document.querySelectorAll('[data-font-size]').forEach((button) => {
      button.addEventListener('click', () => {
        readingText.style.fontSize = `${button.dataset.fontSize}px`;
      });
    });
    const themeButton = document.querySelector('#themeButton');
    if (themeButton && readingText) themeButton.addEventListener('click', () => {
      readingText.classList.toggle('night-reading');
      themeButton.textContent = readingText.classList.contains('night-reading') ? 'Light mode' : 'Night mode';
    });

    const orderForm = document.querySelector('#orderForm');
    const orderMessage = document.querySelector('#orderMessage');
    if (orderForm && orderMessage) orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!orderForm.checkValidity()) return;
      const title = document.querySelector('#bookTitle').value;
      orderMessage.textContent = `Your request for “${title}” is confirmed. We will email you when it is ready.`;
      orderForm.reset();
    });
