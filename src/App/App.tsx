import React from 'react';
import './App.css';
import Form from '../components/Form';
import List from '../components/List';
import Filter from '../components/Filter';
import ItemsCounter from '../components/ItemsCounter';
import Alert from '../components/Alert';

export default function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №4. Фильтруемый список в React</h2>
      </div>
      <Form />
      <div>
        <Filter />
      </div>
      <div>
        <ItemsCounter />
      </div>
      <Alert />
      <List />
    </div>
  );
}
