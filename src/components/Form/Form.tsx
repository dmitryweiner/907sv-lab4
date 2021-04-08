import React, { FormEvent, useState } from 'react';
import { addItem, REMOVELIST } from '../../store/actions/todoAction';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../store/reducers';
import { REQUEST_STATUS } from '../../Api/Api';

function Form() {
  const [value, setValue] = useState<string>('');
  const reqStatus = useSelector((state: Store) => state.todo.requestStatus);
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(addItem(value));
    if (reqStatus === REQUEST_STATUS.IDLE) {
      setValue('');
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
