import { Container } from '@mui/material';
import React from 'react';
import { Footer } from '../..';

function Authorization() {
  return (
    <>
      <Container sx={{ pt: 2, pb: 2, flexGrow: 1 }}>
        <h1 className="title">Authorization</h1>
      </Container>
      <Footer />
    </>
  );
}

export default Authorization;