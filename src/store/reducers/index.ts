import { combineReducers } from 'redux';
import { reducer as todoReducer } from './todoReducer';
import { reducer as alertReducer } from './alertReducer';
import { AlertI } from '../interfaces/alertinterface';
import { TodoI } from '../interfaces/todoInterface';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export type Store = {
  todo: TodoI;
  alert: AlertI;
};

const store = createStore(
  combineReducers({
    todo: todoReducer,
    alert: alertReducer
  }),
  applyMiddleware(thunkMiddleware)
);

export type AppDispatch = typeof store.dispatch;

export default store;
