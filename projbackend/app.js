require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

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

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api/v1", authRoutes);

// Port
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
