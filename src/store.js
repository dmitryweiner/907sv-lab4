import { createStore } from 'redux';

const initialState = {
  list: []
};
export const ACTION_TYPES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  CHECK: 'CHECK'
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      let item_id = Math.random() * (10000 - 1) + 1;
      const item = {
        id: item_id,
        title: action.payload,
        isChecked: false
      };
      return {
        ...state,
        list: [...state.list, item]
      };
    }
    case ACTION_TYPES.CHECK: {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          state.list[i].isChecked = !state.list[i].isChecked;
        }
      }
      return { ...state, list: [...state.list] };
    }
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
