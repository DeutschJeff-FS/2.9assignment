const express = require("express");
const router = express.Router();

const Movie = require("../models/movie");
// RESTful Endpoints
// GET, POST, PATCH, DELETE

const getMovie = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie === null) {
      return res.status(404).json({ message: `Movie Not Found.` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.movie = movie;
  next();
};

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID
router.get("/:id", getMovie, async (req, res, next) => {
  res.json(res.movie);
});

// POST
router.post("/", async (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    releaseYear: req.body.releaseYear,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", getMovie, async (req, res, next) => {
  if (req.body.title != null) {
    res.movie.title = req.body.title;
  }
  if (req.body.director != null) {
    res.movie.director = req.body.director;
  }
  if (req.body.releaseYear != null) {
    res.movie.releaseYear = req.body.releaseYear;
  }
  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getMovie, async (req, res, next) => {
  try {
    await res.movie.remove();
    res.json({ message: `Removed Movie` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
