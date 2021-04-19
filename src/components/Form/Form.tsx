import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Store, REQUEST_STATE_TYPES, addItem } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();
  const requestState = useSelector((state: Store) => state.requestState);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (requestState === REQUEST_STATE_TYPES.LOADING) {
      setDisabled(true);
    }

    if (requestState === REQUEST_STATE_TYPES.ERROR) {
      setDisabled(false);
    }

    if (requestState === REQUEST_STATE_TYPES.SUCCESS) {
      setDisabled(false);
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
          <button disabled={disabled} data-testid="handleSubmit" type="submit" className="addBtn">
            Добавить
          </button>
        </div>
      </form>
    </>
  );
}
