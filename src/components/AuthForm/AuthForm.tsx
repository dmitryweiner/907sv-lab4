import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../store/actions/authAction';

function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(auth(username, password));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Имя"
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" onSubmit={handleSubmit}>
            Войти
          </button>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
