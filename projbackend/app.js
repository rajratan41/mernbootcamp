require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

// db Connection
const connectToDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running." + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
};

connectToDB();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
