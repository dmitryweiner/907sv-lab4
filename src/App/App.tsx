import React, { useState } from 'react';
import './App.css';
import Form from '../components/Form/Form';
import List from '../components/List/List';
import reducer, { ACTION_TYPES, IAction, initialState, selectByFilter, StateType } from '../store';
import Selector from '../components/SelectFilter/Selector';

export default function App() {
  const [state, setState] = useState<StateType>(initialState);

  function dispatch(action: IAction) {
    const newList = reducer(action, state);
    setState(newList);
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
        <Selector dispatch={dispatch} substring={state.substring} />
      </div>
      <List state={state} dispatch={dispatch} />
    </div>
  );
}
