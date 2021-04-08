import { createStore } from 'redux';
const store = createStore(reducer);
export default store;

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

export interface Item {
  id: string;
  isChecked: boolean;
  title: string;
}

export type Store = {
  list: Item[];
  isFilterDone: boolean;
};

export const initialState: Store = {
  list: [],
  isFilterDone: false
};

export function reducer(state = initialState, action: Action): Store {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newElement = {
        id: Math.random().toString(36).substr(2),
        isChecked: false,
        title: action.payload
      };
      return {
        ...state,
        list: [...state.list, newElement]
      };
    }

    case ACTION_TYPES.CHECK: {
      return {
        ...state,
        list: [
          ...state.list.map(function (item) {
            if (item.id === action.payload) {
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        ]
      };
    }

    case ACTION_TYPES.DELETE: {
      return {
        ...state,
        list: [...state.list.filter(item => item.id !== action.payload)]
      };
    }

    case ACTION_TYPES.MOVE_UP: {
      return {
        ...state,
        list: moveUp(state.list, action.payload)
      };
    }

    case ACTION_TYPES.MOVE_DOWN: {
      return {
        ...state,
        list: moveDown(state.list, action.payload)
      };
    }

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

// these are mutators
function moveUp(list: Item[], id: string): Item[] {
  const indexOfMovingUpItem = list.findIndex(item => item.id === id);
  if (indexOfMovingUpItem === 0) {
    return list;
  } else {
    [list[indexOfMovingUpItem - 1], list[indexOfMovingUpItem]] = [
      list[indexOfMovingUpItem],
      list[indexOfMovingUpItem - 1]
    ];
    return [...list];
  }
}

function moveDown(list: Item[], id: string): Item[] {
  const indexOfMovingDownItem = list.findIndex(item => item.id === id);
  if (indexOfMovingDownItem === list.length - 1) {
    return list;
  } else {
    [list[indexOfMovingDownItem], list[indexOfMovingDownItem + 1]] = [
      list[indexOfMovingDownItem + 1],
      list[indexOfMovingDownItem]
    ];
    return [...list];
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
