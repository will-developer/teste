import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from './Buttons';

it('renders the button with the correct label', () => {
  render(<Buttons label="Save" onClick={() => {}} />);
  expect(screen.getByText('Save')).toBeInTheDocument();
});

it('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Buttons label="Send" onClick={handleClick} />);
  fireEvent.click(screen.getByText('Send'));
  expect(handleClick).toHaveBeenCalled();
});
