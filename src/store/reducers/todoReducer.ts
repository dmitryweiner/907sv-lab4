import { TodoI } from '../interfaces/todoInterface';
import { REQUEST_STATUS } from '../../api/Api';
import {
  ACTION_TYPE,
  ADD,
  ADD_ALL,
  CHECKED,
  EDIT,
  FILTER,
  REMOVE,
  REMOVELIST,
  SEARCH,
  SET_REQUEST_STATUS
} from '../actions/todoAction';

export const selectOptions = {
  All: 'Все',
  Completed: 'Выполненные',
  NotCompleted: 'Не выполненные'
};

export const initialState: TodoI = {
  items: [],
  filter: selectOptions.All,
  search: '',
  requestStatus: REQUEST_STATUS.IDLE
};

export function reducer(state: TodoI = initialState, action: ACTION_TYPE): TodoI {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case ADD_ALL: {
      return { ...state, items: action.payload };
    }
    case REMOVE: {
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== action.payload)]
      };
    }
    case CHECKED: {
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.id === action.payload) {
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        ]
      };
    }
    case REMOVELIST: {
      return initialState;
    }
    case EDIT: {
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.id === action.payload.id) {
              return { ...item, value: action.payload.newValue };
            } else {
              return item;
            }
          })
        ]
      };
    }
    case FILTER: {
      return { ...state, filter: action.payload };
    }
    case SEARCH: {
      return { ...state, search: action.payload };
    }
    case SET_REQUEST_STATUS: {
      return { ...state, requestStatus: action.payload };
    }
    default:
      return state;
  }
}
