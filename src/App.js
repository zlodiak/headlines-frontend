import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('Search:', searchValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        Генератор креативных заголовков
      </header>

      <main className="App-main">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Введите тему..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Сгенерировать заголовки</button>
        </div>

        <div className="results-container">
          results
        </div>
      </main>

      <footer className="App-footer">
        (c) 2026
      </footer>
    </div>
  );
}

export default App;
