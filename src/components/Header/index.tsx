import React from 'react';
import {
  BrowserRouter as Router, Link, Routes, Route,
} from 'react-router-dom';
import About from '../Pages/About';
import Dictionary from '../Pages/Dictionary';
import Home from '../Pages/Home';

function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dictionary">Dictionary</Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </nav>
      </div>
    </Router>

  );
}

export default Navigation;
