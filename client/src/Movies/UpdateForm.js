import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {
  const [movie, setMovie] = useState(null);

  const handleChange = event => {
    setMovie({...movie, [event.target.name]: event.target.value});
  }

  const handleStar = index => event => {
    setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
      return starIndex === index ? event.target.value : star;
    })})
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        console.log(response);
        props.history.push('/');
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.log(error.response));
  }
      
  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <form className="form"
            onSubmit={handleSubmit}>
        <h3 className="form-header">Please update the movie info!</h3>
        <input 
          className="input-field"
          type='text'
          placeholder="Title"
          name='title'
          value={movie.title}
          onChange={handleChange} />
        <input 
          className="input-field"
          type='text'
          placeholder="Director"
          name='director'
          value={ movie.director }
          onChange={handleChange} />
        <input 
          className="input-field"
          type='text'
          placeholder="Metascore"
          name='metascore'
          value={ movie.metascore }
          onChange={handleChange} />
        {movie.stars.map((starName, index) => {
          return <input type="text"
                        placeholder="stars"
                        key={index}
                        value={starName}
                        onChange={handleStar(index)} />  
        })}
        
        <button className="btn login-btn">Update</button>
      </form>
    </div>
  )
};

export default UpdateForm;