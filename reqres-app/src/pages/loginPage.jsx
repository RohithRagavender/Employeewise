import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/users"); // Redirect on success
      } else {
        setErrorMessage("Invalid credentials!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 10,
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email}
            helperText={!email ? "Email is required" : ""}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password}
            helperText={!password ? "Password is required" : ""}
          />

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
