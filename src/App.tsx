import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Authorization, Home, Schoolbook, AudioCall, Sprint, Statistic } from './components/Pages';
import { AudioCallProvider } from './components/Pages/AudioCall/context';


function App() {
  return (

    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/schoolbook' element={<Schoolbook />} />
          <Route path='/authorization' element={<Authorization />} />
          <Route path='/audiocall' element={<AudioCallProvider><AudioCall /></AudioCallProvider>} />
          <Route path='/sprint' element={<Sprint />} />
          <Route path='/statistic' element={<Statistic />} />
        </Routes>
      </main>
    </Router>

  );
}

export default App;
