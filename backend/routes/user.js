var express = require("express");
const router = express.Router();
const userModel = require("../model/user");

// Signup
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await userModel(req.body).save();
    res.status(200).send({ message: "User added successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ message: "User not found" });
    }
    if (user.password ===req.body.password) {
        return res.status(200).send({ message: `Welcome ${user.role}`,user } );
      }
  
      return res.send({ message: "Invalid credentials" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Something went wrong", error: error.message });
    }
});

module.exports = router;
