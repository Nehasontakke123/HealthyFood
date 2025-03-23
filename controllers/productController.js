import Product from "../models/productModel.js";
import fs from "fs";
import path from "path";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get a single product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Add a new product (With Uploaded & External Image URLs)
export const addProduct = async (req, res) => {
  try {
    console.log("📸 Uploaded Files:", req.files);
    console.log("📦 Request Body:", req.body);

    const {
      productName,
      productDescription,
      productPrice,
      nutritionalInformation,
      productIngredients,
      storageInstructions,
      productImages = [] // Accept external image URLs
    } = req.body;

    // Handle uploaded images
    let uploadedImages = req.files?.map(file => `/uploads/${file.filename}`) || [];

    // Ensure productImages is always an array (convert if string)
    const imageUrls = typeof productImages === "string" ? [productImages] : productImages;

    // Merge uploaded and external image URLs
    const finalImages = [...uploadedImages, ...imageUrls].filter(img => img);

    console.log("✅ Final Product Images:", finalImages);

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      nutritionalInformation,
      productIngredients,
      storageInstructions,
      productImages: finalImages,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });

  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice, productImages } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let imageUrls = typeof productImages === "string" ? [productImages] : productImages || product.productImages;

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const uploadedImages = req.files.map((file) => `/uploads/${file.filename}`);
      imageUrls = [...imageUrls, ...uploadedImages];
    }

    product.productName = productName || product.productName;
    product.productDescription = productDescription || product.productDescription;
    product.productPrice = productPrice || product.productPrice;
    product.productImages = imageUrls;

    await product.save();
    res.json({ message: "Product updated successfully!", product });

  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.productImages.forEach((img) => {
      if (img.startsWith("/uploads/")) {
        fs.unlinkSync(path.join("uploads", img.split("/uploads/")[1]));
      }
    });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Add a customer review
export const addProductReview = async (req, res) => {
  try {
    console.log("💬 Review Request Body:", req.body);

    const { productId, reviewerName, reviewTitle, reviewText, isVerifiedPurchase } = req.body;

    if (!productId) return res.status(400).json({ message: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newReview = {
      reviewerName,
      reviewTitle,
      reviewText,
      isVerifiedPurchase,
      reviewDate: new Date(),
    };

    product.customerReviews.push(newReview);
    await product.save();

    res.json({ message: "Review added successfully!", product });

  } catch (error) {
    console.error("❌ Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error });
  }
};
