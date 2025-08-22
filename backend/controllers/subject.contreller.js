import { SubjectsModel } from "../models/subjects.model.js";
import { v2 as cloudinary } from "cloudinary";

const addSubject = async (req, res) => {
  try {
    // multer upload.fields() usage
    const image_path = req.files?.image ? req.files.image[0].path : null;
    const paper_path = req.files?.paper ? req.files.paper[0].path : null;

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


    const image_upload = image_path
      ? await cloudinary.uploader.upload(image_path, { resource_type: "image" })
      : null;

    const paper_upload = paper_path
      ? await cloudinary.uploader.upload(paper_path, { resource_type: "image" })
      : null;


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

// const addPdf = async (req, res) => {
//   try {
//        const pdfFile = req.file;

//     if (!pdfFile) {
//       return res.status(401).json({ success: false, message: "pdf file not provided" });
//     }

//     const pdfUpload = await cloudinary.uploader.upload(pdfFile.path, {
//       folder: "cloudinary-node-upload-pdf-demo",
//       use_filename: true,
//       unique_filename: false,
//         resource_type: "raw"
//     })

//     console.log("Uploaded PDF URL: " , pdfUpload.url);
//     res.status(401).json({success: true, message:"Pdf Uploaded to cloudinary"});

//   } catch (error) {
//     console.log("error from addpdf controller", error.message);
//     res.status(500).json({success: false, message: "Internal server error"});
//   }
// }

export { addSubject, removeSubject, subjectsList};
