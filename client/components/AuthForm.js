import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, handleChangeForm, loginForm, handleLoginClose } = props;

  let errorMessage = ''
  if (error && error.response) {
    errorMessage = error.response.data
  }

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Avatar variant='square' src='/logo/JRL-Logo.png' sx={{ width: '50%', height: 'auto', m: 1 }} />
        <Typography component="h1" variant="h5">
          {displayName}
        </Typography>
        <Box component="form" name={name} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={!!error && !!error.response}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!error && !!error.response}
            helperText={errorMessage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {displayName}
          </Button>
        </Box>
        {loginForm ? (
          <Link onClick={() => { handleChangeForm() }} sx={{ my: 3, '&:hover': { cursor: 'pointer' } }}>
            {"Don't have an account? Sign Up"}
          </Link>
        ) : (
          <Link onClick={() => { handleChangeForm() }} sx={{ my: 3, '&:hover': { cursor: 'pointer' } }}>
            {"Already have an account? Sign in"}
          </Link>
        )}
      </Box>
    </Container>
  );
};
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
