import { Grid, Paper, Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { Footer } from '../..';

function Authorization() {
  return (
    <>
      <Grid container justifyContent="flex-end" sx={{
        flexGrow: 1
      }}
      >
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage: 'url(https://i.pinimg.com/originals/e6/da/0d/e6da0db3567e1d7c588ed513314687c2.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} sx={{ bgcolor: 'background.default' }}>
          <Box sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography component='h4' variant='h4'>
              Sign up
            </Typography>
            <Box component='form'>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                autoComplete="current-password"
                variant="standard"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Authorization;