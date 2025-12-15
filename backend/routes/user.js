var express = require("express");
const router = express.Router();
const userModel = require("../model/user");

// 1. LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ message: "User not found" });
    }
    if (user.isDisabled) {
        return res.status(403).send({ message: "This account has been disabled. Contact admin." });
    }
    if (user.password === req.body.password) {
      return res.status(200).send({ message: `Welcome ${user.role}`, user });
    }
    return res.send({ message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", error: error.message });
  }
});

// 2. GET ALL USERS
router.get("/users", async (req, res) => {
    try {
      const users = await userModel.find(); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

// 3. EDIT USER (Fixed: Added leading slash)
router.put("/users/:id", async (req, res) => { // <--- FIXED HERE
    try {
        const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true } 
        );
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});

// 4. DISABLE/ENABLE USER (Fixed: Added leading slash)
router.delete("/users/:id", async (req, res) => { // <--- FIXED HERE
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).send({ message: "User not found" });

    // Toggle status
    user.isDisabled = !user.isDisabled;
    await user.save();

    const statusMessage = user.isDisabled ? "disabled" : "enabled";
    res.status(200).json({ message: `User ${statusMessage} successfully`, isDisabled: user.isDisabled });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing user status", error: error.message });
  }
});

module.exports = router;