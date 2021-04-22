import React from 'react';
import StarrySky from '../../components/StarrySky/StarrySky';
import DayNightToggle from '../../components/DayNightToggle/DayNightToggle';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Alert from '../../components/Alert/Alert';
import Form from '../../components/Form/Form';
import SelectFilter from '../../components/SelectFilter/SelectFilter';
import Search from '../../components/Search/Search';
import Counter from '../../components/Counter/Counter';
import List from '../../components/List/List';
import './styles.css';

function TodoView() {
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
}

export default TodoView;
