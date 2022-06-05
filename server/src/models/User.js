import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    enabled: { type: Boolean, default: false },
  },
  { timestamp: true }
)

const UserSchema = mongoose.model("users", userSchema)

export default UserSchema
