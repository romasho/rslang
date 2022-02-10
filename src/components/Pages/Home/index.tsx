import React from 'react';
import { Container, Box } from '@mui/material';
import { Footer } from '../..';
// , Grid
function Home() {
  return (
    <>
      <Container maxWidth='lg' sx={{ pt: 2, pb: 2, flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* <Grid container spacing={2}>
            <Grid
              item
              xs={false}
              sm={6}
              md={8}
              sx={{
                backgroundImage: 'https://pin.it/6okp0ZQ'
              }}>adgs</Grid>
            <Grid item>adsfgdn</Grid>
          </Grid> */}
          <h1 className="title">RSLang is a handy app for learning English!</h1>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default Home;
