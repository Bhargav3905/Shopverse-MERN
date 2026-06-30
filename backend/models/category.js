import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        }
    }
)

export const Category = mongoose.model("Category", categorySchema);
export default Category;