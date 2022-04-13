import { NewReleasesRounded, PauseCircleOutline, PlayCircleOutline, School } from "@mui/icons-material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Card, CardContent, CardMedia, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { IUserWord } from "../../../../interfaces/requestsInterfaces";
import { IWordCard } from "../../../../interfaces/schoolbookInterfaces";
import { getWordsOfUser } from "../helpers";
import { changeDifficulty, changeLearned, getCardShadowColor, getCount, isDifficult, isLearnedWord } from "./helpers";

type color = "error" | "inherit" | "secondary" | "disabled" | "action" | "primary" | "info" | "success" | "warning" | undefined;

function Word({ data, changeBookState, prevState }: IWordCard) {
  const [action, updateAction] = React.useState(false)
  const path = 'https://rs-lang-team-be.herokuapp.com/';
  const [userWords, updateUserWords] = React.useState<null | IUserWord[]>(null);
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
  const [userWordCOunt, updateuserWordCOunt] = React.useState(0);

  const handleHardWord = async () => {
    updateBtnState(true)
    await changeDifficulty(id, userWords)
    updateAction(val => !val);
    changeBookState(prevState + 1)
  }

  const handleLearnWord = async () => {
    updateBtnState(true)
    await changeLearned(id, userWords)
    updateAction(val => !val);
    changeBookState(prevState + 1)
  }

  React.useEffect(() => {
    getWordsOfUser()?.then(res => {
      updateUserWords(res)
      const diffColorCurr = isDifficult(id, res);
      const learnedColorCurr = isLearnedWord(id, res);
      const count = getCount(id, res);
      updateDiffColor(diffColorCurr)
      updateLearnedColor(learnedColorCurr)
      updateuserWordCOunt(count)
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
        borderRight: `15px solid ${cardShadow}`,
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
            <Tooltip title='Play'>
              <IconButton onClick={handlePlayer}>
                {isPlay ? <PauseCircleOutline color="primary" /> : <PlayCircleOutline color="primary" />}
              </IconButton>
            </Tooltip>
            {isSigned ? (
              <>
                <Tooltip title='Difficult word'>
                  <span>
                    <IconButton onClick={handleHardWord} disabled={btnState}>
                      <NewReleasesRounded color={diffColor} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title='Learned word'>
                  <span>
                    <IconButton onClick={handleLearnWord} disabled={btnState}>
                      <School color={learnedColor} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={`You answered the word correctly ${userWordCOunt} times in a row`}>
                  <span>
                    <IconButton disabled={btnState}>
                      <LocalLibraryIcon color={userWordCOunt === 0 ? 'inherit' : "success"} />
                    </IconButton>
                  </span>
                </Tooltip>
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