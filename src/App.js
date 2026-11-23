import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [themes, setThemes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    console.log('themes updated:', themes);
  }, [themes]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/generate-headlines?searchValue=${encodeURIComponent(searchValue)}`
      );

      const data = await response.json();
      console.log('Headlines:', data);
      
      if (data.data) {
        setThemes(data.data);
        setHasSearched(true);
      } else {
        console.log('error recieving data');
        setThemes([]);
        setHasSearched(true);        
        setError('Некорректное название темы. Повторите попытку.');
      }
    } catch (error) {
      console.error('Error:', error);
      setThemes([]);
      setHasSearched(true);
      setError('Не удалось загрузить данные. Повторите попытку.');
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
          <button className="search-button" onClick={handleSearch} disabled={!searchValue}>Сгенерировать заголовки</button>
        </div>

        {hasSearched && (
          <div className="results-container">
            <pre>
              <ol>
                {Object.entries(themes).map(([key, value]) => (
                  <li key={key}>
                    {value}
                  </li>
                ))}
              </ol>              
            </pre>
          </div>
        )}
      </main>

      {error && (
        <div className="snackbar" role="alert">
          <span>{error}</span>
          <button className="snackbar-close" onClick={() => setError(null)}>×</button>
        </div>
      )}

      <footer className="App-footer">
        (c) 2026
      </footer>
    </div>
  );
}

export default App;
