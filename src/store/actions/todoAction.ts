import { ItemI } from '../interfaces/itemInterface';
import { AppDispatch } from '../reducers';
import api, { REQUEST_STATUS } from '../../api/Api';
import { ADD as ADD_ALERT } from './alertAction';
import { AlertMessageI } from '../interfaces/alertMessageInterface';

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

function getAlertMessage(error: string): AlertMessageI {
  return {
    id: Math.random().toString(36).substr(2),
    message: error
  };
}

export const addItem = (value: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.add(value);
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: ADD, payload: data });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
  }
};

export const removeTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.remove(id);
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: REMOVE, payload: id });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
  }
};

export const addAllTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.list();
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: ADD_ALL, payload: data });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
  }
};

export const checkedItem = (id: string, isChecked: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.checked(id, isChecked);
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: CHECKED, payload: id });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
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
