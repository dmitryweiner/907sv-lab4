import React from 'react';
import { ACTION_TYPES, Action, SELECTOR_TYPES, Store } from '../../store';

type FilterProps = {
  dispatch: (action: Action) => void;
  state: Store;
};

export default function Filter({ dispatch, state }: FilterProps) {
  const options = [SELECTOR_TYPES.ALL, SELECTOR_TYPES.DONE, SELECTOR_TYPES.NOT_DONE];
  return (
    <>
      <div>
        <label>
          Фильтр:
          <input
            type="text"
            data-testid="search-bar"
            value={state.searchBar}
            onChange={e => dispatch({ type: ACTION_TYPES.SEARCH, payload: e.target.value })}
          />
        </label>
        {options.map(item => (
          <a key={item} onClick={() => dispatch({ type: ACTION_TYPES.FILTER, payload: item })}>
            {item}{' '}
          </a>
        ))}
      </div>
    </>
  );
}
