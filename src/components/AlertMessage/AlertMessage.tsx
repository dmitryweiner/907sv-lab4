import React, { useEffect, useState } from 'react';
import { AlertMessageI } from '../../store/interfaces/alertMessageInterface';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE } from '../../store/actions/alertAction';
import { Store } from '../../store/reducers';

type AlertMessagePost = {
  error: AlertMessageI;
};

function AlertMessage({ error }: AlertMessagePost) {
  const dispatch = useDispatch();
  const [fadeIn, setFadeIn] = useState(styles.fadeInLeft);
  const delay = useSelector((state: Store) => state.alert.delay);

  useEffect(() => {
    const timeout = setTimeout(() => removeDispatch(), delay);
    return () => clearTimeout(timeout);
  }, []);

  function removeDispatch() {
    setFadeIn(styles.fadeOut);
    setTimeout(
      () =>
        dispatch({
          type: REMOVE,
          payload: error.index
        }),
      1000
    );
  }

  return (
    <div
      onClick={removeDispatch}
      data-testid="alert-message"
      className={styles.error_message + ' ' + styles.animate + ' ' + fadeIn}
      id={error.index}
    >
      <span>{error.message}</span>
    </div>
  );
}

export default AlertMessage;
