import { combineReducers } from 'redux';
import { reducer as todoReducer } from './todoReducer';
import { reducer as alertReducer } from './alertReducer';
import { reducer as authReducer } from './authReducer';
import { AlertI } from '../interfaces/alertinterface';
import { TodoI } from '../interfaces/todoInterface';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { AuthI } from '../interfaces/authInterface';

export type Store = {
  todo: TodoI;
  alert: AlertI;
  auth: AuthI;
};

const store = createStore(
  combineReducers({
    todo: todoReducer,
    alert: alertReducer,
    auth: authReducer
  }),
  applyMiddleware(thunkMiddleware)
);

export type AppDispatch = typeof store.dispatch;

export default store;
