import Product from "../models/productModel.js";

// Get all products
export const getAllProducts = async () => {
  return await Product.find();
};

// Get single product by ID
export const getProductById = async (id) => {
  return await Product.findById(id);
};

// Create a new product
export const createProduct = async (data) => {
  const newProduct = new Product(data);
  return await newProduct.save();
};

// Update product
export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete product
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
