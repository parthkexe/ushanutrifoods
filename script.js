
const langSwitch = document.getElementById('langSwitch');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

let currentLanguage = 'en';

// English / Marathi language switch
function setLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;
  document.body.classList.toggle(
    'marathi',
    language === 'mr'
  );

  document
    .querySelectorAll('[data-en][data-mr]')
    .forEach((element) => {
      const value = element.dataset[language];

      if (value !== undefined) {
        element.innerHTML = value;
      }
    });

  langSwitch.innerHTML =
    language === 'en'
      ? 'मराठी <span>↗</span>'
      : 'English <span>↗</span>';

  langSwitch.setAttribute(
    'aria-label',
    language === 'en'
      ? 'Switch to Marathi'
      : 'Switch to English'
  );
}

langSwitch.addEventListener('click', () => {
  setLanguage(currentLanguage === 'en' ? 'mr' : 'en');
});

// Mobile navigation menu
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  );

  menuToggle.textContent = isOpen ? '×' : '☰';
});

// Close the mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';

    menuToggle.setAttribute(
      'aria-label',
      'Open navigation'
    );
  });
});

// Scroll reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

// Automatically update the copyright year
document.getElementById('year').textContent =
  new Date().getFullYear();

// Start in English
setLanguage('en');
