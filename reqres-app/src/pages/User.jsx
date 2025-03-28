import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser, updateUser } from "../service/api";
import UserCard from "../component/UserCard";
import {
  Container,
  Grid,
  Snackbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Pagination,
  CircularProgress,
  Alert,
} from "@mui/material";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // Search Input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced Search Value
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    loadUsers();
  }, [page]);

  // **Debounce the search input**
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // **Filtering Logic for Search**
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase()) // Using debounced value
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdate = async () => {
    try {
      if (
        !updatedUser.first_name ||
        !updatedUser.last_name ||
        !updatedUser.email
      ) {
        setSnackbar({
          open: true,
          message: "All fields are required!",
          severity: "warning",
        });
        return;
      }

      const response = await updateUser(editingUser.id, updatedUser);

      if (response) {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...updatedUser } : user
          )
        );

        setEditingUser(null);
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to update user.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong. Try again!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setSnackbar({
        open: true,
        message: "User deleted successfully!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to delete user.",
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Typography variant="h4">Users List</Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Search Bar with Debouncing */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        sx={{ my: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}
      {!loading && filteredUsers.length === 0 && (
        <Typography>No users found.</Typography>
      )}

      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog
          open={Boolean(editingUser)}
          onClose={() => setEditingUser(null)}
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}
            >
              <TextField
                fullWidth
                label="First Name"
                value={updatedUser.first_name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, first_name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Last Name"
                value={updatedUser.last_name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, last_name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingUser(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UsersPage;
