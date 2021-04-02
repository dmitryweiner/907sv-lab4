import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import { SELECTOR_TYPES, remove, check } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const task = 'Принять таблетки';
const id = '1';
const checked = false;

const initialState = {
  list: [
    {
      id: id,
      title: task,
      isChecked: checked
    }
  ],
  filtered: SELECTOR_TYPES.ALL,
  searchBar: ''
};

const store = makeTestStore({ initialState });

test('Отображает на экране то, что передали в пропсе title', () => {
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const element = screen.getByTestId('task');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(task);
  screen.getByText(content => content.startsWith('таблетки', 8));
});

test('При нажатии на кнопку должен вызываться store.dispatch с параметром id', () => {
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const button = screen.getByTestId('delete-button');
  expect(button).toBeInTheDocument();
  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(button);
  expect(store.dispatch).toBeCalledWith(remove(id));
});

test('Должен показывать на экране чекбокс, состояние которого зависит от переданного пропса checked', () => {
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeVisible();
  expect(checkbox.checked).toEqual(checked);
});

test('При клике на чекбокс должен вызываться store.dispatch с параметром id', () => {
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(store.dispatch).toBeCalledWith(check(id));
});
