export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down',
  IS_FILTER_DONE: 'is_filter_done'
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

export interface ActionIsFilterDone {
  type: typeof ACTION_TYPES.IS_FILTER_DONE;
}

export type Action =
  | ActionAdd
  | ActionDelete
  | ActionCheck
  | ActionMoveUp
  | ActionMoveDown
  | ActionIsFilterDone;
