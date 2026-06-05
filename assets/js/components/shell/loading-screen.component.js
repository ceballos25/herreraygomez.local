import { SITE } from '../../config/site.config.js';

export function renderLoadingScreen() {
  return `<div id="loading-screen" aria-hidden="true">
    <div class="loader-logo">${SITE.brandHtml}</div>
    <div class="loader-bar"></div>
  </div>`;
}
