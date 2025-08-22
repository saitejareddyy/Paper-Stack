import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { dbConnection } from './config/db.js';
import { connectCloudinary } from "./config/cloudinary.js";

import authRoutes from './routes/auth.router.js';
import subjectRouter from './routes/Subject.route.js';
import notesRouter from './routes/notes.route.js';

const app = express();
const PORT = process.env.PORT || 5050;
connectCloudinary();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

// ✅ Single cors middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // ✅ allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/subject', subjectRouter);
app.use("/api/v1/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  dbConnection();
});
