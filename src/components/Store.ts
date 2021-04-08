export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down'
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

export type Action = ActionAdd | ActionDelete | ActionCheck | ActionMoveUp | ActionMoveDown;

export interface Item {
  id: string;
  isChecked: boolean;
  title: string;
}

export const initialState: Item[] = [];

export function reducer(action: Action, prevState = initialState): Item[] {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newElement = {
        id: Math.random().toString(36).substr(2),
        isChecked: false,
        title: action.payload
      };
      return [...prevState, newElement];
    }

    case ACTION_TYPES.CHECK: {
      return [
        ...prevState.map(function (item) {
          if (item.id === action.payload) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        })
      ];
    }

    case ACTION_TYPES.DELETE: {
      return [...prevState.filter(item => item.id !== action.payload)];
    }

    case ACTION_TYPES.MOVE_UP: {
      const indexOfMovingUpItem = prevState.findIndex(item => item.id === action.payload);
      if (indexOfMovingUpItem === 0) {
        return prevState;
      } else {
        [prevState[indexOfMovingUpItem - 1], prevState[indexOfMovingUpItem]] = [
          prevState[indexOfMovingUpItem],
          prevState[indexOfMovingUpItem - 1]
        ];
        return [...prevState];
      }
    }

    case ACTION_TYPES.MOVE_DOWN: {
      const indexOfMovingDownItem = prevState.findIndex(item => item.id === action.payload);
      if (indexOfMovingDownItem === prevState.length - 1) {
        return prevState;
      } else {
        [prevState[indexOfMovingDownItem], prevState[indexOfMovingDownItem + 1]] = [
          prevState[indexOfMovingDownItem + 1],
          prevState[indexOfMovingDownItem]
        ];
        return [...prevState];
      }
    }
  }
}

export function getFilteredList({
  list,
  isFilterDone = false
}: {
  list: Item[];
  isFilterDone: boolean;
}): Item[] {
  if (isFilterDone === true) {
    return list.filter(item => item.isChecked === true);
  }
  return list;
}
