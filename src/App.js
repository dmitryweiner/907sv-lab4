import React from 'react';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <div>
        <h1>Список дел</h1>
        <h2>Лабораторная №4. Redux</h2>
      </div>
      <div>
        <input type="text" />
        <button>Добавить</button>
        <div>
          <select>
            <option>Все</option>
            <option>Выполненные</option>
            <option>Невыполненные</option>
          </select>
        </div>
        <ul>
          <li>
            <input type="checkbox" checked />
            Завести рыб
            <button>[x]</button>
          </li>
          <li>
            <input type="checkbox" checked />
            Поиграть в шахматы под водой
            <button>[x]</button>
          </li>
          <li>
            <input type="checkbox" />
            Покормить рыб
            <button>[x]</button>
          </li>
          <li>
            <input type="checkbox" />
            Выгулять картошку
            <button>[x]</button>
          </li>
          <li>
            <input type="checkbox" />
            Полить кошку
            <button>[x]</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
