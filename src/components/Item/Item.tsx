import React, { useState } from 'react';
import { CHECKED, EDIT, REMOVE } from '../../store/actions/todoAction';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { ItemI } from '../../store/interfaces/itemInterface';

type ItemProps = {
  item: ItemI;
};

function Item({ item }: ItemProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  function dispatchChecked() {
    dispatch({
      type: CHECKED,
      payload: item.index
    });
  }

  function dispatchRemove() {
    dispatch({
      type: REMOVE,
      payload: item.index
    });
  }

  function dispatchEdit() {
    let newItemValue = prompt('Редактирование записи');
    if (newItemValue !== null && newItemValue !== '') {
      setError('');
      dispatch({
        type: EDIT,
        payload: {
          index: item.index,
          newValue: newItemValue
        }
      });
    } else if (newItemValue === '') {
      setError('Новое значение не должно быть пустым');
    }
  }

  return (
    <li>
      <input
        type="checkbox"
        data-testid="checkbox"
        checked={item.isChecked}
        onChange={dispatchChecked}
      />
      <span data-testid="item">{item.value}</span>
      <button data-testid="delete" onClick={dispatchRemove}>
        X
      </button>
      <button data-testid="edit" onClick={dispatchEdit}>
        Редактировать
      </button>
      <span className={styles.error}> {error}</span>
    </li>
  );
}

export default Item;
