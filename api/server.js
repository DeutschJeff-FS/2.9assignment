const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const movieRouter = require("./routes/movies");
const authRouter = require("./routes/auth");

const DATABASE_URL = process.env.DATABASE_URL;

// Setup mongoose to MongoDB connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Database Connection Established.`));

app.use(express.json());
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/auth", authRouter);

// Looks into React build folder for static build
app.use(express.static(path.join(__dirname, "../reactjs/build")));

/**
 * For any routes not defined by API, assume it's a direct request to a clientSide route
 */
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
