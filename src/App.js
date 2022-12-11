import { useEffect, useState } from "react";

import "./style.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const api_url = "http://www.omdbapi.com/?apikey=9957ba30";

// const obj = {
//   Title: "Batman Forever",
//   Year: "1995",
//   imdbID: "tt0112462",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);

  const [searchterm, setsearchterm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("unknown");
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchterm}
          onChange={(e) => setsearchterm(e.target.value)}
        />
        <img src={searchIcon} alt="Search" onClick={() => searchMovies(searchterm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {/* <MovieCard obj={movies[0]} /> */}
          {movies.map((movie, index) => (
            <MovieCard obj={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
