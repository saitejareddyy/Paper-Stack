import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {type: String, required: true},
  fileUrl: {type: String, required: true},
  uploadedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  createdAt: {type: Date, default: Date.now()}
});

export const Notes = mongoose.model("Notes", notesSchema);