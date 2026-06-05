import { mountLegalPage } from '../components/legal/legal-page.component.js';
import { LEGAL_DATES, TERMS_CONTENT } from '../data/content/legal.content.js';

export const TermsPage = {
  init() {
    mountLegalPage({
      ...TERMS_CONTENT,
      date: LEGAL_DATES.terms,
      breadcrumbLabel: 'Términos y condiciones'
    });
  }
};
