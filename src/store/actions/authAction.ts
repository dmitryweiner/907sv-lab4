import { AppDispatch } from '../reducers';
import api, { REQUEST_STATUS } from '../../api/Api';
import { ADD as ADD_ALERT } from './alertAction';
import { SET_REQUEST_STATUS } from './todoAction';
import { AlertMessageI } from '../interfaces/alertMessageInterface';

export const SET_AUTH_STATUS = 'AUTH/setAuthStatus';

interface setAuthStatus {
  type: typeof SET_AUTH_STATUS;
  payload: boolean;
}

function getAlertMessage(error: string): AlertMessageI {
  return {
    id: Math.random().toString(36).substr(2),
    message: error
  };
}

export const auth = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.auth(username, password);
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: SET_AUTH_STATUS, payload: data.isAuth });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.checkAuth();
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: SET_AUTH_STATUS, payload: data.isAuth });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING });
    const data = await api.logout();
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE });
    dispatch({ type: SET_AUTH_STATUS, payload: data.isAuth });
  } catch (error) {
    dispatch({ type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.ERROR });
    dispatch({ type: ADD_ALERT, payload: getAlertMessage(error.message) });
  }
};

export type ACTION_TYPE = setAuthStatus;
