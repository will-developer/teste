import { render, screen, fireEvent } from '@testing-library/react';
import ButtonsGenerico from './button';

it('renders the button with the correct label', () => {
  render(<ButtonsGenerico label="Click here" />);
  expect(screen.getByText('Click here')).toBeInTheDocument();
});

it('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<ButtonsGenerico label="Button" onClick={handleClick} />);
  fireEvent.click(screen.getByText('Button'));
  expect(handleClick).toHaveBeenCalled();
});
