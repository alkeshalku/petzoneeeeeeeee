var express = require("express");
var cors = require("cors");
const dotenv = require("dotenv"); 
dotenv.config();
const port = process.env.port;
require("./connection");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const signup_routes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/Product");

app.use("/api", signup_routes);
app.use("/cat", categoryRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`listenting to ${port}`);
});
