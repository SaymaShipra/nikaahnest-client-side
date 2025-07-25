import React, { useState } from "react";
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
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Badge as MuiBadge,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Message as MessageIcon, Delete } from "@mui/icons-material";

// Format date helper
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date) ? "-" : date.toLocaleDateString();
};

const fetchContactRequests = async () => {
  const res = await axios.get(
    "https://nikaahnest-server-side.vercel.app/contact-requests"
  );
  return res.data;
};

const ContactRequest = () => {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const {
    data: contactRequests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contact-requests"],
    queryFn: fetchContactRequests,
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      await axios.delete(
        `https://nikaahnest-server-side.vercel.app/contact-requests/${id}`
      );
      queryClient.invalidateQueries({ queryKey: ["contact-requests"] });
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
          {isLoading ? (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Typography color="error">Failed to load data</Typography>
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
              <Table size="small">
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
                          badgeContent={"Pending"}
                          color="warning"
                          sx={{ px: 1, borderRadius: 1, fontWeight: "bold" }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{request.userEmail || "-"}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
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
              <Typography variant="h5">0</Typography>
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

      {/* Dialog */}
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
              <Typography variant="subtitle2" gutterBottom>
                Name
              </Typography>
              <Typography gutterBottom>
                {selectedRequest.biodataName || "-"}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Biodata ID
              </Typography>
              <Typography gutterBottom>
                #{selectedRequest.receiverId || "-"}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Email
              </Typography>
              <Typography gutterBottom>
                {selectedRequest.userEmail || "-"}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Request Date
              </Typography>
              <Typography>{formatDate(selectedRequest.createdAt)}</Typography>
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
