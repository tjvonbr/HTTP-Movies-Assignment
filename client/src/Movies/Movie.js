import React, { useState, useEffect } from "react";
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import axios from "axios";
import MovieCard from "./MovieCard";

const Movie = props => {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (props.match.params.id !== props.match.params.id)
    fetchMovie(props.match.params.id);
  }, [props.match.params.id])

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button className="save-btn" onClick={saveMovie}>
        Save
      </button>
      <Link to={`/update-movie/${movie.id}`}>
        <button className="update-btn">
          Update
        </button>
      </Link>
      <Redirect
        to={{
          pathname: "/update-movie/:id",
          state: {referrer: movie}
        }}
      />
    </div>
  );
};

export default Movie;