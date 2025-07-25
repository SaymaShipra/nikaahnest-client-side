import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios"; // ✅ Import axios

const AdminManagement = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://nikaahnest-server-side.vercel.app/users/search?email=${email}`
      );
      setUser(res.data);
    } catch (err) {
      setUser(null);
      Swal.fire("Not Found", "No user found with that email", "error", err);
    }
  };

  const makeAdmin = async () => {
    try {
      await axios.patch(
        `https://nikaahnest-server-side.vercel.app/users/make-admin/${user.email}`
      );
      Swal.fire("Success", "User is now an admin", "success");
      setUser({ ...user, role: "admin" });
    } catch {
      Swal.fire("Error", "Could not make admin", "error");
    }
  };

  const removeAdmin = async () => {
    try {
      await axios.patch(
        `https://nikaahnest-server-side.vercel.app/users/remove-admin/${user.email}`
      );
      Swal.fire("Success", "Admin role removed", "success");
      setUser({ ...user, role: "user" });
    } catch {
      Swal.fire("Error", "Could not remove admin", "error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Admin Management
        </Typography>

        <TextField
          label="Search by Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          className="!bg-rose-400"
          onClick={handleSearch}
        >
          Search
        </Button>

        {user && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Created At:</strong>{" "}
              {new Date(user.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>

            {user.role !== "admin" ? (
              <Button
                variant="contained"
                className="!bg-rose-400"
                sx={{ mt: 2 }}
                onClick={makeAdmin}
              >
                Make Admin
              </Button>
            ) : (
              <Button variant="outlined" sx={{ mt: 2 }} onClick={removeAdmin}>
                Remove Admin
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminManagement;
