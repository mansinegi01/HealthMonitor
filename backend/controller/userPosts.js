const Post = require("../model/Posts");

async function getAllPost(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("🔥 Error fetching posts:", err);
    res.status(500).json({ error: err.message });
  }
}

async function addPost(req, res) {
  try {
    const username = req.user?.username || req.user?.name || req.body.user || "Anonymous";
    const { content } = req.body;

    if (!content) return res.status(400).json({ msg: "Post content required" });

    const newPost = new Post({ user: username, content });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error("🔥 Error in addPost:", err);
    res.status(500).json({ error: err.message });
  }
}
async function likePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("🔥 Error in likePost:", err);
    res.status(500).json({ error: err.message });
  }
}

async function commentPost(req, res) {
  try {
    const { text, user } = req.body;
    const username = req.user?.username || req.user?.name || user || "User";

    if (!text) return res.status(400).json({ msg: "Comment required" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post.comments.push({ user: username, text });
    await post.save();

    res.json(post);
  } catch (err) {
    console.error("🔥 Error in commentPost:", err);
    res.status(500).json({ error: err.message });
  }
}


module.exports = { getAllPost, addPost, likePost, commentPost };
