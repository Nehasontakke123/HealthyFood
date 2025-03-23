import express from "express";
import multer from "multer";
import path from "path";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
  addProductReview,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ **Multer Storage Configuration**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store in `uploads/` folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ **Routes**
router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", upload.array("productImages", 4), addProduct);

router.put("/:id", upload.array("productImages", 4), updateProduct);

router.delete("/:id", removeProduct);

router.post("/add-review", addProductReview);

export default router;
