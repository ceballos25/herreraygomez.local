import { mountLegalPage } from '../components/legal/legal-page.component.js';
import { LEGAL_DATES, PRIVACY_CONTENT } from '../data/content/legal.content.js';

export const PrivacyPage = {
  init() {
    mountLegalPage({
      ...PRIVACY_CONTENT,
      date: LEGAL_DATES.privacy,
      breadcrumbLabel: 'Política de privacidad'
    });
  }
};
