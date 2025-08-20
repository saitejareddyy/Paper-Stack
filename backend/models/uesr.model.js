import mongoose from "mongoose";

const uesrSchema = mongoose.Schema({
  username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
      type: Boolean
    }
})

export const User = mongoose.model("User", uesrSchema);