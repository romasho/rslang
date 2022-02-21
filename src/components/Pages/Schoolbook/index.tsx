import { Box, Button, Container, Pagination, Typography } from '@mui/material';
import React from 'react';
import { Footer } from '../..';
import { BookData } from '../../../interfaces/schoolbookInterfaces';
import { getWords } from '../../../utils/services';
import { loadSessionState, loadState, saveSessionState } from '../../../utils/state';
import Dictionary from '../../Dictionary';
import { ChapterBtn, TrainingBtn } from './ControlPanel';
import { isLearndedPage } from './helpers';
import Word from './WordCard';

function SchoolBook() {
  const [state, updateState] = React.useState(loadSessionState());
  const [data, setData] = React.useState<null | BookData>(null);
  const [cardsState, changeCardStates] = React.useState<number>(0)
  const user = loadState().auth;

  const [isLearned, changeLearned] = React.useState(false)

  React.useEffect(() => {
    const { chapter, page } = state;
    getWords(chapter, page).then(res => setData(res));
    isLearndedPage(state).then(res => {
      if (state.isDict) {
        changeLearned(false)
      } else {
        changeLearned(res === 20)
      }
    });
  }, [state, cardsState])

  saveSessionState(state);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    updateState({
      ...state,
      page: value - 1,
    });
  }

  const handleChapterChange = (num: number) => {
    updateState({
      ...state,
      chapter: num,
      isDict: false
    });
  }

  const handleDictBtn = () => {
    const value = state.isDict;

    updateState({
      ...state,
      isDict: !value
    });
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(./schoolBook-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Container disableGutters sx={{ p: { xs: '5px', sm: 1, md: 2 }, flexGrow: 1 }}>
          <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2, fontFamily: 'Permanent Marker', fontSize: { xs: "2rem", sm: "3rem" } }}>Schoolbook</Typography>
          <Container
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              pb: 1,
              pt: 1,
              backdropFilter: 'blur(5px)',
              flexWrap: 'wrap',
              gap: { xs: 1, sm: 2 },
              position: 'sticky',
              top: 0,
              zIndex: 2
            }}
          >
            <ChapterBtn chapter={state.chapter} onChange={handleChapterChange} />
            <Pagination
              color='primary'
              count={30}
              page={state.page + 1}
              onChange={handlePaginationChange}
              disabled={Boolean(state.isDict)}
              siblingCount={0}
              sx={{ order: { xs: -1, sm: 'inherit' } }}
            />
            <Button
              variant='outlined'
              onClick={handleDictBtn}
              sx={{
                fontWeight: 700,
                fontSize: { xs: '10px', sm: '14px' },
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  borderColor: 'black',
                  color: '#D9534F'
                }
              }}
            >Dictionary</Button>
            <TrainingBtn isDisabled={isLearned}  />
          </Container>
          <Typography variant='h3' sx={{ mb: 2, fontFamily: 'Permanent Marker', textAlign: 'center', fontSize: { xs: "1.5rem", sm: "3rem" } }}>
            {isLearned ? 'Congratulations! this page is learned' : ''}</Typography>
          <Container>
            {state.isDict ?
              (<div>
                {user ? (
                  <Dictionary />
                ) : (
                  <Typography variant='h6' component='h2'>Please login to use this functionality</Typography>
                )}
              </div>)
              :
              (<div>
                {
                  data ? (
                    data.map((item) => (
                      <Word key={item.id} data={item} changeBookState={changeCardStates} prevState={cardsState} />
                    ))
                  ) : (
                    <p>loading...</p>
                  )
                }
              </div>)
            }

          </Container>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default SchoolBook;