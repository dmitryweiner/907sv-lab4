import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import api from '../api';

export interface IItem {
  id: string;
  title: string;
  isChecked: boolean;
}

export const ACTION_TYPES = {
  ADD: 'add',
  ADD_ALL: 'addAll',
  REMOVE: 'remove',
  CHECKED: 'checked',
  EDIT: 'edit',
  SELECT_BY_FILTER: 'selectByFilter',
  SELECT_BY_SEARCH_STRING: 'selectBySearchString',
  SET_REQUEST_STATE: 'setRequestState',
  SET_ERROR: 'setError'
} as const;

export enum REQUEST_STATE_TYPES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export type ACTION_TYPE =
  | typeof ACTION_TYPES.ADD
  | typeof ACTION_TYPES.ADD_ALL
  | typeof ACTION_TYPES.EDIT
  | typeof ACTION_TYPES.REMOVE
  | typeof ACTION_TYPES.CHECKED
  | typeof ACTION_TYPES.SELECT_BY_FILTER
  | typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING
  | typeof ACTION_TYPES.SET_REQUEST_STATE
  | typeof ACTION_TYPES.SET_ERROR;

export type IAction =
  | IActionAdd
  | IActionAddAll
  | IActionRemove
  | IActionChecked
  | IActionEdit
  | IActionSelectByFilter
  | IActionSelectBySearchString
  | IActionSetRequestState
  | IActionSetError;

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
  payload: IItem;
}

export interface IActionAddAll {
  type: typeof ACTION_TYPES.ADD_ALL;
  payload: IItem[];
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

export interface IActionSetRequestState {
  type: typeof ACTION_TYPES.SET_REQUEST_STATE;
  payload: REQUEST_STATE_TYPES;
}

export interface IActionSetError {
  type: typeof ACTION_TYPES.SET_ERROR;
  payload: string;
}

export type Store = {
  list: IItem[];
  filter: SELECT_FILTER_TYPE;
  substring: string;
  requestState: REQUEST_STATE_TYPES;
  error: string;
};

export const initialState = {
  list: [],
  filter: SELECT_FILTER_TYPES.ALL,
  substring: '',
  requestState: REQUEST_STATE_TYPES.IDLE,
  error: ''
};

export function reducer(state: Store = initialState, action: IAction): Store {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return { ...state, list: [...state.list, action.payload] };
    }
    case ACTION_TYPES.ADD_ALL: {
      return { ...state, list: [...action.payload] };
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
    case ACTION_TYPES.SET_REQUEST_STATE: {
      return { ...state, requestState: action.payload };
    }
    case ACTION_TYPES.SET_ERROR: {
      return { ...state, error: action.payload };
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

export function selectBySearchString(list: IItem[], substring: string): IItem[] {
  if (substring === '') return list;
  return list.filter(item => item.title.toLowerCase().includes(substring.toLowerCase()));
}

export function selectFilteredList(state: Store): IItem[] {
  return selectByFilter(selectBySearchString(state.list, state.substring), state.filter);
}

export function selectItemsCount(state: Store): number {
  return selectFilteredList(state).length;
}

const setRequestState = (requestState: REQUEST_STATE_TYPES) => ({
  type: ACTION_TYPES.SET_REQUEST_STATE,
  payload: requestState
});

const setError = (error: string) => ({
  type: ACTION_TYPES.SET_ERROR,
  payload: error
});

export const addItem = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todos.add({ title });
    dispatch({ type: ACTION_TYPES.ADD, payload: data });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const getItems = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todos.list();
    dispatch({ type: ACTION_TYPES.ADD_ALL, payload: data });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const removeItem = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todos.remove({ id });
    dispatch({ type: ACTION_TYPES.REMOVE, payload: id });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const checkedItem = (id: string, isChecked: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todos.checked({ id, isChecked });
    dispatch({ type: ACTION_TYPES.CHECKED, payload: data.id });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const editItem = (id: string, title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todos.edit({ id, title });
    dispatch({ type: ACTION_TYPES.EDIT, payload: data });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
type AppDispatch = typeof store.dispatch;
export default store;
