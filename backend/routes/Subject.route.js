import express from 'express'
import { addSubject, removeSubject, subjectsList } from '../controllers/subject.contreller.js'
import { upload } from '../utils/fileUpload.js'
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.post("/add", protectedRoute, upload.fields([{name: "image", maxCount: 1}, {name: "paper", maxCount: 1}]), addSubject)
router.post("/remove", protectedRoute, removeSubject)
router.get("/list", protectedRoute, subjectsList)

export default router;
