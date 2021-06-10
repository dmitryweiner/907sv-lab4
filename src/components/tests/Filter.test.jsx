import Filter from '../Filter';
import { makeTestStore, testRender } from '../../setupTests';
import { fireEvent, screen } from '@testing-library/react';
import { ACTION_TYPES } from '../../store';

test('Filter', () => {
  const store = makeTestStore();
  testRender(<Filter />, { store });

  const searchBar = screen.getByTestId('search-bar');
  fireEvent.input(searchBar, {
    target: {
      value: '123'
    }
  });
  expect(store.dispatch).toBeCalledWith({
    type: ACTION_TYPES.SEARCH,
    payload: '123'
  });
});
