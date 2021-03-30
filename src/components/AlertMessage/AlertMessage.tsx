import React from 'react';
import { AlertMessageI } from '../../store/interfaces/alertMessageInterface';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { REMOVE } from '../../store/actions/alertAction';

type AlertMessagePost = {
  error: AlertMessageI;
};

function AlertMessage({ error }: AlertMessagePost) {
  const dispatch = useDispatch();
  function removeDispatch() {
    dispatch({
      type: REMOVE,
      payload: error.index
    });
  }

  return (
    <div onClick={removeDispatch} data-testid="alert-message" className={styles.error_message}>
      <span className={styles.span}>{error.message}</span>
    </div>
  );
}

export default AlertMessage;
