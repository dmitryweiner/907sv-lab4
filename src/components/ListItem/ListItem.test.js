import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import { ACTION_TYPES } from '../../store';

const task = 'Принять таблетки';
const id = 1;
const dispatch = jest.fn();
const checked = false;

test('Отображает на экране то, что передали в пропсе title', () => {
  render(<ListItem title={task} id={id} isChecked={checked} dispatch={dispatch} />);
  const element = screen.getByTestId('task');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(task);
  screen.getByText(content => content.startsWith('таблетки', 8));
});

test('При нажатии на кнопку должен вызываться переданный в пропсах коллбэк dispatch с параметром id', () => {
  render(<ListItem title={task} id={id} isChecked={checked} dispatch={dispatch} />);
  const button = screen.getByTestId('delete-button');
  expect(button).toBeInTheDocument();
  expect(dispatch).not.toBeCalled();
  fireEvent.click(button);
  expect(dispatch).toBeCalledWith({ payload: id, type: ACTION_TYPES.REMOVE });
});

test('Должен показывать на экране чекбокс', () => {
  render(<ListItem title={task} id={id} isChecked={checked} dispatch={dispatch} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeVisible();
});

test('Состояние чекбокса зависит от переданного пропса checked.', () => {
  render(<ListItem title={task} id={id} isChecked={checked} dispatch={dispatch} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox.checked).toEqual(checked);
});

test('При клике на чекбокс должен вызываться коллбэк dispatch с параметром id', () => {
  render(<ListItem title={task} id={id} isChecked={checked} dispatch={dispatch} />);
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(dispatch).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(dispatch).toBeCalledWith({ payload: id, type: ACTION_TYPES.CHECK });
});
