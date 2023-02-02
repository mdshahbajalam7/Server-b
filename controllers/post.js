import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({data:posts,currentPage:Number(page),numberofpages:Math.ceil(total/LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getpost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const createPosts = async (req, res) => {
//   const { title, message, tags, selectedFile, creator } = req.body;

//   const newPostMessage = new postMessage({
//     title,
//     message,
//     tags,
//     selectedFile,
//     creator,
//   });

//   try {
//     await newPostMessage.save();
//     res.status(201).json(newPostMessage);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const

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
  res.json({ message: "post delete successfully" });
};
// LIKE POST HERE

export const likepost = async (req, res) => {
  const { id } = req.params;
  // 57
  if (!req.userId) return res.status(402).json({ message: "Unauthentication" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // const post = await postMessage.findById(_id);
  const post = await PostMessage.findById(id);
  // 65 after
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    //
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  // after
  // like update ke liye function
  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  // const updatePost = await PostMessage.findByIdAndUpdate(
  //   id,
  //   { linkCount: post.linkCount + 1 },
  //   { new: true }
  // );
  res.json(updatePost);
};
