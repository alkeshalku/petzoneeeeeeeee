const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const upload = require("../middleware/multer");

router.post('/',upload.array("images", 5),async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;
        const imagePaths = req.files.map(file => file.filename)

      const newProduct = new Product({
        name,
        price,
        category,
        description,
        stock,
        images: imagePaths, // Store image path in array
      });
  
      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding product", error: error.message });
    }
  });

  // router.get('/',async (req, res) => {
  //   try {
  //     const products = await Product.find() // Populate category details
  //     res.status(200).json(products);
  //     console.log(products)
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ message: "Internal server error", error: error.message });
  //   }
  // });

  router.get('/', async (req, res) => {
    try {
      const products = await Product.find().populate("category"); // 👈 this line is key!
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  router.put('/:id', upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, category, description, stock,isAvailable  } = req.body;
  
      const updatedFields = {
        name,
        price,
        category,
        description,
        stock,
        isAvailable: isAvailable === 'true' || isAvailable === true, 
      };
  
      if (req.file) {
        // If new image uploaded, update the image path
        updatedFields.images = [req.file.filename]; // OR full path if needed
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  module.exports=router
  