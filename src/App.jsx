import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import Checkbox from '@material-ui/core/Checkbox';
import 'fontsource-roboto';

export default function App() {
  const [isDone, setIsDone] = useState(false);

  function MyCheckbox() {
    return <Checkbox checked={isDone} onChange={() => setIsDone(!isDone)} />;
  }

  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №3. Фильтруемый список в React</h2>
      </div>
      <Form />
      <div>
        <label>
          Только выполненные
          <MyCheckbox />
        </label>
      </div>
      <List />
    </div>
  );
}
