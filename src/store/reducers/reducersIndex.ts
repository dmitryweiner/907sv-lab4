import { combineReducers } from 'redux';
import { todosReducer } from './todosSlice';
import { filterReducer } from './filterSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

export default rootReducer;
