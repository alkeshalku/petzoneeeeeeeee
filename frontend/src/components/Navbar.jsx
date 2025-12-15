import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link, useNavigate } from "react-router-dom";

// Theme constants
const ACCENT_COLOR = '#ffeb3b'; 
const PAPER_BG = '#1e1e1e'; 

function Navbar() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = sessionStorage.getItem("role");
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setRole(null); 
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: PAPER_BG, borderBottom: `2px solid ${ACCENT_COLOR}` }}>
      <Toolbar>
        {/* --- Brand/Logo --- */}
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1.5 }}>
          <Link to="/" style={{ textDecoration: "none", color: 'white', display: 'flex', alignItems: 'center' }}>
            <FitnessCenterIcon sx={{ color: ACCENT_COLOR, marginRight: 1 }} />
            GYM GEAR PRO
          </Link>
        </Typography>

        {/* --- Standard Links --- */}
        <Button color="inherit">
          <Link to="/pro" style={{ textDecoration: "none", color: "white", fontWeight: 600 }}>
            Shop Gear
          </Link>
        </Button>

        {/* --- ADMIN ONLY LINKS --- */}
        {role === "admin" && (
          <>
            <Button color="inherit">
              <Link to="/admin" style={{ textDecoration: "none", color: ACCENT_COLOR, fontWeight: 600 }}>
                Inventory
              </Link>
            </Button>
            
            {/* NEW LINK ADDED HERE */}
            <Button color="inherit" sx={{ marginLeft: 1 }}>
              <Link to="/users" style={{ textDecoration: "none", color: ACCENT_COLOR, fontWeight: 600 }}>
                Manage Users
              </Link>
            </Button>
          </>
        )}

        {/* --- Logout --- */}
        {role && (
          <Button
            variant="outlined" 
            onClick={handleLogout}
            sx={{
              marginLeft: 2,
              color: ACCENT_COLOR,
              borderColor: ACCENT_COLOR,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: ACCENT_COLOR,
                color: PAPER_BG,
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