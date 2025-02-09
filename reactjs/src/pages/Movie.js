import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Movie() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    director: "",
    releaseYear: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getMovie();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getMovie = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setValues({
            title: data.title,
            director: data.director,
            releaseYear: data.releaseYear,
          });
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies/${id}`, {
        method: `PATCH`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies/${id}`, {
        method: `DELETE`,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setMovies(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || `Unexpected Error`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMovie();
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
        <Link className="Link" to="/dashboard">
          Dashboard
        </Link>
        <h1>Movie Info</h1>
        <div className="movie-info">
          <h4>{values && values.title}</h4>
          <h5>{values && values.director}</h5>
          <h5>{values && values.releaseYear}</h5>
        </div>

        <div className="form">
          <form onSubmit={(event) => handleSubmit(event)}>
            <label className="formLabel">
              Title:&nbsp;
              <input
                className="formInput"
                type="text"
                name="title"
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
                value={values.releaseYear}
                onChange={handleInputChanges}
              />
            </label>
            <button className="button" type="submit">
              Edit Movie Info
            </button>
            <button className="deleteButton" onClick={() => deleteMovie()}>
              Delete Movie
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Movie;
