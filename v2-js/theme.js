const toggle = document.querySelector('.theme-toggle');
let dark = false;
try { dark = localStorage.getItem('shoplite-theme') === 'dark'; } catch {}
function applyTheme() {
  document.documentElement.classList.toggle('dark', dark);
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.title = dark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
  }
}
applyTheme();
toggle?.addEventListener('click', () => {
  dark = !dark;
  applyTheme();
  try { localStorage.setItem('shoplite-theme', dark ? 'dark' : 'light'); } catch {}
});
