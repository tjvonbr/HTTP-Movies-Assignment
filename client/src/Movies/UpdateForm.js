import React, { useState } from 'react';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);

  const handleChange = event => {
    event.persist();
    let value = event.target.value;
    setItem({
      ...item,
      [event.target.name]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/update-movie/${item.id}`, item)
      .then(response => console.log(response))
      .catch(error => {
        console.log(error.response)
      })
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
          value={ item.title }
          onChange={ handleChange }
        />
        <input 
          className="input-field"
          type='text'
          placeholder="Director"
          name='director'
          value={ item.director }
          onChange={ handleChange }
        />
        <input 
          className="input-field"
          type='text'
          placeholder="Metascore"
          name='metascore'
          value={ item.metascore }
          onChange={ handleChange }
        />
        <input 
          className="input-field"
          type='text'
          placeholder="Stars of film"
          name='stars'
          value={ item.stars }
          onChange={ handleChange }
        />       
        <button className="btn login-btn">Update</button>
      </form>
    </div>
  )
};

export default UpdateForm;