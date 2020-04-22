import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };
  const reloadPage = () => {
    window.location.reload();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(movie.id);
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log(res);
        props.history.push("/");
        reloadPage();
      })
      .catch((err) => console.log("Problem deleting", err));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={handleDelete}>Delete Movie</button>
      <button className="save-button" onClick={saveMovie}>
        Save
      </button>
      <Link to={`/update-movie/${movie.id}`}>
        <button>Update</button>
      </Link>
    </div>
  );
};

export default Movie;
