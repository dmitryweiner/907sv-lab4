import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions';
import { Store } from '../../store';

function SelectFilter() {
  const dispatch = useDispatch();
  const isAllDeedsChecked = useSelector((state: Store) => state.filter.isAllDeedsChecked);
  const isDoneDeedsChecked = useSelector((state: Store) => state.filter.isDoneDeedsChecked);
  const isNotDoneDeedsChecked = useSelector((state: Store) => state.filter.isNotDoneDeedsChecked);
  function allDeedsHandler() {
    dispatch({
      type: ACTION_TYPES.ALL_DEEDS
    });
  }
  function doneDeedsHandler() {
    dispatch({
      type: ACTION_TYPES.DONE_DEEDS
    });
  }
  function notDoneDeedsHandler() {
    dispatch({
      type: ACTION_TYPES.NOT_DONE_DEEDS
    });
  }

  return (
    <div>
      <input
        type="checkbox"
        data-testid="allDeedsFilterCheckbox"
        checked={isAllDeedsChecked}
        onChange={allDeedsHandler}
      />
      {' all deeds '}
      <input
        type="checkbox"
        data-testid="doneDeedsFilterCheckbox"
        checked={isDoneDeedsChecked}
        onChange={doneDeedsHandler}
      />
      {' done deeds '}
      <input
        type="checkbox"
        data-testid="notDoneDeedsFilterCheckbox"
        checked={isNotDoneDeedsChecked}
        onChange={notDoneDeedsHandler}
      />
      {' not done deeds '}
    </div>
  );
}
export default SelectFilter;
