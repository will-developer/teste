import { render, screen } from '@testing-library/react';
import Input from './input';

it('renders the input with label', () => {
  render(<Input label="Name" />);
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
});

it('accepts initial value', () => {
  render(<Input value="value" label="Field" />);
  expect(screen.getByDisplayValue('value')).toBeInTheDocument();
});
