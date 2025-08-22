import { v2 as cloudinary } from "cloudinary";
import { Notes } from "../models/studentNotes.model.js";

export const addNotes = async (req, res) => {
  try {
    const notesPdfFile = req.file;

    if(!notesPdfFile){
      return res.status(401).json({ success: false, message: "pdf file not provided" })
    }

    const findUserUpdatingsameNotes = await Notes.findOne({
      title: req.body.title,
       uploadedBy: req.user._id
    })

    if(findUserUpdatingsameNotes){
      return res.status(400).json({success: false, message: "Already uploaded by you"});
    }

    const pdfUpload = await cloudinary.uploader.upload(notesPdfFile.path, {
      folder: "cloudinary-node-paperstack-upload-pdf-notes",
      use_filename: true,
      unique_filename: false,
      resource_type: "raw"
    })

    const newNotes = new Notes({
      title: req.body.title,
      fileUrl: pdfUpload.secure_url,
      uploadedBy: req.user._id,
      likes: [],      
    });

    await newNotes.save();

    res.status(201).json({success: true, message: "Notes added successfully"})


  } catch (error) {
    console.log("error from addpdf controller", error.message);
    res.status(500).json({success: false, message: "Internal server error"});
  }
} 


export const getNotesData = async (req, res) => {
  try {
    console.log("getNotesdata controller: ", req.user._id)
    const studentsNotes = await Notes.find({}).populate("uploadedBy", "username email -_id");
    
    const updatedNotes = studentsNotes.map(note => ({
      ...note.toObject(),
      likesCount: note.likes.length,
      isLiked: note.likes.some(likeId => likeId.equals(req.user._id))

    }))
    res.status(200).json({success: true, data: updatedNotes});
  } catch (error) {
    console.log("Error in the get getNotesData controller" + error.message);
    res.status(500).json({success: false, message: "Internal server error"}); 
  }
} 

export const updateLikes = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middlewae
    const notes = await Notes.findById(req.body.notesId);

    if(!notes) return res.status(400).json({success: false, message: "Notes not found"});

    const alreadyLiked = notes.likes.includes(userId);

    if(alreadyLiked){
      notes.likes.pull(userId);
    }
    else {
      notes.likes.push(userId);
    }
    await notes.save(); 

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "unLiked" : "liked",
      likesCount: notes.likes.length, // optional: return count
      isLiked: notes.likes.includes(userId),
      notes,
    });
  
  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error"});
  }
}
