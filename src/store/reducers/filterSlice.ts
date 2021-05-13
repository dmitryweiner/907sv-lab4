import { Action, ACTION_TYPES } from '../actions';

export enum FILTER_STATE {
  ALL_DEEDS,
  DONE_DEEDS,
  NOT_DONE_DEEDS
}

// export type FILTER_SEARCH_STATE = {
//   SUBSTRING_SEARCH
// }

export type FilterSlice = {
  substringValue: string;
  filterState: FILTER_STATE;
};
export const filterInitialState: FilterSlice = {
  substringValue: '',
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
    case ACTION_TYPES.FILTER_SUBSTRING: {
      return {
        ...state,
        substringValue: action.payload
      };
    }
    default:
      return state;
  }
}
