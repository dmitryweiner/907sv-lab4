import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../ListItem';
import React from 'react';
import { ACTION_TYPES } from '../../store';

const id = '123';
const title = 'TestItem';

test('Displaying an item in the list, reacting to a button', () => {
  const dispatch = jest.fn();

  // arrange
  render(<ListItem id={id} title={title} dispatch={dispatch} />);
  expect(screen.getByText(title)).toBeInTheDocument();

  // act
  const deleteButton = screen.getByTestId('deleteButton');
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  // asset
  expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.REMOVE, payload: id });
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
  const dispatch = jest.fn();

  render(<ListItem id={id} title={title} isChecked={false} dispatch={dispatch} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();

  expect(dispatch).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: id });
});

test('Displaying the edit field and the ability to save content', () => {
  const dispatch = jest.fn();
  const value = 'value';

  render(<ListItem id={id} title={title} dispatch={dispatch} />);

  const editButton = screen.getByTestId('editButton');
  fireEvent.click(editButton);
  expect(editButton).not.toBeInTheDocument();
  expect(screen.queryByTestId('title')).toBeNull();

  const input = screen.getByTestId('editInput');
  expect(input.value).toEqual(title);
  fireEvent.input(input, { target: { value: value } });

  const saveButton = screen.getByTestId('saveButton');
  fireEvent.click(saveButton);
  expect(input).not.toBeInTheDocument();
  expect(screen.queryByTestId('saveButton')).toBeNull();
  expect(screen.queryByTestId('editButton')).not.toBeNull();

  expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.EDIT, payload: { id, title: value } });
});
