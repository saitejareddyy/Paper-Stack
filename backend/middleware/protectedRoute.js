import jwt from 'jsonwebtoken'
import { User } from '../models/uesr.model.js'
import { ENV_VARS } from '../config/env.Vars.js'
User
ENV_VARS

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies["paper-token"];

    if (!token) return res.status(401).json({ message: "No token" });

    const decode = jwt.verify(token, ENV_VARS.JWT_SECRET);

    const user = await User.findById(decode.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
