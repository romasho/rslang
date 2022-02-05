import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsVariantOverrides {
    linkBtn: true;
  }
}

const defaultTheme = createTheme();

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
          props: { variant: 'linkBtn' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            color: 'black',
          },
        },
      ]
    },
    MuiLink: {
      // variants: [
      //   {
      //     props: { variant: 'first' },
      //     style: {
      //       border: '1px solid black'
      //     }
      //   }
      // ]
      styleOverrides: {
        root: {
          backgroundColor: 'black'
        }
      }
    }
  }
})

export default theme;