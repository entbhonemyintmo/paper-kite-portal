import React, { useEffect, useState } from "react";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import authAtom from "../recoil/auth/atom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, mutate } = useMutation(
    async () => {
      return await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`,
        data
      );
    },
    {
      onSuccess: (res) => {
        setAuth(res.data);
        localStorage.setItem("paper-kite", JSON.stringify(res.data));
        navigate("/send");
      },
    }
  );

  const handleOnChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (auth) {
      navigate("/send");
    }
  }, [auth, navigate]);

  return (
    <Box
      component="main"
      sx={{ height: "100vh", backgroundColor: "#F4F7FA", display: "flex" }}
    >
      <Box
        flex={0.5}
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Container
        maxWidth="xs"
        component={Paper}
        sx={{
          position: "absolute",
          borderRadius: "1.5rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          component="img"
          src="/assets/images/logo.png"
          alt="Logo"
          sx={{ width: "8rem" }}
        />
        <Box
          component="form"
          noValidate
          onSubmit={onSubmitHandler}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ marginTop: "20px", color: "secondary.light" }}
          >
            E Mail
          </Typography>
          <TextField
            value={data.email}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="email"
            autoComplete="email"
            autoFocus
            inputProps={{ 'data-testid': 'email-input' }}
          />

          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ marginTop: "10px", color: "secondary.light" }}
          >
            Password
          </Typography>
          <TextField
            value={data.password}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            inputProps={{ 'data-testid': 'password-input' }}
          />

          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            disableElevation
            sx={{
              mt: 4,
              mb: 2,
              backgroundColor: "primary.main",
              border: "3px solid white",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "secondary.main", color: "#000" },
            }}
            size="large"
          >
            Sign In
          </LoadingButton>
        </Box>
      </Container>
      <Box
        flex={0.5}
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

export default Login;
