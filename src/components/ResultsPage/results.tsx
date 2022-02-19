import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IWord } from "../../interfaces/requestsInterfaces";
import playAudio from "../../utils/miscellaneous";


interface IResults {
  words: IWord[],
  usersAnswers: boolean[],
  score: number | null
}

export default function TableResult({ words, usersAnswers, score = null }: IResults) {
  const successfulPercent = (usersAnswers.filter(el => el === true).length / words.length) * 100;
  const correcInRow = Math.max(...usersAnswers.reduce((acc, n, i, a) => {
    if (n !== a[i - 1]) acc.push(0);
    // eslint-disable-next-line no-plusplus
    if (n !== false) acc[acc.length - 1]++;
    return acc
  }, [0]));
  const gameName = window.location.href.split('/')[window.location.href.split('/').length - 1];
  console.log(correcInRow, gameName);


  return (
    <TableContainer component={Paper}
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <h3>Your results {successfulPercent}%</h3>
      {score ? <h3>Score {score}</h3> : null}
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
                <IconButton aria-label="delete" size="large" onClick={() => { playAudio(`https://rs-lang-team-be.herokuapp.com/${word.audio}`) }}>
                  <VolumeUpIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">{word.word}</TableCell>
              <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }} >{word.transcription}</TableCell>
              <TableCell align="right">{word.wordTranslate}</TableCell>
              <TableCell align="right" sx={{ padding: { xs: "6px 6px", sm: "6px 16px" } }} >
                {usersAnswers[index] ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}