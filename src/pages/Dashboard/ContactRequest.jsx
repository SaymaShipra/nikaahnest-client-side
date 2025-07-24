import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Badge as MuiBadge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Message as MessageIcon, Delete } from "@mui/icons-material";

// Utility to format date safely
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString();
};

const ContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchContactRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/contact-requests"); // Your API endpoint
      console.log("Fetched contact requests:", res.data);

      if (Array.isArray(res.data)) {
        setContactRequests(res.data);
      } else {
        setContactRequests([]);
        console.warn("Unexpected response:", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch contact requests", error);
      setContactRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/contact-requests/${id}`);
      setContactRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Failed to delete request", error);
    }
  };

  return (
    <Box className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader
          avatar={<MessageIcon color="primary" />}
          title={<Typography variant="h6">My Contact Requests</Typography>}
        />
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress />
            </Box>
          ) : contactRequests.length === 0 ? (
            <Box textAlign="center" py={8}>
              <MessageIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Contact Requests
              </Typography>
              <Typography color="textSecondary">
                You haven't made any contact requests yet.
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="contact requests table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Biodata ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactRequests.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>{request.biodataName || "-"}</TableCell>
                      <TableCell>
                        <MuiBadge
                          badgeContent={`#${request.receiverId || "-"}`}
                          color="default"
                          sx={{ "& .MuiBadge-badge": { right: -12 } }}
                        />
                      </TableCell>
                      <TableCell>
                        <MuiBadge
                          badgeContent={"Pending"} // no status field in your data
                          color={"warning"}
                          sx={{ px: 1, borderRadius: 1, fontWeight: "bold" }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell>-</TableCell>

                      <TableCell>{request.userEmail || "-"}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          aria-label="delete request"
                          onClick={() => handleDelete(request._id)}
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <MessageIcon color="primary" sx={{ fontSize: 40 }} />
            <Box ml={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Total Requests
              </Typography>
              <Typography variant="h5">{contactRequests.length}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                height: 40,
                width: 40,
                bgcolor: "success.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  bgcolor: "success.main",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Approved
              </Typography>
              <Typography variant="h5">0</Typography> {/* No approval info */}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                height: 40,
                width: 40,
                bgcolor: "warning.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  bgcolor: "warning.main",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box ml={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Pending
              </Typography>
              <Typography variant="h5">{contactRequests.length}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Contact Info Dialog */}
      <Dialog
        open={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Contact Information</DialogTitle>
        <DialogContent dividers>
          {selectedRequest && (
            <>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedRequest.biodataName || "-"}
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Biodata ID
              </Typography>
              <Typography variant="body1" gutterBottom>
                #{selectedRequest.receiverId || "-"}
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Email Address
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedRequest.userEmail || "-"}
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Request Date
              </Typography>
              <Typography variant="body1">
                {formatDate(selectedRequest.createdAt)}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRequest(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactRequest;
