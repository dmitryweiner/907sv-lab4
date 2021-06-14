import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Form from './components/Form';
import List from './components/List';
import 'fontsource-roboto';
import Selector from './components/Selector';

export default function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №666. Фильтруемый список в React</h2>
      </div>
      <Selector />
      <Filter />
      <Form />
      <List />
    </div>
  );
}
