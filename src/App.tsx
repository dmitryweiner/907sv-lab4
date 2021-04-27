import React from 'react';
import './App.css';
import Form from './components/Form/Form';
import List from './components/List/List';
import SelectFilter from './components/SelectFilter/SelectFilter';

function App() {
  return (
    <div className="body">
      <div className="appWrapper">
        <div className="name">
          <h1>ᕕ( ᐛ )ᕗ To do:</h1>
        </div>
        <div className="formWrapper">
          <Form />
          <SelectFilter />
        </div>
        <List />
      </div>
    </div>
  );
}
export default App;
