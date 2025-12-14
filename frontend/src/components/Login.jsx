import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Link } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null); // State for error messages
  
  
  const ACCENT_COLOR = '#ffeb3b'; // Vibrant Yellow
  const DARK_BG = '#121212'; // Near-Black background
  const CARD_BG = '#1e1e1e'; // Darker card background

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error on new input
  };

  const addHandler = () => {
    if (!user.email || !user.password) {
      setError("Email and password are required.");
      return;
    }

    axios
      .post(`${baseURL}/api/login`, user)
      .then((res) => {
        console.log(res.data)
        sessionStorage.setItem("role", res.data.user.role);
        // Assuming status 200 means success
        if (res.status === 200) { 
          alert(res.data.message);
          if(res.data.user.role === 'admin'){
            navigate('/admin')
          } else {
            navigate('/homepage')
          }
        }
      })
      .catch((err) => {
        // Handle specific API errors
        console.error("Login error:", err);
        setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: DARK_BG, // Dark page background
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "420px",
          padding: "3rem",
          backgroundColor: CARD_BG, // Dark card background
          borderRadius: "12px",
          boxShadow: '0 10px 40px rgba(0,0,0,0.8)', // Stronger, darker shadow
          borderTop: `4px solid ${ACCENT_COLOR}`, // Accent line for visual interest
        }}
      >
        {/* --- Header --- */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
            <FitnessCenterIcon sx={{ color: ACCENT_COLOR, fontSize: 48, mb: 1 }} />
            <Typography variant="h4" color="white" fontWeight={700} gutterBottom>
              GYM GEAR PRO
            </Typography>
            <Typography variant="subtitle1" color="#a0a0a0" mb={1}>
              Access your elite fitness hub
            </Typography>
        </Box>
        
        {/* --- Error Message --- */}
        {error && (
            <Typography color="error" align="center" variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                {error}
            </Typography>
        )}

        {/* --- Input Fields --- */}
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Email"
          name="email"
          onChange={inputHandler}
          error={!!error}
          // Custom styles for text fields in dark theme
          sx={{
            input: { color: 'white' },
            label: { color: '#a0a0a0' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#444' }, // Border color
              '&:hover fieldset': { borderColor: ACCENT_COLOR }, // Hover border
              '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' }, // Focus border
            },
            '& .MuiInputLabel-root.Mui-focused': { color: ACCENT_COLOR },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          onChange={inputHandler}
          error={!!error}
          // Apply the same custom styles
          sx={{
            input: { color: 'white' },
            label: { color: '#a0a0a0' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#444' },
              '&:hover fieldset': { borderColor: ACCENT_COLOR },
              '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: ACCENT_COLOR },
          }}
        />

        {/* --- Login Button --- */}
        <Button
          fullWidth
          variant="contained"
          onClick={addHandler}
          sx={{ 
            marginTop: "2rem", 
            padding: "0.8rem",
            backgroundColor: ACCENT_COLOR, // Accent color background
            color: DARK_BG, // Dark text on accent button
            fontWeight: 700,
            fontSize: '1.1rem',
            '&:hover': {
                backgroundColor: '#ffe000', // Slightly lighter on hover
            },
          }}
        >
          SECURE LOGIN
        </Button>

        {/* --- Sign Up Link --- */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "1.5rem", color: '#a0a0a0' }}
        >
          New to the team?{" "}
          <Link href="/signup" underline="hover" sx={{ color: ACCENT_COLOR, fontWeight: 600 }}>
            JOIN NOW
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;