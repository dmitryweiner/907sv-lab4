import React from 'react';
import { ACTION_TYPES, IAction, State } from '../../store';

type FilterProps = {
  dispatch: (action: IAction) => void;
  state: State;
};

export default function Filter({ dispatch, state }: FilterProps) {
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
        <label>
          Фильтр:
          <input />
        </label>
      </div>
    </>
  );
}
