import { SubjectsModel } from "../models/subjects.model.js";
import { v2 as cloudinary } from "cloudinary";

const addSubject = async (req, res) => {
  try {
    // multer upload.fields() usage
    const image_path = req.files?.image ? req.files.image[0].path : null;
    const paper_path = req.files?.paper ? req.files.paper[0].path : null;

    // Parse resources safely
    let resources = [];
    if (req.body.resources) {
      try {
        resources = typeof req.body.resources === "string"
          ? JSON.parse(req.body.resources)
          : req.body.resources;
      } catch (err) {
        console.log("Error parsing resources:", err.message);
        resources = [];
      }
    }

    // ✅ Upload image to Cloudinary
    const image_upload = image_path
      ? await cloudinary.uploader.upload(image_path, { resource_type: "image" })
      : null;

    // ✅ Upload previous year paper as image (fixed variable name)
    const paper_upload = paper_path
      ? await cloudinary.uploader.upload(paper_path, { resource_type: "image" })
      : null;

    // Check for duplicate before saving
    const fileFromDb = await SubjectsModel.findOne({
      name: req.body.name,
      branch: req.body.branch,
      semester: req.body.semester
    });
    if (fileFromDb) {
      return res.status(401).json({ success: false, message: "Subject already exists" });
    }

    // Create subject
    const newSubject = new SubjectsModel({
      name: req.body.name,
      branch: req.body.branch,
      image: image_upload?.secure_url || null,
      description: req.body.description,
      semester: req.body.semester,
      credits: req.body.credits,
      topics: req.body.topics?.split(",") || [],
      resources,
      faculty: req.body.faculty,
      previousYearPapers: paper_upload?.secure_url || null
    });

    await newSubject.save();
    res.status(200).json({ success: true, message: "Subject added to Database" });
  } catch (error) {
    console.error("Error in addSubject:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const removeSubject = async (req, res) => {
  try {
    const { id } = req.body;
    await SubjectsModel.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Subject removed" });
  } catch (error) {
    console.log("Error in removeSubject:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const subjectsList = async (req, res) => {
  try {
    const allSubjects = await SubjectsModel.find({});
    res.status(201).json({ success: true, subjects: allSubjects });
  } catch (error) {
    console.log("Error in subjectsList:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addSubject, removeSubject, subjectsList };
