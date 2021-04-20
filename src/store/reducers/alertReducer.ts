import { ACTION_TYPE, ADD, REMOVE } from '../actions/alertAction';
import { AlertI } from '../interfaces/alertinterface';

export const initialState: AlertI = {
  messages: [],
  delay: 3000
};

export function reducer(state: AlertI = initialState, action: ACTION_TYPE): AlertI {
  switch (action.type) {
    case ADD: {
      return { ...state, messages: [action.payload, ...state.messages] };
    }
    case REMOVE: {
      return {
        ...state,
        messages: [...state.messages.filter(message => message.id != action.payload)]
      };
    }
    default: {
      return state;
    }
  }
}
