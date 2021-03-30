import { combineReducers } from 'redux';
import { reducer as todoReducer } from './todoReducer';
import { reducer as alertReducer } from './alertReducer';

export default combineReducers({
  todoReducer,
  alertReducer
});
