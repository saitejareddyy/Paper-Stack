import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { dbConnection } from './config/db.js';
import { connectCloudinary } from "./config/cloudinary.js"
import authRoutes from './routes/auth.router.js'
import subjectRouter from './routes/Subject.route.js'



const app = express();

const PORT = process.env.PORT || 5050;
connectCloudinary();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
  origin: "https://paper-stack-admin.onrender.com" || "https://paper-stack-frontend.onrender.com",  // your React frontend URL
  credentials: true,                // allow cookies (important!)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/subject', subjectRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  dbConnection();
})






