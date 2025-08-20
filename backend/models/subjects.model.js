import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  // Core subject information
  name: { type: String, required: true },
  branch: { type: String, required: true },
  image: {type: String, required: true},
  description: { type: String, required: true },

  // Academic details
  semester: { type: Number, required: true, min: 1, max: 8 },
  credits: { type: Number, required: true, min: 1, max: 5 },

  // Content information
  topics: {
    type: [String],
    required: true,
    validate: {
      validator: v => v.length > 0,
      message: 'At least one topic is required'
    }
  },

  // Resources
  resources: [{
    resourceType: { type: String, required: true },   // e.g. "Textbook" or "Online Course"
    title: { type: String, required: true },
    author: String,
    platform: String,
    link: { type: String, required: true }
  }],

  faculty: {type: String, required: true},

  // Previous Year Papers
  previousYearPapers: { type: String, required: true },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const SubjectsModel = mongoose.model("Subjects", subjectSchema);