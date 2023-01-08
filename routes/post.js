import express from "express";
import {
  createPosts,
  deletepost,
  getPosts,
  likepost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletepost);
router.patch("/:id/likepost", likepost);

export default router;
