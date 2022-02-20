import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { styled } from '@mui/material/styles';

const StyledFullScreen = styled(FullScreen)({
  display: 'flex',
  flexGrow: 1,
  backgroundColor: '#fffbd2'
});

export { StyledFullScreen, useFullScreenHandle }