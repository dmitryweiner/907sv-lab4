import React, { ChangeEvent } from 'react';
import { selectOptions } from '../../store/reducers/todoReducer';
import { FILTER } from '../../store/actions/todoAction';
import { useDispatch } from 'react-redux';
import './style.css';

function SelectFilter() {
  const options = Object.values(selectOptions);
  const dispatch = useDispatch();
  function selectHandler(event: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: FILTER,
      payload: event.target.value
    });
  }

  return (
    <select data-testid="select" onChange={selectHandler}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectFilter;
