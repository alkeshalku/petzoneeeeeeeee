import React, { useState, useEffect } from 'react'; // 1. Added Hooks
import { Link } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  CircularProgress, // Added for loading state
  Alert // Added for error state
} from '@mui/material';

import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  LocalShipping as LocalShippingIcon,
  HighQuality as HighQualityIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';

// --- CONFIGURATION ---
const API_BASE_URL = "http://localhost:3000"; // Ensure this matches your backend port

// 1. DEFINE A THEME & CONSTANTS (Unchanged)
const ACCENT_COLOR = '#ffeb3b';
const DARK_BG = '#121212';
const PAPER_BG = '#1e1e1e';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT_COLOR },
    secondary: { main: '#f50057' },
    background: { default: DARK_BG, paper: PAPER_BG },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 600 },
    h2: { fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1.1rem', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', padding: '10px 24px' },
        containedPrimary: { color: DARK_BG, fontWeight: 'bold' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease-in-out',
          backgroundColor: PAPER_BG,
          '&:hover': { transform: 'translateY(-5px)' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: PAPER_BG, color: '#ffffff', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)' },
      },
    },
  },
});

const sellingPoints = [
  {
    title: 'Fast Shipping',
    description: 'Get your gear quickly with our expedited shipping options.',
    icon: <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  },
  {
    title: 'Pro-Grade Quality',
    description: 'We stock only the best, most durable and effective products.',
    icon: <HighQualityIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  },
  {
    title: 'Secure Checkout',
    description: 'Your data is protected with bank-level security and encryption.',
    icon: <VerifiedUserIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  },
];

// 2. MAIN HOMEPAGE COMPONENT
const Homepage = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Could not load products. Please ensure the server is running.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <main>
        {/* 3. HERO SECTION */}
        <Box sx={{ bgcolor: 'background.default', pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
              Unleash Your Potential
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Premium fitness gear, apparel, and supplements. Everything you need
              to conquer your goals and dominate your workouts.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" size="large" component={Link} to="/pro">
                Shop All Products
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>

        {/* 4. FEATURED PRODUCTS SECTION */}
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom>
              Featured Products
            </Typography>
            
            {/* Loading State */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            )}

            {/* Error State */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            )}

            {/* Product Grid */}
            {!loading && !error && (
              <Grid container spacing={4} sx={{ mt: 4 }}>
                {products.length > 0 ? (
                  products.slice(0, 4).map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                          component="img"
                          height="240"
                          // Construct URL: Base URL + /uploads/ + filename
                          image={
                            product.images && product.images.length > 0 
                              ? `${API_BASE_URL}/uploads/${product.images[0]}` 
                              : 'https://placehold.co/600x400/1e1e1e/ffeb3b?text=No+Image'
                          }
                          alt={product.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                          </Typography>
                          <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                            ₹{product.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description 
                              ? (product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description) 
                              : 'No description available'}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2, justifyContent: 'center' }}>
                          <Button component={Link} to={`/pro/${product._id}`} variant="contained" color="primary" size="large" fullWidth>
                            View product
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="h6" align="center" sx={{ width: '100%', color: 'text.secondary' }}>
                    No products found.
                  </Typography>
                )}
              </Grid>
            )}
          </Container>
        </Box>

        {/* 5. WHY SHOP WITH US SECTION (Unchanged) */}
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom>
              Why Shop With Us?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {sellingPoints.map((point) => (
                <Grid size={{xs:12,md:4}}  key={point.title}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>{point.icon}</Box>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {point.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {point.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* 6. ABOUT SECTION (Unchanged) */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{xs:12,md:4}}>
                <Typography variant="h2" gutterBottom>Our Mission</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We believe that fitness is a journey, not a destination. Our mission is to provide you with the highest quality gear.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Join the Community</Button>
              </Grid>
              <Grid size={{xs:12,md:4}}>
                <Box
                  component="img"
                  src="https://placehold.co/600x400/ffeb3b/121212?text=GYMZONE+HQ"
                  alt="GYMZONE HQ"
                  sx={{ width: '100%', height: 'auto', borderRadius: 4, boxShadow: '0 12px 24px 0 rgba(0,0,0,0.1)' }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      
      {/* 7. FOOTER (Unchanged) */}
      <Box component="footer" sx={{ py: 6, bgcolor: PAPER_BG, color: 'text.primary' }}>
        <Container maxWidth="lg">
            {/* ... Footer Content ... */}
             <Typography variant="body2" align="center" sx={{ color: 'grey.500' }}>
               © {new Date().getFullYear()} GYMZONE.
             </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Homepage;