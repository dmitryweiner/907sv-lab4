import { screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';
import React from 'react';
import { ACTION_TYPES, SELECT_FILTER_TYPES } from '../../store/store';
import { makeTestStore, testRender } from '../../setupTests';

const store = makeTestStore({
  initialState: { list: [], filter: SELECT_FILTER_TYPES.ALL, substring: '' }
});

test('Выполнение рендера компонента Filter', () => {
  testRender(<Filter />, { store });

  const selector = screen.getByTestId('selector');
  expect(selector).toBeInTheDocument();
});

test('Отображение компонентом параметров фильтрации', () => {
  testRender(<Filter />, { store });

  for (let option of Object.values(SELECT_FILTER_TYPES)) {
    expect(screen.getByText(option)).toBeInTheDocument();
  }
});

test('Отображение компонентом элементов с правильными параметрами фильтрации', () => {
  testRender(<Filter />, { store });

  const selector = screen.getByTestId('selector');
  expect(store.dispatch).not.toBeCalled();
  fireEvent.change(selector, {
    target: {
      value: SELECT_FILTER_TYPES.DONE
    }
  });
  expect(store.dispatch).toBeCalledWith({
    type: ACTION_TYPES.SELECT_BY_FILTER,
    payload: SELECT_FILTER_TYPES.DONE
  });
});
