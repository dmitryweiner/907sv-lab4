import ListItem from './ListItem';
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../Store';
const listItemTitle = "I'm title";
const listItemId = "I'm ListItem Id";
const truthyTestListItem = {
  id: listItemId,
  isChecked: true,
  title: listItemTitle
};
const falsyTestListItem = {
  id: listItemId,
  isChecked: false,
  title: listItemTitle
};

describe(' Тесты ListItem > Title ', () => {
  test(' Отображение title ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={falsyTestListItem} />, { store });
    expect(screen.getByText(listItemTitle)).toBeInTheDocument();
  });
});

describe(' Тесты ListItem > Delete Button ', () => {
  test(' Отображение кнопки Delete, вызов deleteAction с id ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={falsyTestListItem} />, { store });
    const button = screen.getByTestId('delete-button');
    expect(button).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(button);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.DELETE,
      payload: falsyTestListItem.id
    });
  });
});

describe(' Тесты ListItem > Move Buttons ', () => {
  test(' Отображение кнопки передвижения вверх, вызов moveUpAction с id ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={falsyTestListItem} />, { store });
    const moveUpButton = screen.getByTestId('moveUpButton');
    expect(moveUpButton).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(moveUpButton);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.MOVE_UP,
      payload: falsyTestListItem.id
    });
    expect(store.dispatch).not.toBeCalledWith({
      type: ACTION_TYPES.MOVE_DOWN,
      payload: falsyTestListItem.id
    });
  });
  test(' Отображение кнопки передвижения вниз, вызов moveDownAction с id ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={falsyTestListItem} />, { store });
    const moveDownButton = screen.getByTestId('moveDownButton');
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(moveDownButton);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.MOVE_DOWN,
      payload: falsyTestListItem.id
    });
    expect(store.dispatch).not.toBeCalledWith({
      type: ACTION_TYPES.MOVE_UP,
      payload: falsyTestListItem.id
    });
  });
});

describe(' Тесты ListItem => Checkbox ', () => {
  test(' Отображение выбранного checkbox ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={truthyTestListItem} />, { store });
    const firstCheckbox = screen.getByTestId('checkbox');
    expect(firstCheckbox).toBeInTheDocument();
    expect(firstCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={falsyTestListItem} />, { store });
    const secondCheckbox = screen.getByTestId('checkbox');
    expect(secondCheckbox).toBeInTheDocument();
    expect(secondCheckbox).not.toHaveAttribute('checked');
  });

  test(' Checkbox, вызов checkAction с id ', () => {
    const store = makeTestStore();
    testRender(<ListItem item={falsyTestListItem} />, { store });
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(checkbox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.CHECK,
      payload: truthyTestListItem.id
    });
  });
});
