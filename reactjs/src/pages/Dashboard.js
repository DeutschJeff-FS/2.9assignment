import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import moviesService from "../services/movies.service";
import "../App.css";

function Dashboard() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    director: "",
    releaseYear: "",
  });

  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    moviesService.getAllPrivateMovies().then(
      (res) => {
        setMovies(res.data);
      },
      (error) => {
        console.log("Secured Page Error: ", error.res);
        if (error.res && error.res.status === 403) {
          authService.logout();
          navigate("/login");
        }
      }
    );
    // if (!ignore) {
    //   getMovies();
    // }
    // return () => {
    //   ignore = true;
    // };
  }, []);

  const getMovies = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setMovies(data);
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const createMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => getMovies());
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMovie();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link className="Link" to="/">
          Home
        </Link>
        <h1>Movies</h1>
        <div className="movie-list">
          <ul>
            {movies &&
              movies.map((movie) => {
                return (
                  <li key={movie._id}>
                    <Link className="Link" to={`/movies/${movie._id}`}>
                      {movie.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label className="formLabel">
            Title:&nbsp;
            <input
              className="formInput"
              type="text"
              name="title"
              placeholder="movie title"
              value={values.title}
              onChange={handleInputChanges}
            />
          </label>
          <label className="formLabel">
            Director:&nbsp;
            <input
              className="formInput"
              type="text"
              name="director"
              placeholder="movie director"
              value={values.director}
              onChange={handleInputChanges}
            />
          </label>
          <label className="formLabel">
            Year Released:&nbsp;
            <input
              className="formInput"
              type="text"
              name="releaseYear"
              placeholder="movie release year"
              value={values.releaseYear}
              onChange={handleInputChanges}
            />
          </label>
          <button className="button" type="submit">
            Add Movie
          </button>
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
