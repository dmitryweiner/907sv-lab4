import { REQUEST_STATE_TYPES, Store } from '../store/store';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Alert() {
  const requestState = useSelector((state: Store) => state.requestState);
  const error = useSelector((state: Store) => state.error);

  return (
    <div>
      {requestState === REQUEST_STATE_TYPES.LOADING && (
        <>
          <div>Загрузка...</div>
        </>
      )}

      {requestState === REQUEST_STATE_TYPES.ERROR && (
        <>
          <div className="errorMessage">{error}</div>
        </>
      )}
    </div>
  );
}
