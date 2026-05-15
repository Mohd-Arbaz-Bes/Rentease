import express from "express";
import Product from "../models/product.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// ✅ GET ALL PRODUCTS + FILTER
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    // CATEGORY FILTER
    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    // SEARCH FILTER
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await Product.find(filter);

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ CREATE PRODUCT (WITH CLOUDINARY IMAGE UPLOAD)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      pricePerMonth: req.body.pricePerMonth,
      category: req.body.category,
      description: req.body.description,
      deposit: req.body.deposit,
      stock: req.body.stock,

      image: req.file ? req.file.path : "", // Cloudinary URL
    });

    await newProduct.save();

    res.status(201).json(newProduct);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE PRODUCT (IMAGE OPTIONAL)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;