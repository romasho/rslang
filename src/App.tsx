import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Authorization, Home, Dictionary, AudioCall, Sprint } from './components/Pages';


function App() {
  return (

    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/authorization' element={<Authorization />} />
          <Route path='/audio-call' element={<AudioCall />} />
          <Route path='/sprint' element={<Sprint />} />
        </Routes>
      </main>
    </Router>

  );
}

export default App;
