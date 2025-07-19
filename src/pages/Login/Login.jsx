import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const rose700 = "#fb7185";
  const rose800 = "#f43f5e";
  const black = "#000";
  const inputStyles = {
    "& label": { color: black },
    "& label.Mui-focused": { color: rose700 },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: black },
      "&:hover fieldset": { borderColor: rose800 },
      "&.Mui-focused fieldset": { borderColor: rose800 },
    },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());

    signIn(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Sign-In Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
        });
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            required
            sx={inputStyles}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            required
            sx={inputStyles}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <MuiLink
            component="button"
            type="button"
            sx={{ mt: 1, textAlign: "right", display: "block", color: rose700 }}
          >
            Forgot password?
          </MuiLink>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: rose700,
              "&:hover": {
                backgroundColor: rose800,
              },
            }}
          >
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          fullWidth
          startIcon={<FcGoogle />}
          sx={{
            borderColor: rose700,
            color: rose700,
            "&:hover": {
              backgroundColor: "#ffe4e6",
              borderColor: rose800,
              color: rose800,
            },
          }}
        >
          Sign In with Google
        </Button>

        <Typography variant="body1" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <MuiLink
            component={Link}
            to="/register"
            sx={{ fontWeight: "bold", color: rose700 }}
          >
            Register
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
