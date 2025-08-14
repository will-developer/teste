import { render } from '@testing-library/react';
import CopyrightText from './CopyRightText';

it('renders the copyright text', () => {
  const { getByText } = render(
    <CopyrightText>© 2025 AvaliaPlus</CopyrightText>,
  );
  expect(getByText('© 2025 AvaliaPlus')).toBeInTheDocument();
});
