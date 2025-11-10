
import React, { useState, useContext, useEffect } from "react";
import { Heart, MessageCircle, Send, User } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const API_URL = "http://localhost:8000/api/posts";

const Community = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  axios.defaults.withCredentials = true; // allow cookies

  // ✅ Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/viewPost`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // ✅ Add a new post
  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      const res = await axios.post(
        `${API_URL}/addPost`,
        {
          user: user?.name || user?.username || "Anonymous",
          content: newPost,
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      setPosts([res.data, ...posts]);
      setNewPost("");
    } catch (err) {
      console.error("Error adding post:", err);
      alert(err.response?.data?.msg || "Failed to add post");
    }
  };

  // ✅ Like a post
  const handleLike = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}/likePost`, {}, { withCredentials: true });
      setPosts(posts.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // ✅ Comment on a post
  const handleComment = async (id, text) => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        `${API_URL}/${id}/commentPost`,
        {
          user: user?.name || user?.username || "User",
          text,
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      // ✅ Update UI instantly
      setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  // Toggle comments visibility
  const toggleComments = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, showComments: !p.showComments } : p
      )
    );
  };

  return (
    <div className="mt-20 p-5 flex flex-col items-center text-gray-900">
      {/* Header */}
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        🌍 Community Space
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-xl">
        Share your thoughts and connect with others 💬
      </p>

      {/* New Post */}
      <div className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-2xl mb-8 border border-gray-200">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="What's on your mind?"
          rows="3"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handlePost}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No posts yet — start the conversation 🌸
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <User className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{post.user}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {post.content}
              </p>

              {/* Post Actions */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-pink-500 transition"
                >
                  <Heart size={18} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-indigo-500 transition"
                >
                  <MessageCircle size={18} />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {/* Comments Section */}
              {post.showComments && (
                <div className="mt-4 border-t pt-3">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Comments
                  </h4>

                  {post.comments?.length === 0 && (
                    <p className="text-gray-400 text-sm mb-2">
                      Be the first to comment 🗨️
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    {post.comments?.map((c, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 p-2 rounded-lg text-sm"
                      >
                        <span className="font-semibold text-indigo-600">
                          {c.user}:
                        </span>{" "}
                        {c.text}
                      </div>
                    ))}
                  </div>

                  {/* ✅ Comment input + Send icon */}
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={post.newComment || ""}
                      onChange={(e) =>
                        setPosts((prev) =>
                          prev.map((p) =>
                            p._id === post._id
                              ? { ...p, newComment: e.target.value }
                              : p
                          )
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        handleComment(post._id, post.newComment || "");
                        setPosts((prev) =>
                          prev.map((p) =>
                            p._id === post._id ? { ...p, newComment: "" } : p
                          )
                        );
                      }}
                    >
                      <Send size={20} className="text-indigo-600 cursor-pointer" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;