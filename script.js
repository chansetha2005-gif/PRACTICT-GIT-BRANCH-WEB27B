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
    const signinEmail = document.querySelector('#signinEmail');
    const signinPassword = document.querySelector('#signinPassword');
    const signinEmailError = document.querySelector('#signinEmailError');
    const signinPasswordError = document.querySelector('#signinPasswordError');
    const signinMessage = document.querySelector('#signinMessage');
    const rememberMe = document.querySelector('#rememberMe');
    const rememberedEmailKey = 'leafLanternEmail';

    function setFieldError(input, errorEl, message) {
      if (!input || !errorEl) return;
      const field = input.closest('.field');
      if (message) {
        field?.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
      } else {
        field?.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateSigninEmail() {
      const value = signinEmail?.value.trim() || '';
      if (!value) {
        setFieldError(signinEmail, signinEmailError, 'Please enter your email address.');
        return false;
      }
      if (!isValidEmail(value)) {
        setFieldError(signinEmail, signinEmailError, 'Please enter a valid email address.');
        return false;
      }
      setFieldError(signinEmail, signinEmailError, '');
      return true;
    }

    function validateSigninPassword() {
      const value = signinPassword?.value || '';
      if (!value) {
        setFieldError(signinPassword, signinPasswordError, 'Please enter your password.');
        return false;
      }
      if (value.length < 8) {
        setFieldError(signinPassword, signinPasswordError, 'Password must be at least 8 characters.');
        return false;
      }
      setFieldError(signinPassword, signinPasswordError, '');
      return true;
    }

    if (signinEmail && localStorage.getItem(rememberedEmailKey)) {
      signinEmail.value = localStorage.getItem(rememberedEmailKey);
      if (rememberMe) rememberMe.checked = true;
    }

    if (signinEmail) {
      signinEmail.addEventListener('blur', validateSigninEmail);
      signinEmail.addEventListener('input', () => {
        if (signinEmailError?.textContent) validateSigninEmail();
        if (signinMessage) {
          signinMessage.textContent = '';
          signinMessage.classList.remove('is-error');
        }
      });
    }
    if (signinPassword) {
      signinPassword.addEventListener('blur', validateSigninPassword);
      signinPassword.addEventListener('input', () => {
        if (signinPasswordError?.textContent) validateSigninPassword();
      });
    }

    const passwordToggle = document.querySelector('#toggleSigninPassword');
    if (passwordToggle && signinPassword) {
      passwordToggle.addEventListener('click', () => {
        const show = signinPassword.type === 'password';
        signinPassword.type = show ? 'text' : 'password';
        passwordToggle.setAttribute('aria-pressed', String(show));
        passwordToggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        const eye = passwordToggle.querySelector('.icon-eye');
        const eyeOff = passwordToggle.querySelector('.icon-eye-off');
        if (eye) eye.hidden = show;
        if (eyeOff) eyeOff.hidden = !show;
      });
    }

    document.querySelectorAll('#signin [data-sso]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!signinMessage) return;
        const provider = button.dataset.sso === 'apple' ? 'Apple' : 'Google';
        signinMessage.classList.remove('is-error');
        signinMessage.textContent = `${provider} sign-in is not connected in this demo. Use email to continue.`;
      });
    });

    const forgotPassword = document.querySelector('#forgotPassword');
    if (forgotPassword && signinMessage) {
      forgotPassword.addEventListener('click', (event) => {
        event.preventDefault();
        const email = signinEmail?.value.trim() || '';
        signinMessage.classList.remove('is-error');
        signinMessage.textContent = isValidEmail(email)
          ? `If an account exists for ${email}, a reset link will be sent.`
          : 'Enter your email address above and we will send a reset link.';
      });
    }

    if (signinForm) signinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailOk = validateSigninEmail();
      const passwordOk = validateSigninPassword();
      if (!emailOk || !passwordOk) {
        if (signinMessage) {
          signinMessage.classList.add('is-error');
          signinMessage.textContent = 'Please fix the highlighted fields to continue.';
        }
        (!emailOk ? signinEmail : signinPassword)?.focus();
        return;
      }
      const email = signinEmail.value.trim();
      const keepEmail = Boolean(rememberMe?.checked);
      if (keepEmail) localStorage.setItem(rememberedEmailKey, email);
      else localStorage.removeItem(rememberedEmailKey);
      if (signinMessage) {
        signinMessage.classList.remove('is-error');
        signinMessage.textContent = 'You are signed in. Welcome back to the library!';
      }
      signinForm.reset();
      setFieldError(signinEmail, signinEmailError, '');
      setFieldError(signinPassword, signinPasswordError, '');
      if (keepEmail && signinEmail && rememberMe) {
        signinEmail.value = email;
        rememberMe.checked = true;
      }
      if (passwordToggle && signinPassword) {
        signinPassword.type = 'password';
        passwordToggle.setAttribute('aria-pressed', 'false');
        passwordToggle.setAttribute('aria-label', 'Show password');
        const eye = passwordToggle.querySelector('.icon-eye');
        const eyeOff = passwordToggle.querySelector('.icon-eye-off');
        if (eye) eye.hidden = false;
        if (eyeOff) eyeOff.hidden = true;
      }
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
