import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPES } from '../../store/actions';
import { Store } from "../../store";

function Form() {
  const list = useSelector((state: Store) => state.todos.list);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function innerSubmit(e: FormEvent) {
    e.preventDefault();
    if (inputValue === '') {
      return setErrorMessage('Enter something first (￢_￢;)');
    }
    if (list.some(item => item.title.toLowerCase() === inputValue.toLowerCase())) {
      return setErrorMessage('You already have such deed (>_<)');
    }
    setErrorMessage('');
    setInputValue('');
    return dispatch({ type: ACTION_TYPES.ADD, payload: inputValue.trim() });
  // trim для обрезки пробелов в начале и конце
  }

  return (
    <div>
      <form onSubmit={innerSubmit}>
        <input
          id="formInput"
          type="text"
          placeholder="Enter a deed"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button id="formAddButton" data-testid="I'm addButton" type="submit">
          Add a deed
        </button>
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </div>
  );
}
export default Form;
