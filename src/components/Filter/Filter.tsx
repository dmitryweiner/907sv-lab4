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
          Показывать только выполненные:
          <input
            type="checkbox"
            data-testid="filter"
            checked={state.isFiltered}
            onChange={() => dispatch({ type: ACTION_TYPES.FILTER })}
          />
        </label>
      </div>
    </>
  );
}
