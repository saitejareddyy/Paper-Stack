import express from 'express'
import { upload } from '../utils/fileUpload.js'
import { addNotes, getNotesData, updateLikes } from '../controllers/notes.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router()


router.post("/add", protectedRoute, upload.single("notes"), addNotes);
router.post("/list", protectedRoute, getNotesData);
router.post("/like", protectedRoute,  updateLikes)

export default router;
