import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider // Added Divider for visual separation
} from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness'; // Added an icon
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

// Renamed component for better context
const Admin = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();

  // Define theme colors
  const ACCENT_COLOR = '#ffeb3b'; // Vibrant Yellow
  const DARK_BG = '#121212'; // Near-Black background
  const CARD_BG = '#1e1e1e'; // Darker card background

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    isAvailable: true,
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const isEditing = location.state !== null && location.state.pro;

  // --- Data Fetching and Initialization ---
  useEffect(() => {
    // 1. Fetch categories
    axios
      .get(`${baseURL}/cat`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));

    // 2. Load existing product data if editing
    if (isEditing) {
      const { pro } = location.state;
      setProductData({
        name: pro.name || "",
        price: pro.price || "",
        category: pro.category?._id || pro.category || "", // Handle both object and ID
        description: pro.description || "",
        stock: pro.stock || "",
        isAvailable: pro.isAvailable ?? true,
        images: [], // images are typically not prefilled for security/simplicity
      });
    }
  }, [location.state, baseURL, isEditing]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleToggle = (e) => {
    setProductData({ ...productData, isAvailable: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("isAvailable", productData.isAvailable);

    productData.images.forEach((file) => {
      formData.append("images", file);
    });

    if (isEditing) {
      const id = location.state.pro._id;
      axios
        .put(`${baseURL}/product/${id}`, formData)
        .then((res) => {
          alert(res.data.message);
          navigate("/pro");
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      axios
        .post(`${baseURL}/product`, formData)
        .then((res) => {
          alert("Product added successfully!");
          // Reset form after successful submission
          setProductData({
            name: "",
            price: "",
            category: "",
            description: "",
            stock: "",
            isAvailable: true,
            images: [],
          });
          navigate('/pro'); // Redirect to product listing
        })
        .catch((err) => {
          console.error("Add error:", err);
          alert("Error adding product");
        });
    }
  };

  // --- Styling for TextFields and Select in Dark Theme ---
  const darkInputStyle = {
    input: { color: 'white' },
    label: { color: '#a0a0a0' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#444' }, 
        '&:hover fieldset': { borderColor: ACCENT_COLOR }, 
        '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' },
        color: 'white'
    },
    '& .MuiInputLabel-root.Mui-focused': { color: ACCENT_COLOR },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: DARK_BG, // Dark page background
        p: 4,
      }}
    >
        {/* --- Back to Listing Button (Styled) --- */}
        <Box sx={{ width: '100%', maxWidth: 600, mb: 3, textAlign: 'right' }}>
            <Button 
                variant="outlined"
                startIcon={<ListAltIcon />}
                component={Link} 
                to="/d" // Changed path to reflect product details/listing
                sx={{
                    color: ACCENT_COLOR,
                    borderColor: ACCENT_COLOR,
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: ACCENT_COLOR,
                        color: DARK_BG,
                        borderColor: ACCENT_COLOR,
                    }
                }}
            >
                View All Products
            </Button>
        </Box>

        {/* --- Form Container --- */}
        <Paper 
            elevation={6} 
            sx={{ 
                p: 5, 
                width: "100%", 
                maxWidth: 600,
                backgroundColor: CARD_BG, // Dark card background
                borderRadius: '12px',
                borderTop: `4px solid ${ACCENT_COLOR}` 
            }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AddBusinessIcon sx={{ color: ACCENT_COLOR, mr: 1, fontSize: 32 }} />
            <Typography variant="h5" color="white" fontWeight={700}>
                {isEditing ? "UPDATE PRODUCT" : "ADD NEW GEAR"}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3, backgroundColor: '#444' }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Name & Price */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Product Name *"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                  sx={darkInputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Price (₹) *"
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={handleChange}
                  required
                  sx={darkInputStyle}
                />
              </Grid>

              {/* Category & Stock */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required sx={darkInputStyle}>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    label="Category *"
                    sx={{ color: 'white', '.MuiSvgIcon-root': { color: ACCENT_COLOR } }} // Dropdown arrow color
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id} sx={{ color: DARK_BG }}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  value={productData.stock}
                  onChange={handleChange}
                  sx={darkInputStyle}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={productData.description}
                  onChange={handleChange}
                  sx={darkInputStyle}
                />
              </Grid>

              {/* Availability Toggle */}
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productData.isAvailable}
                      onChange={handleToggle}
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': { color: ACCENT_COLOR },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: ACCENT_COLOR },
                      }}
                    />
                  }
                  label={<Typography sx={{ color: 'white', fontWeight: 600 }}>Available for Sale</Typography>}
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12} sm={6}>
                <Button 
                    variant="contained" 
                    component="label" 
                    fullWidth
                    sx={{
                        backgroundColor: ACCENT_COLOR,
                        color: DARK_BG,
                        fontWeight: 700,
                        '&:hover': { backgroundColor: '#ffe000' }
                    }}
                >
                    Upload Product Images
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          images: Array.from(e.target.files),
                        })
                      }
                    />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1, color: '#a0a0a0' }}>
                  {productData.images.length} file(s) selected
                </Typography>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ 
                mt: 4, 
                padding: '0.8rem',
                backgroundColor: ACCENT_COLOR,
                color: DARK_BG,
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': { backgroundColor: '#ffe000' },
              }}
            >
              {isEditing ? "SAVE CHANGES" : "ADD PRODUCT"}
            </Button>
          </form>
        </Paper>
    </Box>
  );
};

export default Admin;