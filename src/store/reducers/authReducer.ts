import { AuthI } from '../interfaces/authInterface';
import { ACTION_TYPE, SET_AUTH_STATUS } from '../actions/authAction';

export const initialState: AuthI = {
  isAuth: false
};

export function reducer(state: AuthI = initialState, action: ACTION_TYPE): AuthI {
  switch (action.type) {
    case SET_AUTH_STATUS: {
      return { ...state, isAuth: action.payload };
    }
    default: {
      return state;
    }
  }
}
