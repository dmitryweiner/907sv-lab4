import React, { useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Form from './components/Form';
import List from './components/List';
import Checkbox from '@material-ui/core/Checkbox';
import 'fontsource-roboto';
import { selectBySearchBar, initialState } from './store';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);
  const [state] = useState(initialState);

  function MyCheckbox() {
    return <Checkbox checked={isDone} onChange={() => setIsDone(!isDone)} />;
  }

  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Filter />
      <Form />
      <div>
        <label>
          Только выполненные
          <MyCheckbox />
        </label>
      </div>
      <List list={selectBySearchBar(state)} dispatch={dispatch} />
    </div>
  );
}
