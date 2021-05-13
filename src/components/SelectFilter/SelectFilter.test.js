import { makeTestStore, testRender } from '../../setupTests';
import { fireEvent, screen } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { initialState as originalState } from '../../store';
import { ACTION_TYPES } from '../../store/actions';
import { FILTER_STATE } from '../../store/reducers/filterSlice';

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
      filter: { filterState: FILTER_STATE.DONE_DEEDS }
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
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      payload: FILTER_STATE.ALL_DEEDS
    });
  });
});

describe(' Тесты SelectFilter > checkbox фильтра всех выполненных дел ', () => {
  test(' Отображение выбранного checkbox"а фильтра всех выполненных дел ', () => {
    const initialState = {
      ...originalState,
      filter: { filterState: FILTER_STATE.DONE_DEEDS }
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
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      payload: FILTER_STATE.DONE_DEEDS
    });
  });
});

describe(' Тесты SelectFilter > checkbox фильтра не выполненных дел ', () => {
  test(' Отображение выбранного checkbox"а фильтра не выполненных дел ', () => {
    const initialState = {
      ...originalState,
      filter: { filterState: FILTER_STATE.NOT_DONE_DEEDS }
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
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      payload: FILTER_STATE.NOT_DONE_DEEDS
    });
  });
});

describe(' Тесты SelectFilter > поиск по подстроке ', () => {
  test(' Отображение поля и кнопки для ввода подстроки для поиска ', () => {
    const store = makeTestStore();
    testRender(<SelectFilter />, { store });
    const searchField = screen.getByTestId('substringSearchField');
    const searchButton = screen.getByTestId('substringSearchButton');
    expect(searchField).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test(' Ввод подстроки, нажатие на кнопку, filterAction работает, возвращает правильный список ', () => {
    const listToDisplay = [
      {
        id: 1,
        isChecked: true,
        title: 'Meowing'
      },
      {
        id: 2,
        isChecked: false,
        title: 'Barking'
      }
    ];
    const initialState = {
      ...listToDisplay,
      filter: { filterState: FILTER_STATE.ALL_DEEDS }
    };
    const store = makeTestStore({ initialState });
    testRender(<SelectFilter />, { store });
    const substringValue = 'meow';
    const searchField = screen.getByTestId('substringSearchField');
    const searchButton = screen.getByTestId('substringSearchButton');
    fireEvent.input(searchField, { target: { value: substringValue } });
    fireEvent.click(searchButton);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.FILTER_SUBSTRING,
      payload: substringValue
    });
  });
});
