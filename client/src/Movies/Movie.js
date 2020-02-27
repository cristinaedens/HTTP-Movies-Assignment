import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import MovieCard from './MovieCard';


function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history= useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };
  

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        axios
        .get("http://localhost:5000/api/movies")
        .then(res => props.setMovieList(res.data))
        history.push("/")
        console.log(res);
      });
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button>
          <Link to={`/update-movie/${movie.id}`}>Edit Movie</Link>
        </button>
        <button onClick={handleDelete}>Delete Movie</button>
    </div>
  );
}

export default Movie;
