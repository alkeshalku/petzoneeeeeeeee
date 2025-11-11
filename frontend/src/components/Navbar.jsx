import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton, // Added
  Container,  // Added
  Box,        // Added
} from "@mui/material";
import { createTheme } from "@mui/material/styles"; // Added
import {
  Menu as MenuIcon, // Added
  Facebook as FacebookIcon, // Added
  Twitter as TwitterIcon, // Added
  LinkedIn as LinkedInIcon, // Added
  ShoppingCart as ShoppingCartIcon, // Added
  LocalShipping as LocalShippingIcon, // Added
  HighQuality as HighQualityIcon, // Added
  VerifiedUser as VerifiedUserIcon, // Added
} from '@mui/icons-material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link, useNavigate } from "react-router-dom";

// Theme constants used in sx props
const ACCENT_COLOR = '#ffeb3b'; // Vibrant Yellow
const DARK_BG = '#121212'; // Near-Black background
const PAPER_BG = '#1e1e1e'; // Darker background for cards/appbar


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: ACCENT_COLOR,
    },
    secondary: {
      main: '#f50057', // A vibrant pink for secondary actions if needed
    },
    background: {
      default: DARK_BG,
      paper: PAPER_BG,
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
          textTransform: 'none',
          padding: '10px 24px',
        },
        containedPrimary: {
          color: DARK_BG, // Make text on yellow buttons dark
          fontWeight: 'bold',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Rounded cards
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease-in-out',
          backgroundColor: PAPER_BG,
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: PAPER_BG,
          color: '#ffffff',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        },
      },
    },
  },
});

function Navbar() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user role on mount
    const savedRole = sessionStorage.getItem("role");
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setRole(null); // Clear role from state
    navigate("/");
  };

  return (
    
    <AppBar position="static" sx={{ backgroundColor: PAPER_BG, borderBottom: `2px solid ${ACCENT_COLOR}` }}>
      <Toolbar>

        {/* --- Brand/Logo Section --- */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 1.5
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: 'white', display: 'flex', alignItems: 'center' }}>
            <FitnessCenterIcon sx={{ color: ACCENT_COLOR, marginRight: 1 }} />
            GYM GEAR PRO
          </Link>
        </Typography>

        {/* --- Navigation Links --- */}

        <Button color="inherit">
          <Link to="/pro" style={{ textDecoration: "none", color: "white", fontWeight: 600 }}>
            <Typography variant="button" sx={{ '&:hover': { color: ACCENT_COLOR } }}>
              Shop Gear
            </Typography>
          </Link>
        </Button>

        {/* --- Admin Link (Conditional) --- */}
        {role === "admin" && (
          <Button color="inherit">
            <Link to="/admin" style={{ textDecoration: "none", color: ACCENT_COLOR, fontWeight: 600 }}>
              <Typography variant="button" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Manage Inventory
              </Typography>
            </Link>
          </Button>
        )}

        {/* --- Logout Button (Conditional) --- */}
        {role && (
          <Button
            variant="outlined" // Use outlined variant for emphasis
            onClick={handleLogout}
            sx={{
              marginLeft: 2,
              color: ACCENT_COLOR,
              borderColor: ACCENT_COLOR,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: ACCENT_COLOR,
                color: PAPER_BG, // Use paper bg for contrast on hover
                borderColor: ACCENT_COLOR,
              }
            }}
          >
            LOGOUT
          </Button>
        )}

      </Toolbar>
    </AppBar>
    
  );
}

export default Navbar;