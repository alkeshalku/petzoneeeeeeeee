import React from 'react';
import { Link } from "react-router-dom"
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardActions,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  HighQuality as HighQualityIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';



// 1. DEFINE A THEME & CONSTANTS
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

// Data for sections
const featuredProducts = [
  {
    id: 1,
    name: 'Pro-Series Whey Protein',
    price: '₹1500 TO ₹5000',
    description: '25g of high-quality whey isolate.',
    image: 'https://placehold.co/600x400/1e1e1e/ffeb3b?text=Whey+Protein',
  },
  {
    id: 2,
    name: 'Performance Joggers',
    price: '$74.99',
    description: 'Ultra-flexible and durable for any workout.',
    image: 'https://placehold.co/600x400/1e1e1e/ffeb3b?text=Joggers',
  },
  {
    id: 3,
    name: 'Pre-Workout ',
    price: '$44.99',
    description: 'Explosive energy and focus.',
    image: 'https://placehold.co/600x400/1e1e1e/ffeb3b?text=Pre-Workout',
  },
    {
    id: 4,
    name: 'Gym equiments ',
    price: '$44.99',
    description: 'Explosive energy and focus.',
    image: 'https://placehold.co/600x400/1e1e1e/ffeb3b?text=Pre-Workout',
  },
];

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes browser styles */}
      
   

      
      {/* 8. HOMEPAGE CONTENT */}
      <main>
        {/* 3. HERO SECTION */}
        <Box
          sx={{
            bgcolor: 'background.default',
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
              Unleash Your Potential
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Premium fitness gear, apparel, and supplements. Everything you need
              to conquer your goals and dominate your workouts.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" size="large">
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
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {featuredProducts.map((product) => (
                <Grid size={{md:3}} key={product.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                        {product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, justifyContent: 'center' }}>
                      <Button component={Link} to="/pro" variant="contained" color="primary" size="large" fullWidth>
                        View product 

                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* 5. "WHY SHOP WITH US" SECTION */}
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom>
              Why Shop With Us?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {sellingPoints.map((point) => (
                <Grid size={{md:4}} key={point.title}>
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

        {/* 6. ABOUT SECTION */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We believe that fitness is a journey, not a destination. Our
                  mission is to provide you with the highest quality gear and
                  supplements to support you every step of the way.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Founded by athletes for athletes, GYMZONE is more than a brand.
                  We are a community dedicated to pushing boundaries.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Join the Community
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://placehold.co/600x400/ffeb3b/121212?text=GYMZONE+HQ"
                  alt="GYMZONE HQ"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 12px 24px 0 rgba(0,0,0,0.1)',
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      
      {/* 7. FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 6,
          bgcolor: PAPER_BG, // Use paper background for footer
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                GYMZONE
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Fuel Your Fitness Journey.
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="overline" gutterBottom sx={{ color: 'grey.300' }}>
                Shop
              </Typography>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Apparel</Link>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Supplements</Link>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Equipment</Link>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="overline" gutterBottom sx={{ color: 'grey.300' }}>
                Product
              </Typography>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Features</Link>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Pricing</Link>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Docs</Link>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="overline" gutterBottom sx={{ color: 'grey.300' }}>
                Company
              </Typography>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>About Us</Link>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Careers</Link>
              <Link href="#" color="inherit" display="block" variant="body2" sx={{ mb: 1, textDecoration: 'none' }}>Contact</Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="overline" gutterBottom sx={{ color: 'grey.300' }}>
                Follow Us
              </Typography>
              <Box>
                <IconButton color="inherit" aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            sx={{ color: 'grey.500', pt: 4, mt: 4, borderTop: '1px solid', borderColor: 'grey.800' }}
            align="center"
          >
            © {new Date().getFullYear()} GYMZONE. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Homepage;