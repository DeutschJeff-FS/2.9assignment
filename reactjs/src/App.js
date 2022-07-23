import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Movie from "./pages/Movie";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:id" exact element={<Movie />}></Route>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
