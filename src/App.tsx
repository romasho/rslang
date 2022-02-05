import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@emotion/react';
import { Header } from './components';
// import theme from './theme';
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
    </Router>


  );
}

export default App;
