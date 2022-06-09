import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamp: true }
)

const CategorySchema = mongoose.model("category", categorySchema)

export default CategorySchema
