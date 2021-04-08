import { ItemI } from '../interfaces/itemInterface';
import { AppDispatch } from '../reducers';
import api, { REQUEST_STATUS } from '../../Api/Api';
import { ADD as ADD_ALERT } from './alertAction';

export const ADD = 'TODO/Add';
export const ADD_ALL = 'TODO/addAll';
export const REMOVE = 'TODO/Remove';
export const REMOVELIST = 'TODO/RemoveList';
export const EDIT = 'TODO/Edit';
export const CHECKED = 'TODO/Checked';
export const FILTER = 'TODO/Filter';
export const SEARCH = 'TODO/search';
export const SET_REQUEST_STATUS = 'TODO/setRequestStatus';

interface AddItem {
  type: typeof ADD;
  payload: ItemI;
}

interface AddAll {
  type: typeof ADD_ALL;
  payload: ItemI[];
}

interface RemoveItem {
  type: typeof REMOVE;
  payload: string;
}

interface RemoveList {
  type: typeof REMOVELIST;
}

interface EditItem {
  type: typeof EDIT;
  payload: {
    id: string;
    newValue: string;
  };
}

interface CheckedItem {
  type: typeof CHECKED;
  payload: string;
}

interface Filter {
  type: typeof FILTER;
  payload: string;
}

interface Search {
  type: typeof SEARCH;
  payload: string;
}

interface SetRequestStatus {
  type: typeof SET_REQUEST_STATUS;
  payload: REQUEST_STATUS;
}

export const addItem = (value: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const response = await api.add(value);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: ADD, payload: data });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: error });
  }
};

export const removeTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const response = await api.remove(id);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: REMOVE, payload: id });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: error });
  }
};

export const addAllTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const response = await api.list();
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: ADD_ALL, payload: data });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: error });
  }
};

export const checkedItem = (id: string, isChecked: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const response = await api.checked(id, isChecked);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: CHECKED, payload: data.id });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: error });
  }
};

export type ACTION_TYPE =
  | AddItem
  | RemoveItem
  | RemoveList
  | EditItem
  | CheckedItem
  | Filter
  | Search
  | SetRequestStatus
  | AddAll;
