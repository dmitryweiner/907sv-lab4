import React from 'react';
import './App.css';
import Form from './components/Form/Form';
import List from './components/List/List';
import {
  getFilteredList,
  moveUpHandler,
  moveDownHandler,
  addHandler,
  deleteHandler,
  checkHandler
} from './components/Store';

function App() {
  const [list, setList] = React.useState([]);
  const [isFilterDone, setIsFilterDone] = React.useState(false);
  return (
    <div className="body">
      <div className="appWrapper">
        <div className="name">
          <h1>ᕕ( ᐛ )ᕗ To do:</h1>
        </div>
        <Form
          addHandler={value => setList(addHandler(list, value))}
          isFilterDone={isFilterDone}
          filterHandler={() => setIsFilterDone(!isFilterDone)}
        />
        <List
          list={getFilteredList(list, isFilterDone)}
          deleteHandler={id => setList(deleteHandler(list, id))}
          checkHandler={id => setList(checkHandler(list, id))}
          moveUpHandler={id => setList(moveUpHandler(list, id))}
          moveDownHandler={id => setList(moveDownHandler(list, id))}
        />
      </div>
    </div>
  );
}

export default App;
