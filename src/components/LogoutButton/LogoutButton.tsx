import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authAction';

function LogoutButton() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;
