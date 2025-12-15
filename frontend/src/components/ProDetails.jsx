import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Define theme colors
const ACCENT_COLOR = '#ffeb3b'; // Vibrant Yellow
const DARK_BG = '#121212'; // Near-Black background
const TABLE_BG = '#1e1e1e'; 

const ProDetails = () => { 
  const [products, setProducts] = useState([]);
  
  const API_URL = "http://localhost:3000/product/"; 
  
  var location = useLocation();
  var navigate = useNavigate();
  console.log("loc", location.state);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const updateProd = (pro) => {
    console.log(pro);
    
    navigate("/admin", { state: { pro } }); 
  };
  
  
  const getStockColor = (stock) => (stock > 10 ? '#4caf50' : stock > 0 ? ACCENT_COLOR : '#f44336');
  const getAvailabilityText = (isAvailable) => (isAvailable ? "Available" : "Hidden");


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: DARK_BG, // Dark page background
        p: 4,
      }}
    >
      <Box sx={{ width: "90%", maxWidth: "1200px" }}>
        {/* --- Header --- */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FitnessCenterIcon sx={{ color: ACCENT_COLOR, mr: 1, fontSize: 32 }} />
            <Typography variant="h5" color="white" fontWeight={700}>
                INVENTORY MANAGEMENT
            </Typography>
        </Box>
        
        {/* --- Table --- */}
        <TableContainer 
            component={Paper} 
            sx={{ 
                backgroundColor: TABLE_BG, 
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                borderRadius: '8px'
            }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& th': { backgroundColor: TABLE_BG, color: ACCENT_COLOR, fontWeight: 700, borderBottom: `2px solid ${ACCENT_COLOR}` } }}>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: ACCENT_COLOR }}>Product</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: ACCENT_COLOR }}>Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: ACCENT_COLOR }}>Stock</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: ACCENT_COLOR }}>Category</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: ACCENT_COLOR }}>Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} sx={{ color: ACCENT_COLOR }}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow 
                    key={product._id} 
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#252525' }, '&:hover': { backgroundColor: '#333' } }}
                >
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>{product.name}</TableCell>
                  <TableCell sx={{ color: 'white' }}>₹{product.price}</TableCell>
                  <TableCell sx={{ color: getStockColor(product.stock), fontWeight: 600 }}>
                    {product.stock}
                  </TableCell>
                  <TableCell sx={{ color: '#a0a0a0' }}>{product.category?.name || "N/A"}</TableCell>
                  <TableCell sx={{ color: product.isAvailable ? '#4caf50' : '#f44336', fontWeight: 600 }}>
                    {getAvailabilityText(product.isAvailable)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        updateProd(product);
                      }}
                      sx={{
                        backgroundColor: ACCENT_COLOR,
                        color: DARK_BG,
                        fontWeight: 700,
                        '&:hover': { backgroundColor: '#ffe000' },
                      }}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProDetails;