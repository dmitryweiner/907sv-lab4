import { Action, ACTION_TYPES } from '../actions';

export type FilterSlice = {
  isFilterDone: boolean;
};

export const filterInitialState: FilterSlice = {
  isFilterDone: false
};

export function filterReducer(state = filterInitialState, action: Action): FilterSlice {
  switch (action.type) {
    case ACTION_TYPES.IS_FILTER_DONE: {
      return {
        ...state,
        isFilterDone: !state.isFilterDone
      };
    }

    default:
      return state;
  }
}
