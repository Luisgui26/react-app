import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.jpg'
import MovieCard from "./MovieCard";
import { createContext } from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null)

const API_URL = 'https://www.omdbapi.com?apikey=bb0f8253';



const App = () => {

  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => {
    setTheme((curr) => (curr ==='light' ? 'dark' : 'light'));
  }

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="app" id={theme}>
        <h1>MovieFinder</h1>
        <div className='switch'>
          <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
        </div>

        <div className="search">
          <input 
            placeholder="Search for Movies"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            />

          <img
            src={SearchIcon}
            alt='search'
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0
          ?(
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
          ) :
          (
            <div className="empty">
              <h2>No movies found</h2>
              </div>
          )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
