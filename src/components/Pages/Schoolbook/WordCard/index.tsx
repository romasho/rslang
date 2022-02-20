import { NewReleasesRounded, PauseCircleOutline, PlayCircleOutline, School } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Container, IconButton, Typography } from "@mui/material";
import React from "react";
import { IUserWord } from "../../../../interfaces/requestsInterfaces";
import { IWordCard } from "../../../../interfaces/schoolbookInterfaces";
import { getWordsOfUser } from "../helpers";
import { changeDifficulty, changeLearned, getCardShadowColor, isDifficult, isLearnedWord } from "./helpers";

type color = "error" | "inherit" | "secondary" | "disabled" | "action" | "primary" | "info" | "success" | "warning" | undefined;


function Word({ data }: IWordCard) {
  const [action, updateAction] = React.useState(false)
  const path = 'https://rs-lang-team-be.herokuapp.com/';
  const [userWords, updateUserWords] = React.useState<null | IUserWord[]>(null)
  const [cardShadow, updateCardShadow] = React.useState('0');

  const isSigned = Boolean(userWords);

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
    id
  } = data;


  const audioArr = [audio, audioExample, audioMeaning];
  const imageSrc = path + image;

  const [audioCount, updateAudioCount] = React.useState<null | number>(null);
  const [btnState, updateBtnState] = React.useState(true)

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

  const [diffColor, updateDiffColor] = React.useState<color>('inherit')
  const [learnedColor, updateLearnedColor] = React.useState<color>('inherit')

  const handleHardWord = async () => {
    updateBtnState(true)
    await changeDifficulty(id, userWords)
    updateAction(val => !val);
  }

  const handleLearnWord = async () => {
    updateBtnState(true)
    await changeLearned(id, userWords)
    updateAction(val => !val);
  }

  React.useEffect(() => {
    getWordsOfUser()?.then(res => {
      updateUserWords(res)
      const diffColorCurr = isDifficult(id, res);
      const learnedColorCurr = isLearnedWord(id, res);
      updateDiffColor(diffColorCurr)
      updateLearnedColor(learnedColorCurr)
      updateBtnState(false)
      updateCardShadow(getCardShadowColor(diffColorCurr, learnedColorCurr))
    })
  }, [action])

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        mb: 2,
        minHeight: '200px',
        boxShadow: `8px 6px 10px 0px ${cardShadow}`
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
            <IconButton onClick={handlePlayer}>
              {isPlay ? <PauseCircleOutline color="primary" /> : <PlayCircleOutline color="primary" />}
            </IconButton>
            {isSigned ? (
              <>
                <IconButton onClick={handleHardWord} disabled={btnState}>
                  <NewReleasesRounded color={diffColor} />
                </IconButton>
                <IconButton onClick={handleLearnWord} disabled={btnState}>
                  <School color={learnedColor} />
                </IconButton>
              </>
            ) : (
              ''
            )}
          </Container>
        </Container>
        <Typography variant='body2' sx={{ mb: 1 }}>{wordTranslate}</Typography>
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: textMeaning }} />
        <Typography sx={{ mb: 1 }}>{textMeaningTranslate}</Typography>
        <div contentEditable='true' dangerouslySetInnerHTML={{ __html: textExample }} />
        <Typography>{textExampleTranslate}</Typography>
      </CardContent>
    </Card>
  )
}

export default Word;

// onClick={handleHardWord}