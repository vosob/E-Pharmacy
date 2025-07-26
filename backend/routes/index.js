import express from "express";
import postRoutes from "./post.js";
import authRoutes from "./auth.js";
import auth from "../middlewares/auth.js";
import suppliersRoutes from "./suppliers.js";
import customersRoutes from "./customers.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/post", auth, postRoutes);

router.use("/suppliers", auth, suppliersRoutes);

router.use("/customers", auth, customersRoutes);

export default router;
