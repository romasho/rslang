import React, { useContext } from "react";
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
import { AudioCallContext } from "../context";
import { IWord } from "../../../../interfaces/requestsInterfaces";
import { playAudio } from "..";

export default function TableResult() {
const [quizState, dispatch] = useContext(AudioCallContext);
  return (
    <TableContainer component={Paper} sx={{maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column',
    alignItems: 'center'}}>
      <h3>Results</h3>
      <Table sx={{ maxWidth: 600, }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {(quizState.words as IWord[]).map((word, index) => (
            <TableRow
              key={word.word}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <IconButton aria-label="delete" size="large" onClick={() => { playAudio(`https://rs-lang-team-be.herokuapp.com/${word.audio}`) }}>
                  <VolumeUpIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">{word.word}</TableCell>
              <TableCell align="right">{word.transcription}</TableCell>
              <TableCell align="right">{word.wordTranslate}</TableCell>
              <TableCell align="right">{quizState.usersAnswers[index] ? <CheckCircleIcon color="success"/> : <CancelIcon color="error"/>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}