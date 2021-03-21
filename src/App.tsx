import React from 'react';
import './App.css';
import List from './components/List/List';
import Form from './components/Form/Form';
import SelectFilter from './components/SelectFilter/SelectFilter';
import Search from './components/Search/Search';
import Counter from './components/Counter/Counter';

function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №4 по теме Redux</h2>
      </div>
      <div>
        <Form />
        <SelectFilter />
        <Search />
        <div>
          <Counter />
        </div>
        <List />
      </div>
    </div>
  );
}

export default App;
