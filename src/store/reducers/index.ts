import { combineReducers } from 'redux';
import { reducer as todoReducer } from './todoReducer';
import { reducer as alertReducer } from './alertReducer';
import { ListI } from '../interfaces/listInterface';
import { AlertI } from '../interfaces/alertinterface';

export type Store = {
  todo: ListI;
  alert: AlertI;
};

export default combineReducers({
  todo: todoReducer,
  alert: alertReducer
});
