import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IUserWord, IWord } from "../../interfaces/requestsInterfaces";
import { playAudio } from "../../utils/miscellaneous";
import { getUserWords, createUserWord, updateUserWord } from "../../utils/services";
import { loadState } from "../../utils/state";


function getMaxCorrectInRow(array: boolean[]) {
  return Math.max(...array.reduce((acc, n, i, a) => {
    if (n !== a[i - 1]) acc.push(0);
    // eslint-disable-next-line no-plusplus
    if (n !== false) acc[acc.length - 1]++;
    return acc
  }, [0]));
}

interface IResults {
  words: IWord[],
  usersAnswers: boolean[],
  score: number | null,
  restart: () => void,
  choseDifficulty: () => void
}

export default function TableResult({ words, usersAnswers, score = null, restart, choseDifficulty }: IResults) {
  const [usersWords, setUserWords] = useState<IUserWord[] | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false)
  const isAuth = loadState().auth?.id;

  useEffect(() => {
    if (isAuth) {
      getUserWords(isAuth)?.then((res) => setUserWords(res));
      setDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (dataLoaded && isAuth) {
      words.forEach((word, index) => {
        const isWordInArray = usersWords?.find((userWord) => userWord.wordId === word.id);

        if (!isWordInArray) {
          console.log('слов еще не было', word)
          const newCount = usersAnswers[index] ? 1 : 0;
          createUserWord({
            userId: isAuth, wordId: word.id, word: {
              difficulty: "easy",
              optional: {
                count: newCount,
                isLearned: false,
              }
            }
          });
        } else {
          const { difficulty, optional } = isWordInArray;
          console.log('обновляем данные', difficulty, optional, word.wordTranslate);
          const newCount = usersAnswers[index] ? (optional.count + 1) : 0;
          const isHard = (difficulty === 'easy') ? 'easy' : 'hard';
          const necessaryForStudying = (difficulty === 'easy') ? 3 : 5;
          const isLearned = newCount >= necessaryForStudying;

          updateUserWord({
            userId: isAuth, wordId: word.id, word: {
              difficulty: isHard,
              optional: {
                isLearned,
                count: newCount,
              }
            }
          });
        }
      });
    }
  }, [usersWords]);

  const successfulPercent = Math.round((usersAnswers.filter(el => el === true).length / words.length) * 100);
  const correcInRow = getMaxCorrectInRow(usersAnswers);
  const gameName = window.location.href.split('/')[window.location.href.split('/').length - 1];
  console.log(correcInRow, gameName);

  return (
    <>
      <Box>
        <IconButton onClick={choseDifficulty}>
          <ArrowBackIcon sx={{
            color: 'black', width: '40px',
            height: '40px'
          }} />
        </IconButton>
        <IconButton onClick={restart}>
          <RestartAltIcon sx={{
            color: 'black', width: '40px',
            height: '40px'
          }} />
        </IconButton>
      </Box>
      <TableContainer component={Paper}
        sx={{
          maxWidth: 600,
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography component='h3' variant='h3' sx={{ mt: 2, fontFamily: 'Bebas Neue' }}>
          Your results: {successfulPercent || 0}%
        </Typography>
        {score ? <Typography variant='h4' sx={{ fontFamily: 'Bebas Neue' }}>Score: {score}</Typography> : null}
        <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell size="small" />
              <TableCell align="right" />
              <TableCell sx={{ display: { xs: "none", sm: "block" } }} align="right" />
              <TableCell align="right" />
              <TableCell align="right" size="small" />
            </TableRow>
          </TableHead>
          <TableBody>
            {(words as IWord[]).map((word, index) => (
              <TableRow
                key={word.word}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                <TableCell component="th" scope="row" sx={{ padding: { xs: "6px 6px", sm: "6px 16px" } }}>
                  <IconButton aria-label="delete" size="large" onClick={() => { playAudio(`https://rs-lang-team-be.herokuapp.com/${word.audio}`); }}>
                    <VolumeUpIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{word.word}</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>{word.transcription}</TableCell>
                <TableCell align="right">{word.wordTranslate}</TableCell>
                <TableCell align="right" sx={{ padding: { xs: "6px 6px", sm: "6px 16px" } }}>
                  {usersAnswers[index] ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}