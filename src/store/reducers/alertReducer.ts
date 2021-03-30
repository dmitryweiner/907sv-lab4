import { ACTION_TYPE, ADD, REMOVE } from '../actions/alertAction';
import { AlertI } from '../interfaces/alertinterface';

export const initialState: AlertI = {
  messages: []
};

export function reducer(state: AlertI = initialState, action: ACTION_TYPE): AlertI {
  switch (action.type) {
    case ADD: {
      console.log(state.messages);
      return { ...state, messages: [...state.messages, action.payload] };
    }
    case REMOVE: {
      return {
        ...state,
        messages: [...state.messages.filter(message => message.index != action.payload)]
      };
    }
    default: {
      return { ...state };
    }
  }
}
