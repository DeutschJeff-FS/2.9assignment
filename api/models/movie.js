const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
