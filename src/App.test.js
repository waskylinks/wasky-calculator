import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Calculator App', () => {
  test('renders display with initial 0', () => {
    render(<App />);
    const displayElement = screen.getByText("0");
    expect(displayElement).toBeInTheDocument();
  });

  test('renders AC and DEL buttons', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /AC/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /DEL/i })).toBeInTheDocument();
  });

  test('displays numbers when buttons are clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: "1" }));
    await user.click(screen.getByRole('button', { name: "2" }));
    await user.click(screen.getByRole('button', { name: "3" }));

    expect(screen.getByText("123")).toBeInTheDocument();
  });

  test('performs a calculation correctly', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Input: 2 + 3 =
    await user.click(screen.getByRole('button', { name: "2" }));
    await user.click(screen.getByRole('button', { name: "+" }));
    await user.click(screen.getByRole('button', { name: "3" }));
    await user.click(screen.getByRole('button', { name: "=" }));

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test('clears input when AC clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: "1" }));
    await user.click(screen.getByRole('button', { name: "2" }));
    expect(screen.getByText("12")).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /AC/i }));
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test('deletes last character when DEL clicked', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: "9" }));
    await user.click(screen.getByRole('button', { name: "8" }));
    expect(screen.getByText("98")).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /DEL/i }));
    expect(screen.getByText("9")).toBeInTheDocument();
  });
});
