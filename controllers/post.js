import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update Data
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatePosts = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.status(200).json(updatePosts);
};

// DELETE

export const deletepost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  PostMessage.findByIdAndRemove(id);
  res.json({ message: "post delete successfully"});
};
// LIKE POST HERE

export const likepost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // const post = await postMessage.findById(_id);
  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    { linkCount: post.linkCount + 1 },
    { new: true }
  );
  res.json(updatePost);
};
