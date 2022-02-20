import { Button, Container, Pagination, Typography } from '@mui/material';
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
  // const [cardsState, changeCardStates] = React.useState(false)
  const user = loadState().auth;

  // TODO: agregatetWords => array.length  === 20 => changeState
  // TODO: agregatetWords => array.length  <== 4 => changeStateTrainingBtn
  const [isLearned, changeLearned] = React.useState(false)


  React.useEffect(() => {
    setData(null);
    const { chapter, page } = state;
    getWords(chapter, page).then(res => setData(res));
    isLearndedPage().then(res => changeLearned(res));
  }, [state])

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
      <Container disableGutters sx={{ p: { xs: '5px', sm: 1, md: 2 }, flexGrow: 1 }}>
        <Typography variant='h5' component='h2' gutterBottom sx={{ fontWeight: 700 }}>Schoolbook</Typography>
        <Container
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            pb: 1,
            pt: 1,
            backgroundColor: '#fffbd2',
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
          <Button variant='outlined' onClick={handleDictBtn} sx={{ fontWeight: 700, fontSize: { xs: '10px', sm: '14px' } }}>Dictionary</Button>
          <TrainingBtn />
        </Container>
        <Typography>{isLearned ? 'Сongratulations! this page is learned' : ''}</Typography>
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
                    <Word key={item.id} data={item} />
                  ))
                ) : (
                  <p>loading...</p>
                )
              }
            </div>)
          }

        </Container>
      </Container>
      <Footer />
    </>
  );
}

export default SchoolBook;