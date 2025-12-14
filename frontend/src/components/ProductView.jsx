import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip, // 1. Import Chip for category buttons
  Stack, // 1. Import Stack for layout
  CircularProgress
} from "@mui/material";
import axios from "axios";

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  // --- Theme Constants ---
  const ACCENT_COLOR = '#ffeb3b'; 
  const DARK_BG = '#121212';
  const CARD_BG = '#1e1e1e';

  // --- Fetch Products ---
  useEffect(() => {
    axios
      .get(`${baseURL}/product/`)
      .then((res) => {
        if (Array.isArray(res.data)) {
           setProducts(res.data);
        } else if (res.data.products && Array.isArray(res.data.products)) {
           setProducts(res.data.products); 
        } else {
           setProducts([]); 
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [baseURL]);

  // --- Fetch Categories ---
  useEffect(() => {
    axios
      .get(`${baseURL}/cat/c`) 
      .then((res) => {
        const cats = Array.isArray(res.data) ? res.data : res.data.categories || [];
        setCategories(cats);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [baseURL]);

  // --- Handle Filter Click ---
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // --- Filter Logic ---
  const filteredProducts = products.filter((product) => {
    // 1. Check availability
    if (!product.isAvailable) return false;
    
    // 2. Check Category (if "All" is selected, return true)
    if (selectedCategory === "All") return true;

    // 3. Match Product Category
    // Note: Ensure product.category is populated (is an object) or is just an ID string
    const productCatId = typeof product.category === 'object' 
      ? product.category?._id 
      : product.category;

    return productCatId === selectedCategory;
  });

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        padding: 4, 
        backgroundColor: DARK_BG, 
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
          color: 'white', 
          marginBottom: 3,
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
          Elite Fitness Gear
      </Typography>

      {/* --- Category Filter Section --- */}
      <Stack 
        direction="row" 
        spacing={1} 
        justifyContent="center" 
        flexWrap="wrap" 
        useFlexGap
        sx={{ marginBottom: 5 }}
      >
        {/* "All" Button */}
        <Chip 
          label="All Products" 
          clickable 
          onClick={() => handleCategoryClick("All")}
          sx={{ 
            bgcolor: selectedCategory === "All" ? ACCENT_COLOR : '#333',
            color: selectedCategory === "All" ? 'black' : 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '10px 5px',
            '&:hover': { bgcolor: selectedCategory === "All" ? '#ffe000' : '#444' }
          }}
        />

        {/* Dynamic Category Buttons */}
        {categories.map((cat) => (
          <Chip 
            key={cat._id} 
            label={cat.name} 
            clickable 
            onClick={() => handleCategoryClick(cat._id)}
            sx={{ 
              bgcolor: selectedCategory === cat._id ? ACCENT_COLOR : '#333',
              color: selectedCategory === cat._id ? 'black' : 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 5px',
              '&:hover': { bgcolor: selectedCategory === cat._id ? '#ffe000' : '#444' }
            }}
          />
        ))}
      </Stack>

      {/* --- Product Grid --- */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress sx={{ color: ACCENT_COLOR }} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card 
                  sx={{ 
                    height: "100%", 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2, 
                    backgroundColor: CARD_BG, 
                    color: 'white', 
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)', 
                    transition: 'transform 0.3s', 
                    '&:hover': { 
                      transform: 'translateY(-5px)', 
                      boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                      border: `1px solid ${ACCENT_COLOR}` 
                    } 
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250" 
                    image={
                      product.images && product.images.length > 0 
                        ? `${baseURL}/uploads/${product.images[0]}` 
                        : "https://via.placeholder.com/250?text=Premium+Gear"
                    }
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, padding: 3 }}>
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
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        my: 1, 
                        fontWeight: 800, 
                        color: ACCENT_COLOR 
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2, 
                        minHeight: '3rem', 
                        color: '#a0a0a0', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical' 
                      }}
                    >
                      {product.description}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: product.stock > 0 ? '#4caf50' : '#f44336', 
                        fontWeight: 600, 
                        marginBottom: 2
                      }}
                    >
                      {product.stock > 0 ? `IN STOCK (${product.stock})` : 'SOLD OUT'}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      disabled={product.stock === 0}
                      sx={{
                        backgroundColor: ACCENT_COLOR,
                        color: DARK_BG,
                        fontWeight: 700,
                        '&:hover': { backgroundColor: '#ffe000' },
                        '&:disabled': { backgroundColor: '#303030', color: '#606060' }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box width="100%" textAlign="center" mt={4}>
              <Typography variant="h5" color="text.secondary">
                No products found in this category.
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ProductView;