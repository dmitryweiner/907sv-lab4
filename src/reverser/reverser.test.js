import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Reverser from './reverser';

test('Компонент получает строку и выводит корректный результат', () => {
  const testString = 'Reverse Me';
  const reversedTestString = 'eM esreveR';
  render(<Reverser receivedValue={testString} />);
  expect(screen.getByText(testString)).toBeInTheDocument();
  const button = screen.getByTestId('reverseButton');
  fireEvent.click(button);
  expect(screen.getByText(reversedTestString)).toBeInTheDocument();
});
