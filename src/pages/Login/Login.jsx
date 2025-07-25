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
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInUser(email, password);
      const user = result.user;

      const userProfile = {
        email: user?.email,
        creationTime: user?.metadata?.creationTime,
        lastSignInTime: user?.metadata?.lastSignInTime,
        role: "user",
      };

      // Save or update user in database
      await fetch("https://nikaahnest-server-side.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      Swal.fire("Success", "Login successful!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userProfile = {
        email: user?.email,
        creationTime: user?.metadata?.creationTime,
        lastSignInTime: user?.metadata?.lastSignInTime,
        role: "user",
      };

      await fetch("https://nikaahnest-server-side.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      Swal.fire("Success", "Google sign-in successful!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 5, p: 4, mb: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            className="!bg-rose-300"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          className="!bg-rose-300 !text-white"
          startIcon={<FcGoogle />}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>

        <Typography
          className="!text-gray-600"
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "red" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
