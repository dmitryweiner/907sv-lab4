import { makeTestStore, testRender } from '../../setupTests';
import { fireEvent, screen } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { initialState as originalState } from '../../store';
import { ACTION_TYPES } from '../../store/actions';

describe(' Тесты SelectFilter > checkbox фильтра всех дел ', () => {
  test(' Отображение выбранного checkbox"а фильтра всех дел ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const allDeedsFilterCheckbox = screen.getByTestId('allDeedsFilterCheckbox');
    expect(allDeedsFilterCheckbox).toBeInTheDocument();
    expect(allDeedsFilterCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox"а фильтра всех дел ', () => {
    const initialState = {
      ...originalState,
      filter: { isAllDeedsChecked: false }
    };
    const store = makeTestStore({ initialState });
    testRender(<SelectFilter />, { store });
    const allDeedsFilterCheckbox = screen.getByTestId('allDeedsFilterCheckbox');
    expect(allDeedsFilterCheckbox).toBeInTheDocument();
    expect(allDeedsFilterCheckbox).not.toHaveAttribute('checked');
  });

  test(' Фильтр всех дел "работает" (filterAction вызывается в нужном месте) ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const allDeedsFilterCheckbox = screen.getByTestId('allDeedsFilterCheckbox');
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(allDeedsFilterCheckbox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.ALL_DEEDS
    });
  });
});

describe(' Тесты SelectFilter > checkbox фильтра всех выполненных дел ', () => {
  test(' Отображение выбранного checkbox"а фильтра всех выполненных дел ', () => {
    const initialState = {
      ...originalState,
      filter: { isDoneDeedsChecked: true }
    };
    const store = makeTestStore({ initialState });
    testRender(<SelectFilter />, { store });
    const doneDeedsFilterCheckbox = screen.getByTestId('doneDeedsFilterCheckbox');
    expect(doneDeedsFilterCheckbox).toBeInTheDocument();
    expect(doneDeedsFilterCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox"а фильтра всех выполненных дел ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const doneDeedsFilterCheckbox = screen.getByTestId('doneDeedsFilterCheckbox');
    expect(doneDeedsFilterCheckbox).toBeInTheDocument();
    expect(doneDeedsFilterCheckbox).not.toHaveAttribute('checked');
  });

  test(' Фильтр всех выполненных дел "работает" (filterAction вызывается в нужном месте) ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const doneDeedsFilterCheckbox = screen.getByTestId('doneDeedsFilterCheckbox');
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(doneDeedsFilterCheckbox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.DONE_DEEDS
    });
  });
});

describe(' Тесты SelectFilter > checkbox фильтра не выполненных дел ', () => {
  test(' Отображение выбранного checkbox"а фильтра не выполненных дел ', () => {
    const initialState = {
      ...originalState,
      filter: { isNotDoneDeedsChecked: true }
    };
    const store = makeTestStore({ initialState });
    testRender(<SelectFilter />, { store });
    const notDoneDeedsFilterCheckbox = screen.getByTestId('notDoneDeedsFilterCheckbox');
    expect(notDoneDeedsFilterCheckbox).toBeInTheDocument();
    expect(notDoneDeedsFilterCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox"а фильтра не выполненных дел ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const notDoneDeedsFilterCheckbox = screen.getByTestId('notDoneDeedsFilterCheckbox');
    expect(notDoneDeedsFilterCheckbox).toBeInTheDocument();
    expect(notDoneDeedsFilterCheckbox).not.toHaveAttribute('checked');
  });

  test(' Фильтр не выполненных дел "работает" (filterAction вызывается в нужном месте) ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const notDoneDeedsFilterCheckbox = screen.getByTestId('notDoneDeedsFilterCheckbox');
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(notDoneDeedsFilterCheckbox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.NOT_DONE_DEEDS
    });
  });
});
