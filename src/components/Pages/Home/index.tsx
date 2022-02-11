import React from 'react';
import { Container, Box, Grid, Typography, Paper } from '@mui/material';
import { Footer } from '../..';

function Home() {
  return (
    <>
      <Container maxWidth='lg' disableGutters sx={{ pt: 2, pb: 2, flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Grid container justifyContent='space-between' sx={{ m: 0, mt: 2 }}>

            <Grid item xs={12} sm={7} md={7} >
              <Typography variant='h3' gutterBottom component='h1' sx={{ fontWeight: 700 }}>LanguageHike</Typography>
              <Typography variant='h5' component='h2'>Learn English step-by-step - just like hiking</Typography>
            </Grid>
            <Grid
              item
              component={Paper}
              xs={0}
              sm={4}
              sx={{
                p: 0,
                height: '400px',
                backgroundImage: 'url(https://i.pinimg.com/564x/ce/b3/50/ceb350fa618421659b23ed5602c4603e.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                borderRadius: '20px',
              }} />
          </Grid>
        </Box>
        <Box>
          <h1 className="title">RSLang is a handy app for learning English!</h1>

        </Box>
      </Container>


      <Footer />
    </>
  );
}

export default Home;
