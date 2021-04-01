import { combineReducers } from 'redux';
import { reducer as todoReducer } from './todoReducer';
import { reducer as alertReducer } from './alertReducer';
import { AlertI } from '../interfaces/alertinterface';
import { TodoI } from '../interfaces/todoInterface';

export type Store = {
  todo: TodoI;
  alert: AlertI;
};

export default combineReducers({
  todo: todoReducer,
  alert: alertReducer
});
