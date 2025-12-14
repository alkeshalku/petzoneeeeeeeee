const express = require("express");
const router = express.Router();
const Category = require("../model/Category");

// **1. Add Category**
router.post("/", async (req, res) => {
  try {
    // Check if category exists
    console.log(req.body)
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const newCategory = await Category(req.body).save();

    res
      .status(200)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding category", error: error.message });
  }
});

// **2. View All Categories**
router.get("/c", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

// **3. View Single Category by ID**
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
});

// // **4. Edit Category**
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
});

// // **5. Delete Category**
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCategory = await Category.findByIdAndDelete(id);

//     if (!deletedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting category", error: error.message });
//   }
// });


module.exports = router;
