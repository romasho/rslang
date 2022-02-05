import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsVariantOverrides {
    linkBtn: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#96CEB4',
    },
    secondary: {
      main: '#D9534F',
    },
    background: {
      default: '#fffbd2',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'linkBtn', color: 'secondary' },
          style: {
            textTransform: 'none',
            color: 'black',
          }
        },
      ]
    }
  }
})

export default theme;