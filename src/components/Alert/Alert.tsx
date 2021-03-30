import React from 'react';
import { useSelector } from 'react-redux';
import AlertMessage from '../AlertMessage/AlertMessage';
import { Store } from '../../store/reducers';

function Alert() {
  const messages = useSelector((state: Store) => state.alert.messages);
  return (
    <div data-testid="alert">
      {messages.map(message => (
        <AlertMessage key={message.index} error={message} />
      ))}
    </div>
  );
}

export default Alert;
