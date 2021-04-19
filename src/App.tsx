import React, { useEffect } from 'react';
import './App.css';
import List from './components/List/List';
import Form from './components/Form/Form';
import SelectFilter from './components/SelectFilter/SelectFilter';
import Search from './components/Search/Search';
import Counter from './components/Counter/Counter';
import Alert from './components/Alert/Alert';
import StarrySky from './components/StarrySky/StarrySky';
import DayNightToggle from './components/DayNightToggle/DayNightToggle';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store/reducers';
import AuthForm from './components/AuthForm/AuthForm';
import { checkAuth } from './store/actions/authAction';
import LogoutButton from './components/LogoutButton/LogoutButton';

function App() {
  const isAuth = useSelector((state: Store) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (isAuth) {
    return (
      <>
        <StarrySky />
        <DayNightToggle>
          <div className="relative">
            <LogoutButton />
            <Alert />
          </div>
          <div className="wrapper">
            <div>
              <h1>Список дел</h1>
              <h2>Лабораторная №4 по теме Redux</h2>
            </div>
            <div>
              <Form />
              <div className="filter">
                <SelectFilter />
                <Search />
              </div>
              <div>
                <Counter />
              </div>
              <List />
            </div>
          </div>
        </DayNightToggle>
      </>
    );
  } else {
    return (
      <>
        <div className="relative">
          <Alert />
        </div>
        <AuthForm />
      </>
    );
  }
}

export default App;
