import express from "express";
import {
  createPosts,
  deletepost,
  getpost,
  getPosts,
  getPostsBySearch,
  likepost,
  commnetpost,
  updatePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/:id", getpost);
router.get("/", getPosts);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletepost);
router.patch("/:id/likepost", auth, likepost);
router.post("/:id/commnetpost",auth, commnetpost)

export default router;
