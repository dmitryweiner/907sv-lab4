import React, { FormEvent, useState } from 'react';
import { ADD, REMOVELIST } from '../../store/types';
import styles from './style.module.css';
import { ItemI } from '../../store/interfaces/itemInterface';
import { useDispatch, useSelector } from 'react-redux';
import { ListI } from '../../store/interfaces/listInterface';

function Form() {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const list = useSelector((state: ListI) => state.items);

  function checkTitleUnique() {
    let check = true;

    list.map(item => {
      if (item.value === value) check = false;
    });
    return check;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (value === '') {
      setError('Поле пустое, как твоя голова');
    } else {
      setError('');

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
        setError('');
      } else {
        setError('Запись уже есть');
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
        <div>
          <span className={styles.error}>{error}</span>
        </div>
      </form>
      <button onClick={removeListDispatch}>Очистить список</button>
    </>
  );
}

export default Form;
