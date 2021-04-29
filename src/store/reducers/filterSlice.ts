import { Action, ACTION_TYPES } from '../actions';

export enum FILTER_STATE {
  ALL_DEEDS,
  DONE_DEEDS,
  NOT_DONE_DEEDS
}
export type FilterSlice = {
  filterState: FILTER_STATE;
};
export const filterInitialState: FilterSlice = {
  filterState: FILTER_STATE.ALL_DEEDS
};

export function filterReducer(state = filterInitialState, action: Action): FilterSlice {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_FILTER_STATE: {
      return {
        ...state,
        filterState: action.payload
      };
    }
    default:
      return state;
  }
}
