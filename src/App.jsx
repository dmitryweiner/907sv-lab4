import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import reducer, { ACTION_TYPES, selectFilteredList } from './store';
import Checkbox from '@material-ui/core/Checkbox';
import 'fontsource-roboto';

export default function App() {
  const [list, setList] = useState([]);
  const [isDone, setIsDone] = useState(false);

  function dispatch(action) {
    const newList = reducer(action, list);
    setList(newList);
  }

  function MyCheckbox() {
    return <Checkbox checked={isDone} onChange={() => setIsDone(!isDone)} />;
  }

  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Form
        handleSubmit={value =>
          dispatch({
            type: ACTION_TYPES.ADD,
            payload: value
          })
        }
      />
      <div>
        <label>
          Только выполненные
          <MyCheckbox />
        </label>
      </div>
      <List list={selectFilteredList({ list, isDone })} dispatch={dispatch} />
    </div>
  );
}
