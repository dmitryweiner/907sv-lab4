import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';

export default function App() {
  const [list, setList] = useState([]);
  const [isDone, setIsDone] = useState(false);

  function add(value) {
    const newValue = {
      id: Math.random().toString(36).substr(2),
      title: value,
      isChecked: false
    };

    setList([...list, newValue]);
  }

  // function reducer(action) {
  //     switch (action.type) {
  //       case add():
  //     }
  // }

  function remove(id) {
    setList([...list.filter(item => item.id !== id)]);
  }

  function changeChecked(id, isChecked) {
    setList([
      ...list.map(function (item) {
        if (item.id === id) {
          return { ...item, isChecked };
        }
        return item;
      })
    ]);
  }

  function filterList(list, isDone) {
    if (!isDone) return list;

    return list.filter(item => item.isChecked);
  }

  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Form handleSubmit={value => add(value)} />
      <div>
        <label>
          Только выполненные
          <input type="checkbox" checked={isDone} onChange={() => setIsDone(!isDone)} />
        </label>
      </div>
      <List list={filterList(list, isDone)} deleteHandler={remove} checkedHandler={changeChecked} />
    </div>
  );
}
