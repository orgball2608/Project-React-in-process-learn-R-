import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import useHttp from "./hooks/use-http";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const transformMovies = useCallback((moviesData) => {
    const loadedMovies = [];
    for (const key in moviesData) {
      loadedMovies.push({
        id: key,
        title: moviesData[key].title,
        openingText: moviesData[key].openingText,
        releaseDate: moviesData[key].releaseDate,
      });
    }
    setMovies(loadedMovies);
  }, []);

  const httpData = useHttp(
    {
      url: "https://react-api-923e3-default-rtdb.firebaseio.com/movies.json",
    },
    transformMovies
  );

  const { isLoading, error, sendRequest: fetchMovies } = httpData;

  useEffect(() => {
    fetchMovies();
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-api-923e3-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
