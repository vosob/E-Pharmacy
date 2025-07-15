import express from "express";
import PostController from "../controllers/post.js";

const router = express.Router();

router.get("/", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.post("/", PostController.createPost);

export default router;
