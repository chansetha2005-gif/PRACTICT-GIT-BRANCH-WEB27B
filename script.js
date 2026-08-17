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
    window.addEventListener('hashchange', showPage);
    showPage();

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      searchMessage.textContent = query ? `Searching the collection for â€œ${query}â€...` : 'Type a title, author, or subject to begin your search.';
    });
    document.querySelector('#signinForm').addEventListener('submit', (event) => {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) { document.querySelector('#signinMessage').textContent = 'You are signed in. Welcome back to the library!'; event.currentTarget.reset(); }
    });
    document.querySelector('#signupForm').addEventListener('submit', (event) => {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) { const name = document.querySelector('#firstName').value.trim(); document.querySelector('#signupMessage').textContent = `Welcome, ${name}! Your library account is ready.`; event.currentTarget.reset(); }
    });
    document.querySelector('#year').textContent = new Date().getFullYear();
