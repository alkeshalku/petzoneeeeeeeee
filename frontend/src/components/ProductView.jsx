import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button, // Added Button for the style update
} from "@mui/material";
import axios from "axios";

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Note: Assuming your API returns an array of products
    axios
      .get(`${baseURL}/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching gym products:", err));
  }, [baseURL]);

  // Define a vibrant accent color for the theme
  const ACCENT_COLOR = '#ffeb3b'; // Vibrant Yellow
  const DARK_BG = '#121212'; // Near-Black background

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        padding: 4, 
        backgroundColor: DARK_BG, // Dark background for a premium feel
        minHeight: '100vh' 
      }}
    >
      {/* --- Page Header --- */}
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          fontWeight: 800, 
          color: 'white', // White text on dark background
          marginBottom: 5,
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
         ELITE FITNESS GEAR
      </Typography>

      {/* --- Product Grid --- */}
      <Grid container spacing={4}>
        {products
          .filter((product) => product.isAvailable)
          .map((product) => (
            <Grid size={{md:4}} key={product._id}>
              <Card 
                sx={{ 
                  height: "100%", 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2, // Slightly rounded corners
                  backgroundColor: '#1e1e1e', // Darker card background
                  color: 'white', // Default white text
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)', // Stronger shadow
                  transition: 'transform 0.3s', 
                  '&:hover': { 
                    transform: 'translateY(-5px)', // Lift on hover
                    boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                    border: `1px solid ${ACCENT_COLOR}` // Accent border on hover
                  } 
                }}
              >
                <CardMedia
                  component="img"
                  height="250" 
                  image={
                    product.images && product.images.length > 0 
                      ? `http://localhost:3000/uploads/${product.images[0]}` 
                      : "https://via.placeholder.com/250?text=Premium+Gear"
                  }
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                
                <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                  {/* Product Name - Bolder and uppercase */}
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700, 
                      minHeight: '3rem', 
                      textTransform: 'uppercase',
                      color: 'white' 
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  {/* Price - Highlighted with accent color */}
                  <Typography 
                    variant="h4" // Larger price font
                    sx={{ 
                      my: 1, 
                      fontWeight: 800, 
                      color: ACCENT_COLOR 
                    }}
                  >
                    ₹{product.price}
                  </Typography>
                  
                  {/* Description - Subtler color */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2, 
                      minHeight: '3rem', 
                      color: '#a0a0a0', // Lighter grey for secondary text
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical' 
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  {/* Stock Status - Clear color indication */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: product.stock > 0 ? '#4caf50' : '#f44336', // Green or Red
                      fontWeight: 600, 
                      marginBottom: 2
                    }}
                  >
                    {product.stock > 0 ? `IN STOCK (${product.stock})` : 'SOLD OUT'}
                  </Typography>

                  {/* Action Button - Full width, accent-colored */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={product.stock === 0}
                    sx={{
                      backgroundColor: ACCENT_COLOR,
                      color: DARK_BG,
                      fontWeight: 700,
                      '&:hover': {
                        backgroundColor: '#ffe000', // Slight variation on hover
                      },
                      '&:disabled': {
                        backgroundColor: '#303030',
                        color: '#606060'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductView;