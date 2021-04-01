import ListItem from './ListItem';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
const listItemTitle = "I'm title";
const listItemId = "I'm ListItem Id";

describe(' Тесты ListItem > Title ', () => {
  test(' Отображение title ', () => {
    render(<ListItem title={listItemTitle} />);
    expect(screen.getByText(listItemTitle)).toBeInTheDocument();
  });
});

describe(' Тесты ListItem > Delete Button ', () => {
  test(' Отображение кнопки Delete, вызов deleteHandler с id ', () => {
    const deleteHandler = jest.fn();
    render(<ListItem id={listItemId} deleteHandler={deleteHandler} />);
    const button = screen.getByTestId('delete-button');
    expect(button).toBeInTheDocument();
    expect(deleteHandler).not.toBeCalled();
    fireEvent.click(button);
    expect(deleteHandler).toBeCalledWith(listItemId);
  });
});

describe(' Тесты ListItem > Move Buttons ', () => {
  test(' Отображение кнопки передвижения вверх, вызов moveUpHandler с id ', () => {
    const moveUpHandler = jest.fn();
    const moveDownHandler = jest.fn();
    render(
      <ListItem id={listItemId} moveUpHandler={moveUpHandler} moveDownHandler={moveDownHandler} />
    );
    const moveUpButton = screen.getByTestId('moveUpButton');
    expect(moveUpButton).toBeInTheDocument();
    expect(moveUpHandler).not.toBeCalled();
    expect(moveDownHandler).not.toBeCalled();
    fireEvent.click(moveUpButton);
    expect(moveUpHandler).toBeCalledWith(listItemId);
    expect(moveDownHandler).not.toBeCalled();
  });
  test(' Отображение кнопки передвижения вниз, вызов moveDownHandler с id ', () => {
    const moveUpHandler = jest.fn();
    const moveDownHandler = jest.fn();
    render(
      <ListItem id={listItemId} moveUpHandler={moveUpHandler} moveDownHandler={moveDownHandler} />
    );
    const moveDownButton = screen.getByTestId('moveDownButton');
    expect(moveDownButton).toBeInTheDocument();
    expect(moveUpHandler).not.toBeCalled();
    expect(moveDownHandler).not.toBeCalled();
    fireEvent.click(moveDownButton);
    expect(moveDownHandler).toBeCalledWith(listItemId);
    expect(moveUpHandler).not.toBeCalled();
  });
});

describe(' Тесты ListItem => Checkbox ', () => {
  test(' Отображение выбранного checkbox ', () => {
    render(<ListItem id={listItemId} isChecked={true} />);
    const firstCheckbox = screen.getByTestId('checkbox');
    expect(firstCheckbox).toBeInTheDocument();
    expect(firstCheckbox).toHaveAttribute('checked');
  });

  test(' Отображение не выбранного checkbox ', () => {
    render(<ListItem id={listItemId} isChecked={false} />);
    const secondCheckbox = screen.getByTestId('checkbox');
    expect(secondCheckbox).toBeInTheDocument();
    expect(secondCheckbox).not.toHaveAttribute('checked');
  });

  test(' Checkbox, вызов checkHandler с id ', () => {
    const checkHandler = jest.fn();
    render(<ListItem id={listItemId} isChecked={false} checkHandler={checkHandler} />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkHandler).not.toBeCalled();
    fireEvent.click(checkbox);
    expect(checkHandler).toBeCalledWith(listItemId, true);
  });
});
