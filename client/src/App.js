import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.log(error.response));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => <MovieList {...props} movies={movies}/>} />
      <Route path="/update-movie/:id" component={UpdateForm} />
      <Route
        path="/movies/:id"
        render={props => {
          const movie = movies.find(movie => movie.id == props.match.params.id);
          if (!movie) {
            return <div>Loading...</div>
          }
          return <Movie {...props} movie={movie} addToSavedList={addToSavedList} />;
        }}
      />
      <button className="btn fetch-btn"
              onClick={getMovies}>
                Restore Movies
      </button>
    </>
  );
};

export default App;
