// index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { connection } = require("./config/db"); // Assuming your connection configuration is in "config/db.js"

// Import environment variables
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const Product = mongoose.model("Product", {
  name: String,
  imageUrl: String,
  description: String,
  price: Number
});

// Define routes
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).json({ error: "No file uploaded" });
    // }

    // const imageUrl = req.file.filename;
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to the database");
  } catch (err) {
    console.error(err);
  }
  console.log(`Server is running at port ${port}`);
});
