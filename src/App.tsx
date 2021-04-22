import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store/reducers';
import { checkAuth } from './store/actions/authAction';
import AuthView from './views/AuthView/AuthView';
import TodoView from './views/TodoView/TodoView';

function App() {
  const isAuth = useSelector((state: Store) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (isAuth) {
    return (
      <>
        <TodoView />
      </>
    );
  } else {
    return (
      <>
        <AuthView />
      </>
    );
  }
}

export default App;
