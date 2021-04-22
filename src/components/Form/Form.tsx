import React, { FormEvent, useEffect, useState } from 'react';
import { addItem, REMOVELIST } from '../../store/actions/todoAction';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../store/reducers';
import { REQUEST_STATUS } from '../../api/Api';
import styles from './style.module.css';

function Form() {
  const [value, setValue] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const reqStatus = useSelector((state: Store) => state.todo.requestStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reqStatus === REQUEST_STATUS.LOADING) {
      setDisabled(true);
    }
    if (reqStatus === REQUEST_STATUS.ERROR) {
      setDisabled(false);
    }
    if (reqStatus === REQUEST_STATUS.IDLE) {
      setDisabled(false);
      setValue('');
    }
  }, [reqStatus]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(addItem(value));
  }

  function removeListDispatch() {
    dispatch({
      type: REMOVELIST
    });
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmit}>
        <div className={styles.form}>
          <input
            data-testid="input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button disabled={disabled} type="submit" onClick={handleSubmit}>
            Добавить
          </button>
          <button onClick={removeListDispatch}>Очистить список</button>
        </div>
      </form>
    </>
  );
}

export default Form;
