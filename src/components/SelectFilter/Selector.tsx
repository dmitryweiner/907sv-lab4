import React, { ChangeEvent } from 'react';
import { ACTION_TYPES, IAction, SELECT_FILTER_TYPE, SELECT_FILTER_TYPES } from '../../store';

type SelectorProps = {
  dispatch: (action: IAction) => void;
  substring: string;
};

export default function Selector({ dispatch, substring }: SelectorProps) {
  function filterHandler(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: e.target.value as SELECT_FILTER_TYPE
    });
  }

  function searchStringHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ACTION_TYPES.SELECT_BY_SEARCH_STRING,
      payload: e.target.value
    });
  }

  return (
    <>
      <select className="filter" data-testid="selector" onChange={filterHandler}>
        {Object.keys(SELECT_FILTER_TYPES).map((item, index) => (
          <option
            data-testid="option"
            key={index}
            value={Object.values(SELECT_FILTER_TYPES)[index]}
          >
            {Object.values(SELECT_FILTER_TYPES)[index]}
          </option>
        ))}
      </select>
      <input
        className="searchString"
        data-testid="searchString"
        value={substring}
        onChange={searchStringHandler}
      />
    </>
  );
}
