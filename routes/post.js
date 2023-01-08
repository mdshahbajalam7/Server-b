import express from "express";
import {
  createPosts,
  deletepost,
  getPosts,
  likepost,
  updatePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/",auth, createPosts);
router.patch("/:id",auth, updatePost);
router.delete("/:id",auth, deletepost);
router.patch("/:id/likepost",auth, likepost);

export default router;
