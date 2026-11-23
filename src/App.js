import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/generate-headlines?searchValue=${encodeURIComponent(searchValue)}`
      );
      const data = await response.json();
      console.log('Headlines:', data);
      
      if (data.data) {
        const themes = data.data;
        console.log('themes', themes);
      } else {
        console.log('error recieving data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
