export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down',
  ALL_DEEDS: 'all_deeds',
  DONE_DEEDS: 'done_deeds',
  NOT_DONE_DEEDS: 'not_done_deeds'
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

export interface ActionAllDeeds {
  type: typeof ACTION_TYPES.ALL_DEEDS;
}
export interface ActionDoneDeeds {
  type: typeof ACTION_TYPES.DONE_DEEDS;
}
export interface ActionNotDoneDeeds {
  type: typeof ACTION_TYPES.NOT_DONE_DEEDS;
}

export type Action =
  | ActionAdd
  | ActionDelete
  | ActionCheck
  | ActionMoveUp
  | ActionMoveDown
  | ActionAllDeeds
  | ActionDoneDeeds
  | ActionNotDoneDeeds;
