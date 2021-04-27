import { screen, fireEvent } from '@testing-library/react';
import List from './List';
import { makeTestStore, testRender } from '../../setupTests';
import { initialState } from '../../store/index';
import { ACTION_TYPES } from '../../store/actions';

const listToDisplay = [
  {
    id: 1,
    isChecked: true,
    title: "I'm first"
  },
  {
    id: 2,
    isChecked: false,
    title: "I'm second"
  }
];

describe(' Тесты List > Отображение списка', () => {
  test(' Отображение пустого списка, вывод надписи ', () => {
    const emptyListToDisplay = [];
    const store = makeTestStore({
      initialState: { ...initialState, todos: { list: emptyListToDisplay } }
    });
    testRender(<List />, { store });
    expect(screen.getByText('There are no elements yet (￣︿￣)')).toBeInTheDocument();
  });

  test(' Отображение непустого списка ', () => {
    const store = makeTestStore({
      initialState: { ...initialState, todos: { list: listToDisplay } }
    });
    testRender(<List />, { store });
    for (let item of listToDisplay) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });
});

describe(' Тесты List > Кнопки элементов', () => {
  test(' Вызов deleteAction с id на кнопке у каждого элемента списка ', () => {
    const store = makeTestStore({
      initialState: { ...initialState, todos: { list: listToDisplay } }
    });
    testRender(<List />, { store });
    for (let button of screen.getAllByTestId('delete-button')) {
      fireEvent.click(button);
    }
    expect(store.dispatch).toBeCalledTimes(listToDisplay.length);
  });
});

describe(' Тесты List > Checkbox"ы элементов', () => {
  test(' Checkbox"ы в List отображаются с правильными значениями ', () => {
    const store = makeTestStore({
      initialState: { ...initialState, todos: { list: listToDisplay } }
    });
    testRender(<List />, { store });
    const checkboxes = screen.getAllByTestId('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      expect(checkboxes[i]).toHaveAttribute(listToDisplay[i].isChecked ? 'checked' : 'type');
    }
  });

  test(' Вызов checkAction с id на checkbox у каждого элемента списка ', () => {
    const store = makeTestStore({
      initialState: { ...initialState, todos: { list: listToDisplay } }
    });
    testRender(<List />, { store });
    const checkboxes = screen.getAllByTestId('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      fireEvent.click(checkboxes[i]);
      expect(store.dispatch).toBeCalledWith({
        type: ACTION_TYPES.CHECK,
        payload: listToDisplay[i].id
      });
    }
  });
});
