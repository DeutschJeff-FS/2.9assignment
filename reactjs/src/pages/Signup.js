import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import "../App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await authService.signup(email, password).then(
        (res) => {
          navigate("/dashboard");
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Signup</h1>
        <Link className="Link" to="/dashboard">
          Dashboard
        </Link>
        <section>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
          </form>
        </section>
      </header>
    </div>
  );
}

export default Signup;
