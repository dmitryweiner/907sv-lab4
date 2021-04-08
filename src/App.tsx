import React from 'react';
import './App.css';
import Form from './components/Form/Form';
import List from './components/List/List';
import { reducer, getFilteredList } from './components/Store';

function App() {
  const [list, setList] = React.useState([]);
  const [isFilterDone, setIsFilterDone] = React.useState(false);

  function dispatch(action) {
    setList(reducer(action, list));
  }

  return (
    <div className="body">
      <div className="appWrapper">
        <div className="name">
          <h1>ᕕ( ᐛ )ᕗ To do:</h1>
        </div>
        <Form
          dispatch={dispatch}
          isFilterDone={isFilterDone}
          filterHandler={() => setIsFilterDone(!isFilterDone)}
        />
        <List list={getFilteredList(list, isFilterDone)} dispatch={dispatch} />
      </div>
    </div>
  );
}
export default App;
