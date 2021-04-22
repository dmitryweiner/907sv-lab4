import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../ListItem';
import React from 'react';

const id = 123;
const title = 'TestItem';

test('Displaying an item in the list, reacting to a button', () => {
  const deleteHandler = jest.fn();

  // arrange
  render(<ListItem id={id} title={title} deleteHandler={deleteHandler} />);
  expect(screen.getByText(title)).toBeInTheDocument();

  // act
  const deleteButton = screen.getByTestId('deleteButton');
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  // asset
  expect(deleteHandler).toBeCalledWith(id);
});

test('Displaying the selected checkbox', () => {
  render(<ListItem id={id} title={title} isChecked={true} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('checked');
});

test('Displaying an empty checkbox', () => {
  render(<ListItem id={id} title={title} isChecked={false} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toHaveAttribute('checked');
});

test('When you click on the checkbox, the desired method is called', () => {
  const checkedHandler = jest.fn();

  render(<ListItem id={id} title={title} isChecked={false} checkedHandler={checkedHandler} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();

  expect(checkedHandler).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(checkedHandler).toBeCalledWith(id, true);
});
