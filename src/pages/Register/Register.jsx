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

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const rose400 = "#fb7185";
  const rose500 = "#f43f5e";
  const black = "#000";

  const inputStyles = {
    "& label": { color: black },
    "& label.Mui-focused": { color: rose400 },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: black },
      "&:hover fieldset": { borderColor: rose500 },
      "&.Mui-focused fieldset": { borderColor: rose500 },
    },
    "& .MuiInputBase-input": { color: black },
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUppercase)
      return "Password must contain at least one uppercase letter.";
    if (!hasLowercase)
      return "Password must contain at least one lowercase letter.";
    if (!isLengthValid) return "Password must be at least 6 characters long.";
    return "";
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo, ...restFormData } =
      Object.fromEntries(formData.entries());

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password, name, photo)
      .then((result) => {
        const userProfile = {
          email,
          name,
          photo,
          ...restFormData,
          creationTime: result.metadata?.creationTime,
          lastSignInTime: result.metadata?.lastSignInTime,
        };

        fetch("https://recipe-book-server-eight.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account is created.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/login");
            }
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Sign Up failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const userProfile = {
          email: result.user?.email,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        fetch("https://recipe-book-server-eight.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Google Sign-In Successful.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In failed",
          text: error.message,
        });
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: black }}
        >
          Create an account
        </Typography>

        <Box component="form" onSubmit={handleSignUp} noValidate>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            required
            sx={inputStyles}
          />
          <TextField
            fullWidth
            label="Photo URL"
            name="photo"
            margin="normal"
            sx={inputStyles}
          />
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
            error={!!passwordError}
            helperText={passwordError}
            sx={inputStyles}
          />

          <MuiLink
            component="button"
            type="button"
            sx={{
              mt: 1,
              textAlign: "right",
              display: "block",
              color: rose400,
              "&:hover": { color: rose500 },
            }}
          >
            Forgot password?
          </MuiLink>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: rose400,
              color: "white",
              "&:hover": {
                backgroundColor: rose500,
              },
            }}
          >
            Register
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          fullWidth
          startIcon={<FcGoogle />}
          sx={{
            borderColor: rose400,
            color: rose400,
            "&:hover": {
              backgroundColor: "#ffe4e6",
              borderColor: rose500,
              color: rose500,
            },
          }}
        >
          Sign In with Google
        </Button>

        <Typography variant="body1" align="center" sx={{ mt: 3, color: black }}>
          Already have an account?{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{
              fontWeight: "bold",
              color: rose400,
              "&:hover": { color: rose500 },
            }}
          >
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
