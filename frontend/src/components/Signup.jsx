import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  var [inputs, setInputs] = useState({});
  const navigate = useNavigate()
  const inputHandler = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("in", inputs);
  };
  const addData = () => {
    console.log("clicked");
    axios
      .post(`${baseURL}/api`, inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            marginTop: 14,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>

          <form>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              onChange={inputHandler}
              value={inputs.fname}
              name="fname"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              onChange={inputHandler}
              value={inputs.email}
              name="email"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              onChange={inputHandler}
              value={inputs.password}
              name="password"
            />

            <Button
              onClick={addData}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
