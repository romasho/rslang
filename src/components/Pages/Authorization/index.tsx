import { Grid, Paper, Box, Typography, TextField, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import React from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Footer } from '../..';
import type { IAuthorizationState, IAction } from '../../../interfaces/authorizationInterface';
import type { IResponseErr } from '../../../interfaces/requestsInterfaces';
import { createUser, signIn, signOut } from '../../../utils/services';

const initialFieldsState: IAuthorizationState = {
  regName: {
    value: '',
    errMessage: ''
  },
  regEmail: {
    value: '',
    errMessage: ''
  },
  regPassword: {
    value: '',
    errMessage: ''
  },
  logEmail: {
    value: '',
    errMessage: ''
  },
  logPassword: {
    value: '',
    errMessage: ''
  }
};

function reducer (state: IAuthorizationState, action: IAction) {
  switch (action.type) {
    case 'set-field-value':
      return {
        ...state,
        [action.payload.name]: {
          value: action.payload.value,
          errMessage: ''
        }
      };
    case 'set-err-message':
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name as keyof IAuthorizationState],
          errMessage: action.payload.value
        }
      };

    default:
      throw new Error('Unknown action')
  }
}

function Authorization() {
  const [tabValue, setTabValue] = React.useState(1);
  const [loading, setLoadingState] = React.useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSignOut = () => {
    signOut();
    window.location.href = '/';
  };

  const [fields, dispatch] = React.useReducer(reducer, initialFieldsState);

  const onSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "set-field-value",
      payload: {
        name: event.target.name,
        value: event.target.value
      }
    })
  };

  const onRegErr = (err: IResponseErr) => {
    err.error.errors.forEach(({path: [field], message}) => {
      const fieldName = `reg${field[0].toUpperCase() + field.slice(1)}`;
      dispatch({
        type: "set-err-message",
        payload: {
          name: fieldName,
          value: message
        }
      })
    });
  };

  const onLogErr = () => {
      dispatch({
        type: "set-err-message",
        payload: {
          name: 'logEmail',
          value: 'incorrect email or password'
        }
      })
  };

  const onRegSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoadingState(true);

    const response = await createUser({name: fields.regName.value, email: fields.regEmail.value, password: fields.regPassword.value});

    if (response && 'error' in response) onRegErr(response);
    else if (response) {
      await signIn({ email: fields.regEmail.value, password: fields.regPassword.value });
      window.location.href = '/';
    }

    setLoadingState(false);
  };

  const onLogSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoadingState(true);

    const response = await signIn({ email: fields.logEmail.value, password: fields.logPassword.value });

    if (response) window.location.href = '/';
    else onLogErr();

    setLoadingState(false);
  };

  return (
    <>
      <Grid container justifyContent="flex-end" sx={{ flexGrow: 1  }}>
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage: 'url(https://i.pinimg.com/originals/e6/da/0d/e6da0db3567e1d7c588ed513314687c2.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            zIndex: '-1'
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} sx={{ bgcolor: 'background.default' }}>
          {loading?
            <Box sx={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <CircularProgress  />
            </Box>
            :

            <Box sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
                <Tabs value={tabValue} indicatorColor="secondary" onChange={handleTabChange}>
                  <Tab label="Sign up" />
                  <Tab label="Sign in" />
                </Tabs>

                <Box
                  role="tabpanel"
                  sx={{
                    display: tabValue === 0? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                  }}>

                  <PersonAddAltIcon color="secondary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography component='h4' variant='h4'>
                    Sign up
                  </Typography>
                  <Box component='form' sx={{ maxWidth: 470 }} onSubmit={onRegSubmit}>
                    <TextField
                      error={!!fields.regName.errMessage}
                      value={fields.regName.value}
                      helperText={fields.regName.errMessage}
                      onChange={onSetValue}
                      name="regName"
                      margin="normal"
                      required
                      fullWidth
                      label="Name"
                      variant="standard"
                    />
                    <TextField
                      error={!!fields.regEmail.errMessage}
                      value={fields.regEmail.value}
                      helperText={fields.regEmail.errMessage}
                      onChange={onSetValue}
                      name="regEmail"
                      margin="normal"
                      required
                      fullWidth
                      label="Email Address"
                      autoComplete="email"
                      variant="standard"
                    />
                    <TextField
                      error={!!fields.regPassword.errMessage}
                      value={fields.regPassword.value}
                      helperText={fields.regPassword.errMessage}
                      onChange={onSetValue}
                      name="regPassword"
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      label="Password"
                      autoComplete="current-password"
                      variant="standard"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign up
                    </Button>
                  </Box>
                </Box>


                <Box
                  role="tabpanel"
                  sx={{
                    display: tabValue === 1? 'flex' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                  }}>
                  <LockOpenIcon color="secondary" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography component='h4' variant='h4'>
                    Sign in
                  </Typography>
                  <Box component='form' sx={{ maxWidth: 470 }} onSubmit={onLogSubmit}>
                    <TextField
                      error={!!fields.logEmail.errMessage}
                      value={fields.logEmail.value}
                      helperText={fields.logEmail.errMessage}
                      onChange={onSetValue}
                      name="logEmail"
                      margin="normal"
                      required
                      fullWidth
                      label="Email Address"
                      autoComplete="email"
                      variant="standard"
                    />
                    <TextField
                      error={!!fields.logPassword.errMessage}
                      value={fields.logPassword.value}
                      helperText={fields.logPassword.errMessage}
                      onChange={onSetValue}
                      name="logPassword"
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      label="Password"
                      autoComplete="current-password"
                      variant="standard"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign in
                    </Button>
                    <Button
                      onClick={handleSignOut}
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 1,
                        bgcolor: "secondary.main",
                        color: "white"
                      }}
                    >
                      Log out
                    </Button>
                  </Box>
                </Box>
              </Box>
            }
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Authorization;