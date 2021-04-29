import { Action, ACTION_TYPES } from '../actions';

export type FilterSlice = {
  isAllDeedsChecked: boolean;
  isDoneDeedsChecked: boolean;
  isNotDoneDeedsChecked: boolean;
};

export const filterInitialState: FilterSlice = {
  isAllDeedsChecked: true,
  isDoneDeedsChecked: false,
  isNotDoneDeedsChecked: false
};

export function filterReducer(state = filterInitialState, action: Action): FilterSlice {
  switch (action.type) {
    case ACTION_TYPES.ALL_DEEDS: {
      return {
        ...state,
        isAllDeedsChecked: !state.isAllDeedsChecked
      };
    }

    case ACTION_TYPES.DONE_DEEDS: {
      return {
        ...state,
        isDoneDeedsChecked: !state.isDoneDeedsChecked
      };
    }

    case ACTION_TYPES.NOT_DONE_DEEDS: {
      return {
        ...state,
        isNotDoneDeedsChecked: !state.isNotDoneDeedsChecked
      };
    }

    default:
      return state;
  }
}
