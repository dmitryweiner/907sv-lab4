import React from 'react';
import './App.css';
import Form from '../components/Form/Form';
import List from '../components/List/List';
import Filter from '../components/Filter/Filter';
import ItemsCounter from '../components/ItemsCounter/ItemsCounter';
import Alert from '../components/Alert/Alert';

export default function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Form />
      <div>
        <Filter />
      </div>
      <div>
        <ItemsCounter />
      </div>
      <List />
      <Alert />
    </div>
  );
}
