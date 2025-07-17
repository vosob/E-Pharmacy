import express from "express";
import postRoutes from "./post.js";
import authRoutes from "./auth.js";
import auth from "../middlewares/auth.js";
import suppliersRoutes from "./suppliers.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/post", auth, postRoutes);

router.use("/suppliers", auth, suppliersRoutes);

export default router;
