import { makeTestStore, testRender } from '../../setupTests';
import Selector from '../Selector';
import { fireEvent, screen } from '@testing-library/react';
import { ACTION_TYPES, SELECTORS } from '../../store';

test('Selector показывает нужные options', () => {
  const store = makeTestStore();
  testRender(<Selector />, { store });

  for (let selectOption of Object.values(SELECTORS)) {
    expect(screen.getByLabelText(selectOption)).toBeInTheDocument();
  }
});

test('Поиск selector и проверка radioButtons', () => {
  const store = makeTestStore();
  testRender(<Selector />, { store });
  const selector = screen.getByTestId('selector');
  expect(selector).toBeInTheDocument();
  const radioButtons = screen.getAllByTestId('radioButton');
  fireEvent.click(radioButtons[0]);
  expect(store.dispatch).toBeCalledWith({
    type: ACTION_TYPES.SELECTOR,
    payload: Object.keys(SELECTORS)[0]
  });
});
