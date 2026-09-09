const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('#main-nav');
const desktopNav = window.matchMedia('(min-width: 1280px)');

if (navToggle && mainNav) {
  const header = navToggle.closest('.header-inner');
  const setOpen = open => {
    navToggle.setAttribute('aria-expanded', String(open));
    mainNav.classList.toggle('is-open', open);
  };
  navToggle.hidden = false;
  header.classList.add('nav-ready');
  navToggle.addEventListener('click', () => {
    setOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      navToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setOpen(false);
  });
  mainNav.addEventListener('click', event => {
    if (event.target.closest('a') && !desktopNav.matches) {
      setOpen(false);
      navToggle.focus();
    }
  });
  desktopNav.addEventListener('change', () => {
    const focused = document.activeElement;
    setOpen(false);
    if (desktopNav.matches && focused === navToggle) mainNav.querySelector('a').focus();
    else if (!desktopNav.matches && mainNav.contains(focused)) navToggle.focus();
  });
}
