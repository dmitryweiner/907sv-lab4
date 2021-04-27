import { makeTestStore, testRender } from '../../setupTests';
import { fireEvent, screen } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { initialState as originalState } from '../../store';
import { ACTION_TYPES } from '../../store/actions';

describe(' Тесты SelectFilter > checkbox фильтра выполненности всех дел', () => {
  test(' Отображение выбранного checkbox"а фильтра выполненности всех дел ', () => {
    const initialState = {
      ...originalState,
      filter: { isFilterDone: true }
      //
      // ...originalState,
      // isFilterDone: true
    };
    console.log('this is initial state', initialState);
    const store = makeTestStore({ initialState });
    testRender(<SelectFilter />, { store });
    const filterCheckbox = screen.getByTestId('filterCheckbox');
    expect(filterCheckbox).toBeInTheDocument();
    expect(filterCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox"а фильтра выполненности всех дел ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const filterCheckbox = screen.getByTestId('filterCheckbox');
    expect(filterCheckbox).toBeInTheDocument();
    expect(filterCheckbox).not.toHaveAttribute('checked');
  });

  test(' Фильтр выполненности всех дел "работает" (filterAction вызывается в нужном месте) ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const filterCheckbox = screen.getByTestId('filterCheckbox');
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(filterCheckbox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.IS_FILTER_DONE
    });
  });
});
