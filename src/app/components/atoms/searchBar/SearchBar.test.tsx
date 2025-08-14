import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

it('renders the search field', async () => {
  if (!i18n.isInitialized) {
    await i18n.init({
      lng: 'en',
      resources: { en: { translation: { 'header.search': 'Search...' } } },
    });
  }
  render(
    <I18nextProvider i18n={i18n}>
      <SearchBar />
    </I18nextProvider>,
  );
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
