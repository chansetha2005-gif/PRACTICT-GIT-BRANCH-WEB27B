const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const searchMessage = document.querySelector('#searchMessage');

if (menuButton && navLinks) {
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = isOpen ? '×' : '☰';
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }
});
}

if (searchForm && searchInput && searchMessage) {
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  searchMessage.textContent = query
    ? `Searching the collection for “${query}”...`
    : 'Type a title, author, or subject to begin your search.';
});
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const signupForm = document.querySelector('#signupForm');
const formMessage = document.querySelector('#formMessage');
if (signupForm && formMessage) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!signupForm.checkValidity()) return;
    const firstName = document.querySelector('#firstName').value.trim();
    formMessage.textContent = `Welcome, ${firstName}! Your library account is ready.`;
    signupForm.reset();
  });
}
