import React from 'react';
import './App.css';
import Form from '../components/Form/Form';
import List from '../components/List/List';
import Selector from '../components/Selector/Selector';

export default function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Form />
      <div>
        <Selector />
      </div>
      <List />
    </div>
  );
}
