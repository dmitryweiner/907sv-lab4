import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addItem, REQUEST_STATE_TYPES, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();
  const requestState = useSelector((state: Store) => state.requestState);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (requestState === REQUEST_STATE_TYPES.SUCCESS) {
      setValue('');
    }
  }, [requestState]);

  function innerSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(addItem(value));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  return (
    <>
      <form data-testid="form" onSubmit={innerSubmit}>
        <div>
          <input data-testid="input" type="text" value={value} onChange={handleChange} />
          <br />
          <button data-testid="handleSubmit" type="submit" className="addBtn">
            Добавить
          </button>
        </div>
      </form>
    </>
  );
}
