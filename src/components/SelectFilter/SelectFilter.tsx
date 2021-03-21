import React, { ChangeEvent } from 'react';
import { selectOptions } from './selectOptions';
import { FILTER } from '../../store/types';
import { useDispatch } from 'react-redux';

function SelectFilter() {
  const dispatch = useDispatch();
  function selectHandler(event: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: FILTER,
      payload: event.target.value
    });
  }

  return (
    <select data-testid="select" onChange={selectHandler}>
      {Object.keys(selectOptions).map((item, index) => (
        <option data-testid={index} key={index} value={item}>
          {Object.values(selectOptions)[index]}
        </option>
      ))}
    </select>
  );
}

export default SelectFilter;
