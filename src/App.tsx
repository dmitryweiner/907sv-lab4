import React from 'react';
import { useState } from 'react';
import './App.css';
import List from './components/List/List';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import { IAction, initialState, reducer, selectFilteredList } from './store';

function App() {
  const [state, setState] = useState(initialState);

  function dispatch(action: IAction) {
    setState(reducer(action, state));
  }

  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Список с чекбоксами</h2>
      </div>
      <div>
        <Form dispatch={dispatch} />
        <div>
          <Filter dispatch={dispatch} state={state} />
        </div>
        <List list={selectFilteredList(state)} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
