import React from 'react';
import './App.css';
import List from './components/List/List';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';

function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Список с чекбоксами</h2>
      </div>
      <div>
        <Form />
        <div>
          <Filter />
        </div>
        <List />
      </div>
    </div>
  );
}

export default App;
