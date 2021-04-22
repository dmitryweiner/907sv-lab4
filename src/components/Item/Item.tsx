import React, { useState } from 'react';
import { checkedItem, EDIT, removeTodo } from '../../store/actions/todoAction';
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
    dispatch(checkedItem(item.id, !item.isChecked));
  }

  function dispatchRemove() {
    dispatch(removeTodo(item.id));
  }

  function dispatchEdit() {
    let newItemValue = prompt('Редактирование записи');
    if (newItemValue !== null && newItemValue !== '') {
      setError('');
      dispatch({
        type: EDIT,
        payload: {
          index: item.id,
          newValue: newItemValue
        }
      });
      if (newItemValue === '') {
        setError('Новое значение не должно быть пустым');
      }
    }
  }

  return (
    <div className={styles.item}>
      <li>
        <div className={styles.flexItem}>
          <input
            type="checkbox"
            data-testid="checkbox"
            checked={item.isChecked}
            onChange={dispatchChecked}
          />
          <span data-testid="item">{item.title}</span>
          <button data-testid="delete" onClick={dispatchRemove}>
            X
          </button>
          <button data-testid="edit" onClick={dispatchEdit}>
            Редактировать
          </button>
          <span className={styles.error}> {error}</span>
        </div>
      </li>
    </div>
  );
}

export default Item;
