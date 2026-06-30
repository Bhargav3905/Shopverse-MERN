import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
    }
)

export const AddToCart = mongoose.model("AddToCart", addToCartSchema);
export default AddToCart;