import React from 'react';
import { Container } from '@mui/material';
import { Footer } from '../..';

function Home() {
  return (
    <>
      <Container sx={{ pt: 2, pb: 2, flexGrow: 1 }}>
        <h1 className="title">RSLang is a handy app for learning English!</h1>

      </Container>

      <Footer />
    </>
  );
}

export default Home;
