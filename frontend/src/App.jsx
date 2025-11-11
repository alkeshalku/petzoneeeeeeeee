import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProductView from "./components/ProductView";
import Admin from "./components/Admin";
import ProDetails from "./components/ProDetails";
import Homepage from "./components/Homepage";
function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pro" element={<ProductView />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/d" element={<ProDetails />} />

      </Routes>
    </>
  );
}

export default App;
