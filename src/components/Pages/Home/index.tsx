import React from 'react';
import { Container, Box, Grid, Typography, Paper, Card, CardMedia, CardContent } from '@mui/material';
import { Footer } from '../..';

function Home() {
  return (
    <>
      <Container maxWidth='lg' sx={{ pt: 2, pb: 2, flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Grid container justifyContent='space-between' sx={{ m: 0, mt: 2 }}>
            <Grid
              item
              component={Paper}
              xs={0}
              sm={4}
              md={7}
              sx={{
                p: 0,
                height: { xs: 0, sm: '400px' },
                backgroundImage: 'url(https://i.pinimg.com/564x/ce/b3/50/ceb350fa618421659b23ed5602c4603e.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                borderRadius: '20px',
              }} />
            <Grid item xs={12} sm={7} md={4} sx={{ mt: { xs: 0, sm: 12 } }}>
              <Typography variant='h4' gutterBottom component='h1' sx={{ fontWeight: 700 }}>LanguageHike</Typography>
              <Typography variant='h5' gutterBottom component='h2'>Learn English step-by-step - just like hiking</Typography>
              <Typography>
                An application for the effective study of foreign words in a playful way. Always at hand. On any device.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{
          pt: 5,
          pb: 5,
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'justify-content',
          alignItems: { xs: 'center', md: 'inherit' }
        }}>
          <Grid item component={Card} sx={{ maxWidth: { xs: '100%', sm: '60%', md: '23%' } }}>
            <CardMedia
              component="img"
              height="140"
              image="https://i.pinimg.com/564x/65/2a/7e/652a7e11d5527b879ed4dea7b0418787.jpg"
              sx={{ objectPosition: 'center 20%' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                SchoolBook
              </Typography>
              <Typography variant='body1' sx={{ width: '100%' }}>
                More than 3500 thousand words to learn, divided into sections according to your level of preparation with easy navigation.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} sx={{ maxWidth: { xs: '100%', sm: '60%', md: '23%' } }}>
            <CardMedia
              component="img"
              height="140"
              image="https://i.pinimg.com/564x/9d/a9/a8/9da9a8a32f723cabf4862ede58f909c4.jpg"
              sx={{ objectPosition: 'center 35%' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Dictionary
              </Typography>
              <Typography variant='body1' sx={{ width: '100%' }}>
                Create your own personal dictionary for learning words - add words you want to pay special attention to and delete if you already know the word.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} sx={{ maxWidth: { xs: '100%', sm: '60%', md: '23%' } }}>
            <CardMedia
              component="img"
              height="140"
              image="https://i.pinimg.com/564x/a0/f0/5d/a0f05d272c30be1a741bd9b496a56b68.jpg"
              sx={{ objectPosition: 'center 20%' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Games
              </Typography>
              <Typography variant='body1' sx={{ width: '100%' }}>
                Two exciting games for the development of memorization of words, listening and writing.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} sx={{ maxWidth: { xs: '100%', sm: '60%', md: '23%' } }}>
            <CardMedia
              component="img"
              height="140"
              image="https://i.pinimg.com/564x/67/cc/76/67cc76f71f49c2446449f5a66ff23a01.jpg"
              sx={{ objectPosition: 'center 40%' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Statistic
              </Typography>
              <Typography variant='body1' sx={{ width: '100%' }}>
                Track your progress in individual statistics, set goals and get inspired to achieve new results every day!
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between' sx={{ m: 0, mb: 2 }}>
          <Grid
            item
            component={Paper}
            xs={0}
            sm={4}
            md={7}
            sx={{
              p: 0,
              height: { xs: 0, sm: '400px' },
              backgroundImage: 'url(https://i.pinimg.com/564x/ce/b3/50/ceb350fa618421659b23ed5602c4603e.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              borderRadius: '20px',
            }} />
          <Grid item xs={12} sm={7} md={4} sx={{ mt: { xs: 0, sm: 12 } }}>
            <Typography variant='h4' gutterBottom component='h1' sx={{ fontWeight: 700 }}>LanguageHike</Typography>
            <Typography variant='h5' gutterBottom component='h2'>Learn English step-by-step - just like hiking</Typography>
            <Typography>
              An application for the effective study of foreign words in a playful way. Always at hand. On any device.
            </Typography>
          </Grid>
        </Grid>
      </Container>


      <Footer />
    </>
  );
}

export default Home;
