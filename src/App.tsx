import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';

import { About, Home, Dictionary } from './components/Pages';


function App() {
  return (

    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
