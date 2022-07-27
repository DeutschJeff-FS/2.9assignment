import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List Homepage</h1>
        <Link className="Link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="Link" to="/login">
          Login
        </Link>
        <Link className="Link" to="/signup">
          Signup
        </Link>
      </header>
    </div>
  );
}

export default Home;
