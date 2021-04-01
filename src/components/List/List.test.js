import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';
const deleteHandler = jest.fn();
const checkHandler = jest.fn();
const list = [
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
  test(' Отображение непустого списка ', () => {
    render(<List list={list} deleteHandler={deleteHandler} />);
    for (let item of list) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }
  });

  test(' Отображение пустого списка, вывод надписи ', () => {
    render(<List list={[]} delteHandler={deleteHandler} />);
    expect(screen.getByText('There are no elements yet (￣︿￣)')).toBeInTheDocument();
  });
});

describe(' Тесты List > Кнопки элементов', () => {
  test(' Вызов deleteHandler с id на кнопке у каждого элемента списка ', () => {
    render(<List list={list} deleteHandler={deleteHandler} />);
    const buttons = screen.getAllByTestId('delete-button');
    for (let button of buttons) {
      fireEvent.click(button);
    }
    expect(deleteHandler).toBeCalledTimes(list.length);
  });
});

describe(' Тесты List > Checkbox"ы элементов', () => {
  test(' Checkbox"ы в List отображаются с правильными значениями ', () => {
    render(<List list={list} checkHandler={checkHandler} />);
    const checkboxes = screen.getAllByTestId('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      expect(checkboxes[i]).toHaveAttribute(list[i].isChecked ? 'checked' : 'type');
    }
  });

  test(' Вызов checkHandler с id на checkbox у каждого элемента списка ', () => {
    render(<List list={list} checkHandler={checkHandler} />);
    const checkboxes = screen.getAllByTestId('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      fireEvent.click(checkboxes[i]);
      expect(checkHandler).toBeCalledWith(list[i].id, !list[i].isChecked);
    }
  });
});
