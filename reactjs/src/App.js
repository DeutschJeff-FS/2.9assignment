import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import authService from "./services/auth.service";

import Movie from "./pages/Movie";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logout = () => {
    authService.logout();
  };

  return (
    <div>
      <h1>Demo Logging In</h1>
      <div>{currentUser ? <h2>Logged In</h2> : <h2>Logged Out</h2>}</div>
      <section>
        <Routes>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
          <Route path="/movies/:id" exact element={<Movie />}></Route>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
