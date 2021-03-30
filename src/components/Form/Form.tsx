import React, { FormEvent, useState } from 'react';
import { ADD, REMOVELIST } from '../../store/actions/todoAction';
import { ADD as ADD_ALERT } from '../../store/actions/alertAction';
import { ItemI } from '../../store/interfaces/itemInterface';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../store/reducers';
import { AlertMessageI } from '../../store/interfaces/alertMessageInterface';

function Form() {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch();
  const list = useSelector((state: Store) => state.todo.items);

  function checkTitleUnique() {
    let check = true;

    list.map(item => {
      if (item.value === value) check = false;
    });
    return check;
  }

  function alertDispatch(payload: string) {
    const newAlert: AlertMessageI = {
      index: Math.random().toString(36).substr(2),
      message: payload
    };
    dispatch({
      type: ADD_ALERT,
      payload: newAlert
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (value === '') {
      alertDispatch('Поле пустое, как твоя голова');
    } else {
      if (checkTitleUnique()) {
        const newItem: ItemI = {
          index: Math.random().toString(36).substr(2),
          value: value,
          isChecked: false
        };

        dispatch({
          type: ADD,
          payload: newItem
        });
        setValue('');
      } else {
        alertDispatch('Поле уже существует');
      }
    }
  }

  function removeListDispatch() {
    dispatch({
      type: REMOVELIST
    });
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmit}>
        <input
          data-testid="input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Добавить
        </button>
      </form>
      <button onClick={removeListDispatch}>Очистить список</button>
    </>
  );
}

export default Form;
