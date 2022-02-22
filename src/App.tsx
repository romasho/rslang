import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Authorization, Home, Schoolbook, AudioCall, Sprint, Statistic } from './components/Pages';
import { AudioCallProvider } from './components/Pages/AudioCall/context';


function App() {
  return (

    <HashRouter>
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
    </HashRouter>

  );
}

export default App;
