import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageDropdown from './LanguageDropdown';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

it('renders the dropdown with options', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageDropdown />
    </I18nextProvider>,
  );
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getByText('Português')).toBeInTheDocument();
});

it('changes language when selecting', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageDropdown />
    </I18nextProvider>,
  );
  fireEvent.mouseDown(screen.getByRole('combobox'));
  const englishOption = await screen.findByText('English');
  fireEvent.click(englishOption);
  await waitFor(() => expect(screen.getByText('English')).toBeInTheDocument());
});
