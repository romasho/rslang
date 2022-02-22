import React from 'react';
import { Typography, Box, Container, Card } from '@mui/material';
import { Footer } from '../..';
import { IStatistic } from '../../../interfaces/requestsInterfaces';
import { loadState } from '../../../utils/state';
import { getUserAggregatedWords, getUserStatistic } from '../../../utils/services';

function Statistic() {
  const [data, setData] = React.useState<null | IStatistic>(null);
  const [studyedWords, setStudyedWords] = React.useState(0);
  const [learned, updateLearned] = React.useState(3600);

  const filterStudied = '{"$and":[{"userWord.optional.isLearned": false}]}';
  const filterLearned = '{"$and":[{"userWord.optional.isLearned": true}]}';
  const userId = loadState().auth?.id as string;

  const date = new Date();
  const currentDay = date.toISOString().split('T')[0];

  React.useEffect(() => {
    setData(null);

    Promise.all([getUserStatistic(userId), getUserAggregatedWords({ id: userId, filter: filterStudied }), getUserAggregatedWords({ id: userId, filter: filterLearned })])
      .then(result => {
        const studiedData = result[1] ? result[1][0] : null;
        const learnedData = result[2] ? result[2][0] : null;

        if (learnedData) {
          const { count } = learnedData.totalCount[0];
          updateLearned(count)
        }

        setData(result[0])
        if (studiedData) {
          const { count } = studiedData.totalCount[0];
          setStudyedWords(count);
        }
      })
  }, [])
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
              <Typography sx={{ fontSize: { xs: "1rem", sm: '1.5rem' } }}>Total words learned: {learned} </Typography>
              <Typography sx={{ fontSize: { xs: "1rem", sm: '1.5rem' } }}>New words learned today: 
               {`${  String(data.optional.audiocall.numberLearnedWordsPerDay[currentDay] + data.optional.sprint.numberLearnedWordsPerDay[currentDay]) || 0}`}
               </Typography>
               <Typography sx={{ fontSize: { xs: "1rem", sm: '1.5rem' } }}>Percentage of correct answers per day: {(Math.round(data.optional.sprint.successfulPercent + data.optional.audiocall.successfulPercent) / 2)  || 0}%  </Typography>
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
                  <Typography>New words for today: {data.optional.sprint.numberNewWordsPerDay[currentDay] || 0}</Typography>
                  <Typography>Words learned today: {data.optional.sprint.numberLearnedWordsPerDay[currentDay] || 0}</Typography>
                  <Typography>Average win rate: {Math.round(data.optional.sprint.successfulPercent) || 0}% </Typography>
                  <Typography>Longest series: {data.optional.sprint.correcInRow || 0} </Typography>
                </Card>
                <Card
                  sx={{
                    flexGrow: 1,
                    p: 2
                  }}
                >
                  <Typography variant='h6' component='h3' sx={{ fontFamily: 'Permanent Marker' }}>Audio call</Typography>
                  <Typography>New words for today: {data.optional.audiocall.numberNewWordsPerDay[currentDay] || 0} </Typography>
                  <Typography>Words learned today: {data.optional.audiocall.numberLearnedWordsPerDay[currentDay] || 0}</Typography>
                  <Typography>Average win rate: {Math.round(data.optional.audiocall.successfulPercent) || 0}% </Typography>
                  <Typography>Longest series: {data.optional.audiocall.correcInRow || 0} </Typography>
                </Card>
              </Box>
            </>
          ) : (
            <Typography sx={{  mt: 3 textAlign: 'center', fontFamily: 'Bebas Neue', fontSize: 24 }}>Start learning words and playing games to display your statistic!</Typography>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Statistic;