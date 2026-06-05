import { APP_CONFIG } from '../config/constants.js';

export function initTheme() {
  const saved = localStorage.getItem(APP_CONFIG.storage.theme) || 'light';
  setTheme(saved);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(APP_CONFIG.storage.theme, theme);
  const icon = document.querySelector('.theme-toggle i');
  if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}
