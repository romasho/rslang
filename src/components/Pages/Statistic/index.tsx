import React from 'react';
import { Typography, Box, Container, Card } from '@mui/material';
import { Footer } from '../..';
import { IStatistic } from '../../../interfaces/requestsInterfaces';
import { loadState } from '../../../utils/state';
import { getUserAggregatedWords, getUserStatistic } from '../../../utils/services';

function Statistic() {
  const [data, setData] = React.useState<null | IStatistic>(null);
  const [studyedWords, setStudyedWords] = React.useState(0)

  const filter = '{"$and":[{"userWord.optional.isLearned": false}]}'
  const userId = loadState().auth?.id as string;

  React.useEffect(() => {
    setData(null);

    Promise.all([getUserStatistic(userId), getUserAggregatedWords({ id: userId, filter })]).then(result => {

      // console.log(result);

      const studiedData = result[1] ? result[1][0] : null;

      setData(result[0])
      if (studiedData) {
        const { count } = studiedData.totalCount[0];
        setStudyedWords(count);
      }
    })
  })

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(./home-page-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          minHeight: 'calc(100vh - 128px)'
        }}
      >
        <Container>
          <Typography variant='h4' component='h2' sx={{ pt: 2, mb: 2, fontFamily: 'Permanent Marker', fontSize: { xs: '1.5rem', sm: "2.5rem" }, textAlign: 'center' }}>
            User statistic
          </Typography>
          {data ? (
            <>
              <Typography sx={{ fontSize: { xs: "1rem", sm: '1.5rem' } }}>Total words studied: {studyedWords}</Typography>
              <Typography sx={{ fontSize: { xs: "1rem", sm: '1.5rem' } }}>Total words learned: number </Typography>
              <Typography sx={{ fontSize: { xs: "1rem", sm: '1.5rem' } }}>New words for today: number </Typography>
              <Box sx={{
                mt: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2
              }}>
                <Card
                  sx={{
                    flexGrow: 1,
                    p: 2
                  }}
                >
                  <Typography variant='h6' component='h3' sx={{ fontFamily: 'Permanent Marker' }}>Sprint</Typography>
                  <Typography>New words for today: number </Typography>
                  <Typography>Average win rate: number </Typography>
                  <Typography>Longest series: number </Typography>
                </Card>
                <Card
                  sx={{
                    flexGrow: 1,
                    p: 2
                  }}
                >
                  <Typography variant='h6' component='h3' sx={{ fontFamily: 'Permanent Marker' }}>Audio call</Typography>
                  <Typography>New words for today: number </Typography>
                  <Typography>Average win rate: number </Typography>
                  <Typography>Longest series: number </Typography>
                </Card>
              </Box>
            </>
          ) : (
            <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>Start learning words and playing games to display your statistic!</Typography>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Statistic;