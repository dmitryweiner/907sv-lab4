import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions';
import { Store } from '../../store';

function SelectFilter() {
  const dispatch = useDispatch();
  const isFilterDone = useSelector((state: Store) => state.filter.isFilterDone);
  function filterHandler() {
    dispatch({
      type: ACTION_TYPES.IS_FILTER_DONE
    });
  }

  return (
    <div>
      <input
        type="checkbox"
        data-testid="filterCheckbox"
        checked={isFilterDone}
        onChange={filterHandler}
      />
      {' show only done deeds '}
    </div>
  );
}
export default SelectFilter;
