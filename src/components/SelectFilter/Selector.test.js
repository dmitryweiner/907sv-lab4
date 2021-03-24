import { render, screen, fireEvent } from '@testing-library/react';
import Selector from './Selector';
import React from 'react';
import { ACTION_TYPES, SELECT_FILTER_TYPES } from '../../store';

test('Выполнение рендера компонента Selector', () => {
  const dispatch = jest.fn();
  render(<Selector dispatch={dispatch} />);

  const selector = screen.getByTestId('selector');
  expect(selector).toBeInTheDocument();
});

test('Отображение компонентом параметров фильтрации', () => {
  const dispatch = jest.fn();

  render(<Selector dispatch={dispatch} />);

  for (let option of Object.values(SELECT_FILTER_TYPES)) {
    expect(screen.getByText(option)).toBeInTheDocument();
  }
});

test('Отображение компонентом элементов с правильными параметрами фильтрации', () => {
  const dispatch = jest.fn();

  render(<Selector dispatch={dispatch} />);

  const selector = screen.getByTestId('selector');
  expect(dispatch).not.toBeCalled();
  fireEvent.change(selector, {
    target: {
      value: SELECT_FILTER_TYPES.DONE
    }
  });
  expect(dispatch).toBeCalledWith({
    type: ACTION_TYPES.SELECT_BY_FILTER,
    payload: SELECT_FILTER_TYPES.DONE
  });
});
