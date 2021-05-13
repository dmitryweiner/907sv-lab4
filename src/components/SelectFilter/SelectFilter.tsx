import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions';
import { Store } from '../../store';
import { FILTER_STATE } from '../../store/reducers/filterSlice';

function SelectFilter() {
  const dispatch = useDispatch();
  const filterState = useSelector((state: Store) => state.filter.filterState);
  const [substringValue, setSubstringValue] = React.useState('');
  function allDeedsHandler() {
    dispatch({
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      payload: FILTER_STATE.ALL_DEEDS
    });
  }
  function doneDeedsHandler() {
    dispatch({
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      payload: FILTER_STATE.DONE_DEEDS
    });
  }
  function notDoneDeedsHandler() {
    dispatch({
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      payload: FILTER_STATE.NOT_DONE_DEEDS
    });
  }
  function searchBySubstringHandler() {
    dispatch({
      type: ACTION_TYPES.FILTER_SUBSTRING,
      // payload:
    });
  }
  // function searchBySubstringHandler() {
  //   dispatch({
  //     type: ACTION_TYPES.CHANGE_FILTER_STATE,
  //     payload: FILTER_STATE.SUBSTRING_SEARCH
  //   });
  // }

  return (
    <div className="filtersWrapper">
      <div>
        <input
          type="checkbox"
          data-testid="allDeedsFilterCheckbox"
          checked={filterState === FILTER_STATE.ALL_DEEDS}
          onChange={allDeedsHandler}
        />
        {' all deeds '}
      </div>
      <div>
        <input
          type="checkbox"
          data-testid="doneDeedsFilterCheckbox"
          checked={filterState === FILTER_STATE.DONE_DEEDS}
          onChange={doneDeedsHandler}
        />
        {' done deeds '}
      </div>
      <div>
        <input
          type="checkbox"
          data-testid="notDoneDeedsFilterCheckbox"
          checked={filterState === FILTER_STATE.NOT_DONE_DEEDS}
          onChange={notDoneDeedsHandler}
        />
        {' not done deeds '}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    data-testid="substringSearchField"*/}
      {/*    value={substringValue}*/}
      {/*    onChange={e => setSubstringValue(e.target.value)}*/}
      {/*  />*/}
      {/*  <button data-testid="substringSearchButton" onClick={searchBySubstringHandler}>*/}
      {/*    Find*/}
      {/*  </button>*/}
      </div>
    </div>
  );
}
export default SelectFilter;
