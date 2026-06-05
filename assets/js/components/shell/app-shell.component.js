import { PAGE_LAYOUT, DEFAULT_LAYOUT } from '../../config/site.config.js';
import { insertBeforeMain, insertAfterMain } from '../../utils/mount.js';
import { renderNavbar } from './navbar.component.js';
import { renderFooter } from './footer.component.js';
import { renderLoadingScreen } from './loading-screen.component.js';
import { renderFloatingButtons } from './floating-buttons.component.js';

export function mountAppShell() {
  const pageKey = document.body.dataset.page;
  const layout = { ...DEFAULT_LAYOUT, ...PAGE_LAYOUT[pageKey] };

  if (layout.loading) {
    document.body.insertAdjacentHTML('afterbegin', renderLoadingScreen());
  }

  insertBeforeMain(renderNavbar(layout.navbar, pageKey));

  if (layout.footer !== 'none') {
    insertAfterMain(renderFooter(layout.footer));
  }

  if (layout.floats) {
    document.body.insertAdjacentHTML('beforeend', renderFloatingButtons());
  }
}
