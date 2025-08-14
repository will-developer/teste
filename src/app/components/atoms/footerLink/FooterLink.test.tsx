import { render } from '@testing-library/react';
import FooterLink from './FooterLink';

it('renders the footer link', () => {
  const { getByText } = render(<FooterLink href="#">Footer link</FooterLink>);
  expect(getByText('Footer link')).toBeInTheDocument();
});
