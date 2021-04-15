import { screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import React from 'react';
import { ACTION_TYPES, REQUEST_STATE_TYPES } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const id = '19';
const title = 'Покормить цветы';

test('Отображение элемента в списке, реакция на кнопку', () => {
  const store = makeTestStore({ useMockStore: true });

  // arrange
  testRender(<ListItem id={id} title={title} />, { store });
  expect(screen.getByText(title)).toBeInTheDocument();

  // act
  const deleteButton = screen.getByTestId('deleteButton');
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  // asset
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATE,
    payload: REQUEST_STATE_TYPES.LOADING
  });
});

test('Отображение выбранного чекбокса', () => {
  const store = makeTestStore();

  testRender(<ListItem id={id} title={title} isChecked={true} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('checked');
});

test('Отображение пустого чекбокса', () => {
  const store = makeTestStore();

  testRender(<ListItem id={id} title={title} isChecked={false} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toHaveAttribute('checked');
});

test('При клике на чекбокс вызывается нужный метод', () => {
  const store = makeTestStore({ useMockStore: true });

  testRender(<ListItem id={id} title={title} isChecked={false} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();

  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATE,
    payload: REQUEST_STATE_TYPES.LOADING
  });
});

test('Отображение поля редактирования и возможности сохранения содержимого', () => {
  const store = makeTestStore({ useMockStore: true });
  const value = 'value';

  testRender(<ListItem id={id} title={title} />, { store });

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

  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATE,
    payload: REQUEST_STATE_TYPES.LOADING
  });
});
