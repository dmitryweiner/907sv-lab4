import { createStore } from 'redux';
import rootReducer from './reducers/reducersIndex';
import { todosInitialState, TodosSlice } from './reducers/todosSlice';
import { filterInitialState, FilterSlice } from './reducers/filterSlice';

export interface Item {
  id: string;
  isChecked: boolean;
  title: string;
}

export type Store = {
  todos: TodosSlice;
  filter: FilterSlice;
};

export const initialState: Store = {
  todos: todosInitialState,
  filter: filterInitialState
};

export { rootReducer }; // !!!
const store = createStore(rootReducer);
export default store;
