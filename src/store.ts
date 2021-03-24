export interface IItem {
  id: string;
  title: string;
  isChecked: boolean;
}

export const ACTION_TYPES = {
  ADD: 'add',
  REMOVE: 'remove',
  CHECKED: 'checked',
  EDIT: 'edit',
  SELECT_BY_FILTER: 'selectByFilter',
  SELECT_BY_SEARCH_STRING: 'selectBySearchString'
} as const;

export type ACTION_TYPE =
  | typeof ACTION_TYPES.ADD
  | typeof ACTION_TYPES.EDIT
  | typeof ACTION_TYPES.REMOVE
  | typeof ACTION_TYPES.CHECKED
  | typeof ACTION_TYPES.SELECT_BY_FILTER
  | typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING;

export type IAction =
  | IActionAdd
  | IActionRemove
  | IActionChecked
  | IActionEdit
  | IActionSelectByFilter
  | IActionSelectBySearchString;

export const SELECT_FILTER_TYPES = {
  ALL: 'Все',
  DONE: 'Выполненные',
  NOT_DONE: 'Не выполненные'
} as const;

export type SELECT_FILTER_TYPE =
  | typeof SELECT_FILTER_TYPES.ALL
  | typeof SELECT_FILTER_TYPES.DONE
  | typeof SELECT_FILTER_TYPES.NOT_DONE;

export interface IActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface IActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: string;
}

export interface IActionChecked {
  type: typeof ACTION_TYPES.CHECKED;
  payload: string;
}

export interface IActionEdit {
  type: typeof ACTION_TYPES.EDIT;
  payload: {
    id: string;
    title: string;
  };
}

export interface IActionSelectByFilter {
  type: typeof ACTION_TYPES.SELECT_BY_FILTER;
  payload: SELECT_FILTER_TYPE;
}

export interface IActionSelectBySearchString {
  type: typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING;
  payload: string;
}

export type StateType = {
  list: IItem[];
  filter: SELECT_FILTER_TYPE;
  substring: string;
};

export const initialState = {
  list: [],
  filter: SELECT_FILTER_TYPES.ALL,
  substring: ''
};

export default function reducer(action: IAction, state: StateType = initialState): StateType {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newValue = {
        id: Math.random().toString(36).substr(2),
        title: action.payload,
        isChecked: false
      };
      return { ...state, list: [...state.list, newValue] };
    }
    case ACTION_TYPES.REMOVE: {
      return { ...state, list: [...state.list.filter(item => item.id !== action.payload)] };
    }
    case ACTION_TYPES.CHECKED: {
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
    case ACTION_TYPES.EDIT: {
      return {
        ...state,
        list: [
          ...state.list.map(function (item) {
            if (item.id === action.payload.id) {
              return { ...item, title: action.payload.title };
            }
            return item;
          })
        ]
      };
    }
    case ACTION_TYPES.SELECT_BY_FILTER: {
      return { ...state, filter: action.payload };
    }
    case ACTION_TYPES.SELECT_BY_SEARCH_STRING: {
      return { ...state, substring: action.payload };
    }
    default:
      return state;
  }
}

export function selectByFilter(list: IItem[], filter: SELECT_FILTER_TYPE) {
  if (filter === SELECT_FILTER_TYPES.DONE) return list.filter(item => item.isChecked);
  if (filter === SELECT_FILTER_TYPES.NOT_DONE) return list.filter(item => !item.isChecked);
  return list;
}

export function selectBySearchString(list: IItem[], substring: string) {
  if (substring === '') return list;
  return list.filter(item => item.title.toLowerCase().indexOf(substring.toLowerCase()) != -1);
}

export function selectFilteredList(state: StateType): IItem[] {
  return selectByFilter(selectBySearchString(state.list, state.substring), state.filter);
}
