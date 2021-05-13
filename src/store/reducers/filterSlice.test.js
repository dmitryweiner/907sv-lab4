import { ACTION_TYPES } from '../actions';
import { FILTER_STATE, filterReducer } from './filterSlice';

test('filterReducer', () => {
  const action = {
    type: ACTION_TYPES.CHANGE_FILTER_STATE,
    payload: FILTER_STATE.DONE_DEEDS
  };
  const newFilterState = filterReducer(undefined, action);
  expect(newFilterState.filterState).toEqual(FILTER_STATE.DONE_DEEDS);
});
