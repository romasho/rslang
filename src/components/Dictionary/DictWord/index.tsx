import { Card, CardContent, CardMedia, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { DeleteForeverRounded, PauseCircleOutline, PlayCircleOutline } from "@mui/icons-material";
import React from "react";
import { IDictProp } from "../../../interfaces/schoolbookInterfaces";
import { loadState } from "../../../utils/state";
import { updateUserWord } from "../../../utils/services";

function DictWord({ data }: IDictProp) {
  const [display, changeDisplay] = React.useState(true)
  const path = 'https://rs-lang-team-be.herokuapp.com/';

  const {
    image,
    word,
    transcription,
    audio,
    audioExample,
    audioMeaning,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExampleTranslate,
    textExample,
    _id
  } = data;

  const audioArr = [audio, audioExample, audioMeaning];
  const [audioCount, updateAudioCount] = React.useState<null | number>(null);

  const track = new Audio();

  const [isPlay, togglePlay] = React.useState(false)
  const handlePlayer = () => {
    const value = !isPlay
    togglePlay(value);
    if (!value) {
      updateAudioCount(null)
      track.pause();
    } else {
      updateAudioCount(0);
    }
  }

  React.useEffect(() => {
    if (!isPlay) return;

    const i = audioCount || 0;
    track.src = path + audioArr[i];
    track.play()

    const handleEnd = () => {
      if (i === audioArr.length - 1) {
        togglePlay(previousIsPlay => !previousIsPlay)
        return;
      }
      const nextCount = (i < audioArr.length) ? i + 1 : 0;
      updateAudioCount(nextCount)
    }

    track.addEventListener('ended', handleEnd)
  }, [audioCount])

  const imageSrc = path + image;

  const deleteHandle = () => {
    const userId = loadState().auth?.id as string;

    const wordObj = {
      difficulty: 'easy',
      optional: {
        count: 1,
        isLearned: false
      }
    }
    updateUserWord({ userId, wordId: (_id as string), word: wordObj });
    changeDisplay(false)
  }

  return display ? (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        mb: 2,
        minHeight: '200px',
      }}
    >
      <CardMedia
        component='img'
        image={imageSrc}
        sx={{
          maxWidth: { xs: '100%', md: '300px' },
          maxHeight: '250px'
        }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Container disableGutters sx={{ display: 'flex', columnGap: 1, alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
          <Typography variant='h6' component='h3' sx={{ flexShrink: 0 }}>{word} - {transcription}</Typography>
          <Container sx={{ width: '100%' }} disableGutters>
            <Tooltip title='play'>
              <IconButton onClick={handlePlayer}>
                {isPlay ? <PauseCircleOutline color="primary" /> : <PlayCircleOutline color="primary" />}
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete word'>
              <IconButton onClick={deleteHandle}>
                <DeleteForeverRounded color='primary' />
              </IconButton>
            </Tooltip>
          </Container>
        </Container>
        <Typography variant='body2' sx={{ mb: 1 }}>{wordTranslate}</Typography>
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: textMeaning }} />
        <Typography sx={{ mb: 1 }}>{textMeaningTranslate}</Typography>
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: textExample }} />
        <Typography>{textExampleTranslate}</Typography>
      </CardContent>
    </Card>
  ) : (
    <div />
  )
}

export default DictWord