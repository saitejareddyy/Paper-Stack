import express from 'express'
import { authCheck, login, logout, signup } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router()

router.post('/login', login);
router.post('/signup', signup);
router.get("/logout", logout);
router.get("/check", protectedRoute, authCheck);

export default router;
