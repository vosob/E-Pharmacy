import express from "express";
import postRoutes from "./post.js";
import authRoutes from "./auth.js";

const router = express.Router();

router.use("/post", postRoutes);

router.use("/auth", authRoutes);

export default router;
