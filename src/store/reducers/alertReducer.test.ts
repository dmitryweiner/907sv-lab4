import { ACTION_TYPE, ADD, REMOVE } from '../actions/alertAction';
import { initialState, reducer } from './alertReducer';
import { AlertMessageI } from '../interfaces/alertMessageInterface';

const newMessage: AlertMessageI = {
  id: 'id',
  message: 'test'
};

test('add alert message', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newMessage
  };
  const state = reducer(initialState, action);
  expect(state.messages.length).toEqual(1);
  expect(state.messages[0]).toHaveProperty('id');
  expect(state.messages[0].message).toEqual(newMessage.message);
});

test('remove alert message', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newMessage
  };
  let state = reducer(initialState, action);
  expect(state.messages.length).toEqual(1);

  const removeAction: ACTION_TYPE = {
    type: REMOVE,
    payload: newMessage.id
  };
  state = reducer(state, removeAction);
  expect(state.messages.length).toEqual(0);
});
