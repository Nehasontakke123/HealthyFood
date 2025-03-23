import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productReviews: { type: Number, max: 5, default: 0 },
    productDescription: { type: String },
    productImages: { type: [String], default: [] }, // Default empty array
    productPrice: { type: Number, required: true },
    nutritionalInformation: {
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
    },
    productIngredients: [{ type: String }],
    storageInstructions: { type: String },
    customerReviews: [
      {
        reviewerName: { type: String, required: true },
        reviewTitle: { type: String },
        reviewDate: { type: Date, default: Date.now }, // Default date
        reviewText: { type: String, required: true },
        isVerifiedPurchase: { type: Boolean, default: false },
        helpfulCount: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
