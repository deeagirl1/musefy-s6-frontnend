import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  authenticateUser,
  authenticationFailure,
  authenticationSuccess,
} from "../services/AuthService";
import { connect, useDispatch } from "react-redux";
import { Container, Typography, TextField, Button } from "@mui/material";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

const Login: React.FC = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (username && password) {
      try {
        const response = await props.authenticateUser(username, password);
        if (response) {
          dispatch(authenticationSuccess(response.userId, response.accessToken, response.refreshToken));
          navigate("/browse");
        } else {
          dispatch(authenticationFailure("Invalid username or password"));
        }
      } catch (error: any) {
        dispatch(authenticationFailure(error.message));
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Sign in
      </Typography>
      <TextField
        label="Email or username"
        fullWidth
        margin="normal"
        onChange={changeUsername}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={changePassword}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ backgroundColor: "#1db954", marginTop: "16px" }}
        onClick={handleSubmit}
      >
        Log in
      </Button>
      <Typography variant="body2" align="center" sx={{ marginTop: "16px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Container>
  );
};

const mapDispatchToProps = {
  authenticateUser,
};

export default connect(null, mapDispatchToProps)(Login);
