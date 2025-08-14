import { render, screen } from '@testing-library/react';
import InputField from './InputField';

it('renders the input with placeholder', () => {
  render(<InputField placeholder="Type something" />);
  expect(screen.getByPlaceholderText('Type something')).toBeInTheDocument();
});

it('accepts initial value', () => {
  render(<InputField value="test" />);
  expect(screen.getByDisplayValue('test')).toBeInTheDocument();
});
