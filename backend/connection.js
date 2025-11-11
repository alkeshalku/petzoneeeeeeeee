const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongodb_url)
  .then(() => {
    console.log("Conntected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
