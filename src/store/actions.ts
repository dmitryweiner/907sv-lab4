import { FILTER_STATE } from './reducers/filterSlice';

export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down',
  CHANGE_FILTER_STATE: 'change_filter_state',
  FILTER_SUBSTRING: 'filter_substring'
  // CHANGE_FILTER_SEARCH: 'change_filter_search'
} as const;

export interface ActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface ActionDelete {
  type: typeof ACTION_TYPES.DELETE;
  payload: string;
}

export interface ActionCheck {
  type: typeof ACTION_TYPES.CHECK;
  payload: string;
}

export interface ActionMoveUp {
  type: typeof ACTION_TYPES.MOVE_UP;
  payload: string;
}

export interface ActionMoveDown {
  type: typeof ACTION_TYPES.MOVE_DOWN;
  payload: string;
}

export interface ActionChangeFilterState {
  type: typeof ACTION_TYPES.CHANGE_FILTER_STATE;
  payload: FILTER_STATE;
}

export interface ActionFilterSubstring {
  type: typeof ACTION_TYPES.FILTER_SUBSTRING;
  payload: string;
}

// export interface ActionChangeFilterSearch {
//   type: typeof ACTION_TYPES.CHANGE_FILTER_SEARCH;
//   payload: FILTER_SEARCH_STATE;
// }

export type Action =
  | ActionAdd
  | ActionDelete
  | ActionCheck
  | ActionMoveUp
  | ActionMoveDown
  | ActionChangeFilterState
  | ActionFilterSubstring;
  // | ActionChangeFilterSearch;
