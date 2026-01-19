
// // import React, { useState, useContext, useEffect } from "react";
// // import { Heart, MessageCircle, Send } from "lucide-react";
// // import { AuthContext } from "../Context/AuthContext";
// // import axios from "axios";

// // const API_URL = "http://localhost:8000/api/posts";

// // /* =========================
// //    Helper: Get Initials
// // ========================= */
// // const getInitials = (name = "") => {
// //   const parts = name.trim().split(" ").filter(Boolean);
// //   if (parts.length === 0) return "?";
// //   if (parts.length === 1) return parts[0][0].toUpperCase();
// //   return (parts[0][0] + parts[1][0]).toUpperCase();
// // };

// // const Community = () => {
// //   const { user } = useContext(AuthContext);
// //   const [posts, setPosts] = useState([]);
// //   const [newPost, setNewPost] = useState("");

// //   axios.defaults.withCredentials = true;

// //   /* =========================
// //      Fetch Posts
// //   ========================= */
// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const res = await axios.get(`${API_URL}/viewPost`);
// //         setPosts(res.data);
// //       } catch (err) {
// //         console.error("Error fetching posts:", err);
// //       }
// //     };
// //     fetchPosts();
// //   }, []);

// //   /* =========================
// //      Add Post (Anonymous)
// //   ========================= */
// //   const handlePost = async () => {
// //     if (!newPost.trim()) return;

// //     try {
// //       const res = await axios.post(
// //         `${API_URL}/addPost`,
// //         {
// //           content: newPost,
// //           userId: user?._id || null,
// //           user: user?.name || "Anonymous"
// //         },
// //         { headers: { "Content-Type": "application/json" } }
// //       );

// //       setPosts((prev) => [res.data, ...prev]);
// //       setNewPost("");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to add post");
// //     }
// //   };

// //   /* =========================
// //      Like Post
// //   ========================= */
// //   const handleLike = async (id) => {
// //     try {
// //       const res = await axios.put(`${API_URL}/${id}/likePost`);
// //       setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   /* =========================
// //      Comment
// //   ========================= */
// //   const handleComment = async (id, text) => {
// //     if (!text.trim()) return;

// //     try {
// //       const res = await axios.post(
// //         `${API_URL}/${id}/commentPost`,
// //         {
// //           text,
// //           userId: user?._id || null
// //         },
// //         { headers: { "Content-Type": "application/json" } }
// //       );

// //       setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const toggleComments = (id) => {
// //     setPosts((prev) =>
// //       prev.map((p) =>
// //         p._id === id ? { ...p, showComments: !p.showComments } : p
// //       )
// //     );
// //   };

// //   return (
// //     <div className="mt-20 p-5 flex flex-col items-center text-gray-900 dark:text-gray-100">
// //       {/* Header */}
// //       <h1 className="text-3xl font-bold text-indigo-500 mb-2">
// //         🌍 Community Space
// //       </h1>
// //       <p className="text-gray-500 mb-6 text-center max-w-xl">
// //         Share your thoughts and connect with others
// //       </p>

// //       {/* New Post */}
// //       <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-5 w-full max-w-2xl mb-8">
// //         <textarea
// //           rows="3"
// //           value={newPost}
// //           onChange={(e) => setNewPost(e.target.value)}
// //           placeholder="What's on your mind?"
// //           className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none dark:bg-gray-800"
// //         />
// //         <div className="flex justify-end mt-3">
// //           <button
// //             onClick={handlePost}
// //             className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
// //           >
// //             Post
// //           </button>
// //         </div>
// //       </div>

// //       {/* Posts */}
// //       <div className="w-full max-w-2xl flex flex-col gap-6">
// //         {posts.map((post) => {
// //           const isMine = post.userId === user?._id;

// //           return (
// //             <div
// //               key={post._id}
// //               className={`flex ${isMine ? "justify-end" : "justify-start"}`}
// //             >
// //               <div className="w-[85%] bg-white dark:bg-gray-900 border rounded-2xl shadow-md p-5">
// //                 {/* Header */}
// //                 <div className="flex items-center gap-3 mb-3">
// //                   {/* Initials Avatar */}
// //                   <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
// //                     {getInitials(post.user || "Anonymous")}
// //                   </div>

// //                   <div>
// //                     <p className="font-semibold">
// //                       {isMine ? "You" : "Anonymous"}
// //                     </p>
// //                     <p className="text-sm text-gray-500">
// //                       {new Date(post.createdAt).toLocaleString()}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Content */}
// //                 <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
// //                   {post.content}
// //                 </p>

// //                 {/* Actions */}
// //                 <div className="flex items-center gap-5 text-sm">
// //                   <button
// //                     onClick={() => handleLike(post._id)}
// //                     className="flex items-center gap-1 text-gray-500 hover:text-pink-500"
// //                   >
// //                     <Heart size={18} />
// //                     {post.likes || 0}
// //                   </button>

// //                   <button
// //                     onClick={() => toggleComments(post._id)}
// //                     className="flex items-center gap-1 text-gray-500 hover:text-indigo-500"
// //                   >
// //                     <MessageCircle size={18} />
// //                     {post.comments?.length || 0}
// //                   </button>
// //                 </div>

// //                 {/* Comments */}
// //                 {post.showComments && (
// //                   <div className="mt-4 border-t pt-3">
// //                     {post.comments?.map((c, idx) => (
// //                      <div
// //                       key={idx}
// //                       className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-sm mb-1 flex items-center gap-2"
// //                     >
// //                       {/* Initials avatar */}
// //                       <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
// //                         {getInitials(c.user || "Anonymous")}
// //                       </div>

// //                       {/* Comment text */}
// //                       <p className="text-gray-700 dark:text-gray-300">
// //                         {c.text}
// //                       </p>
// //                     </div>

// //                     ))}

// //                     <div className="flex items-center gap-2 mt-3">
// //                       <input
// //                         type="text"
// //                         placeholder="Add a comment..."
// //                         value={post.newComment || ""}
// //                         onChange={(e) =>
// //                           setPosts((prev) =>
// //                             prev.map((p) =>
// //                               p._id === post._id
// //                                 ? { ...p, newComment: e.target.value }
// //                                 : p
// //                             )
// //                           )
// //                         }
// //                         className="flex-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800"
// //                       />
// //                       <button
// //                         onClick={() => {
// //                           handleComment(post._id, post.newComment || "");
// //                           setPosts((prev) =>
// //                             prev.map((p) =>
// //                               p._id === post._id
// //                                 ? { ...p, newComment: "" }
// //                                 : p
// //                             )
// //                           );
// //                         }}
// //                       >
// //                         <Send size={18} className="text-indigo-600" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Community;
// import React, { useState, useContext, useEffect } from "react";
// import { Heart, MessageCircle, Send, Globe, Sparkles } from "lucide-react";
// import { AuthContext } from "../Context/AuthContext";
// import axios from "axios";
// import timeToShareimg from "../assets/timeToShare.jpg"

// const API_URL = "http://localhost:8000/api/posts";

// const getInitials = (name = "") => {
//   const parts = name.trim().split(" ").filter(Boolean);
//   if (parts.length === 0) return "?";
//   if (parts.length === 1) return parts[0][0].toUpperCase();
//   return (parts[0][0] + parts[1][0]).toUpperCase();
// };

// const Community = () => {
//   const { user } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/viewPost`);
//         setPosts(res.data);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handlePost = async () => {
//     if (!newPost.trim()) return;
//     try {
//       const res = await axios.post(
//         `${API_URL}/addPost`,
//         {
//           content: newPost,
//           userId: user?._id || null,
//           user: user?.name || "Anonymous"
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setPosts((prev) => [res.data, ...prev]);
//       setNewPost("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add post");
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_URL}/${id}/likePost`);
//       setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleComment = async (id, text) => {
//     if (!text.trim()) return;
//     try {
//       const res = await axios.post(
//         `${API_URL}/${id}/commentPost`,
//         { text, userId: user?._id || null },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const toggleComments = (id) => {
//     setPosts((prev) =>
//       prev.map((p) => (p._id === id ? { ...p, showComments: !p.showComments } : p))
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] mt-16 p-4 md:p-8 transition-colors duration-300">
//       {/* Header Section */}
//      <div className="max-w-2xl mx-auto text-center mb-10 flex flex-col items-center">
//   {/* Centered Image with adjusted size */}
//   <img 
//     src={timeToShareimg} 
//     alt="Community Background" 
//     className="w-32 h-32 object-cover rounded-full shadow-2xl mb-6 border-4 border-white dark:border-gray-800"
//   />

//   {/* Global Feed Badge */}
//   <div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
//     <Globe className="text-indigo-600 dark:text-indigo-400 mr-2" size={20} />
//     <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
//       Global Feed
//     </span>
//   </div>

//   {/* Title */}
//   <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
//     Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Space</span>
//   </h1>

//   {/* Subtext */}
//   <p className="text-gray-500 dark:text-gray-400 font-medium">
//     Connect, share, and inspire with others around the world.
//   </p>
// </div>

//       {/* Composer Section */}
//       <div className="max-w-2xl mx-auto mb-12">
//         <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-xl shadow-indigo-500/5 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
//           <textarea
//             rows="3"
//             value={newPost}
//             onChange={(e) => setNewPost(e.target.value)}
//             placeholder="What's happening?"
//             className="w-full p-4 bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none placeholder-gray-400 transition-all"
//           />
//           <div className="flex justify-between items-center mt-4">
//             <div className="flex gap-2 text-indigo-500">
//                 <Sparkles size={20} />
//                 <span className="text-sm font-medium">Keep it kind</span>
//             </div>
//             <button
//               onClick={handlePost}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2.5 rounded-full shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Feed Section */}
//       <div className="max-w-2xl mx-auto flex flex-col gap-8">
//         {posts.map((post) => {
//           const isMine = post.userId === user?._id;
//           return (
//             <div
//               key={post._id}
//               className={`flex flex-col ${isMine ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
//             >
//               <div className="w-full group bg-white dark:bg-gray-800/40 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-6">
                
//                 {/* Post Header */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200 dark:shadow-none">
//                     {getInitials(post.user || "Anonymous")}
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
//                       {isMine ? "You" : (post.user || "Anonymous")}
//                       {isMine && <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full uppercase">Author</span>}
//                     </p>
//                     <p className="text-xs font-medium text-gray-400 uppercase tracking-tighter">
//                       {new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg font-medium whitespace-pre-line px-1">
//                   {post.content}
//                 </p>

//                 {/* Actions */}
//                 <div className="flex items-center gap-6 border-t border-gray-50 dark:border-gray-700/50 pt-4">
//                   <button
//                     onClick={() => handleLike(post._id)}
//                     className="group flex items-center gap-2 text-gray-500 hover:text-pink-500 font-semibold transition-colors"
//                   >
//                     <div className="p-2 rounded-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 transition-all">
//                         <Heart size={22} className={post.likes > 0 ? "fill-pink-500 text-pink-500" : ""} />
//                     </div>
//                     <span>{post.likes || 0}</span>
//                   </button>

//                   <button
//                     onClick={() => toggleComments(post._id)}
//                     className="group flex items-center gap-2 text-gray-500 hover:text-indigo-500 font-semibold transition-colors"
//                   >
//                     <div className="p-2 rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-all">
//                         <MessageCircle size={22} />
//                     </div>
//                     <span>{post.comments?.length || 0}</span>
//                   </button>
//                 </div>

//                 {/* Comments Section */}
//                 {post.showComments && (
//                   <div className="mt-6 space-y-4 animate-in zoom-in-95 duration-200">
//                     <div className="space-y-3">
//                       {post.comments?.map((c, idx) => (
//                         <div key={idx} className="flex gap-3 items-start group">
//                           <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-[10px] font-bold">
//                             {getInitials(c.user || "Anonymous")}
//                           </div>
//                           <div className="bg-gray-50 dark:bg-gray-900/80 rounded-2xl rounded-tl-none p-3 flex-1 shadow-sm border border-gray-100 dark:border-gray-800">
//                             <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">{c.user || "Anonymous"}</p>
//                             <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{c.text}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex items-center gap-3 mt-4 bg-gray-50 dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800">
//                       <input
//                         type="text"
//                         placeholder="Write a comment..."
//                         value={post.newComment || ""}
//                         onChange={(e) =>
//                           setPosts((prev) =>
//                             prev.map((p) =>
//                               p._id === post._id ? { ...p, newComment: e.target.value } : p
//                             )
//                           )
//                         }
//                         className="flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none dark:text-gray-200"
//                       />
//                       <button
//                         onClick={() => {
//                           handleComment(post._id, post.newComment || "");
//                           setPosts((prev) =>
//                             prev.map((p) => (p._id === post._id ? { ...p, newComment: "" } : p))
//                           );
//                         }}
//                         className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all hover:scale-105"
//                       >
//                         <Send size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Community;
import React, { useState, useContext, useEffect } from "react";
import { Heart, MessageCircle, Send, Globe, Sparkles } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import timeToShareimg from "../assets/timeToShare.jpg";

const API_URL = "http://localhost:8000/api/posts";

// This function already correctly handles Name + Surname (e.g., "John Doe" -> "JD")
const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Community = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  axios.defaults.withCredentials = true;

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

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      const res = await axios.post(
        `${API_URL}/addPost`,
        {
          content: newPost,
          userId: user?._id || null,
          user: user?.name || "Anonymous",
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setPosts((prev) => [res.data, ...prev]);
      setNewPost("");
    } catch (err) {
      console.error(err);
      alert("Failed to add post");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}/likePost`);
      setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error(err);
    }
  };

  // --- FIX APPLIED HERE ---
  const handleComment = async (id, text) => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        `${API_URL}/${id}/commentPost`,
        { 
            text, 
            userId: user?._id || null,
            // Added the user name field here so the backend knows who commented
            user: user?.name || "Anonymous" 
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComments = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, showComments: !p.showComments } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] mt-16 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-10 flex flex-col items-center">
        <img
          src={timeToShareimg}
          alt="Community Background"
          className="w-32 h-32 object-cover rounded-full shadow-2xl mb-6 border-4 border-white dark:border-gray-800"
        />

        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <Globe className="text-indigo-600 dark:text-indigo-400 mr-2" size={20} />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Global Feed
          </span>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          Community{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Space
          </span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Connect, share, and inspire with others around the world.
        </p>
      </div>

      {/* Composer Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-xl shadow-indigo-500/5 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
          <textarea
            rows="3"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-4 bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none placeholder-gray-400 transition-all"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 text-indigo-500">
              <Sparkles size={20} />
              <span className="text-sm font-medium">Keep it kind</span>
            </div>
            <button
              onClick={handlePost}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2.5 rounded-full shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {posts.map((post) => {
          const isMine = post.userId === user?._id;
          return (
            <div
              key={post._id}
              className={`flex flex-col ${
                isMine ? "items-end" : "items-start"
              } animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div className="w-full group bg-white dark:bg-gray-800/40 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-6">
                
                {/* Post Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200 dark:shadow-none">
                    {getInitials(post.user || "Anonymous")}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      {isMine ? "You" : post.user || "Anonymous"}
                      {isMine && (
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full uppercase">
                          Author
                        </span>
                      )}
                    </p>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-tighter">
                      {new Date(post.createdAt).toLocaleDateString()} •{" "}
                      {new Date(post.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg font-medium whitespace-pre-line px-1">
                  {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6 border-t border-gray-50 dark:border-gray-700/50 pt-4">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="group flex items-center gap-2 text-gray-500 hover:text-pink-500 font-semibold transition-colors"
                  >
                    <div className="p-2 rounded-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 transition-all">
                      <Heart
                        size={22}
                        className={
                          post.likes > 0 ? "fill-pink-500 text-pink-500" : ""
                        }
                      />
                    </div>
                    <span>{post.likes || 0}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(post._id)}
                    className="group flex items-center gap-2 text-gray-500 hover:text-indigo-500 font-semibold transition-colors"
                  >
                    <div className="p-2 rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-all">
                      <MessageCircle size={22} />
                    </div>
                    <span>{post.comments?.length || 0}</span>
                  </button>
                </div>

                {/* Comments Section */}
                {post.showComments && (
                  <div className="mt-6 space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="space-y-3">
                      {post.comments?.map((c, idx) => (
                        <div key={idx} className="flex gap-3 items-start group">
                          {/* Avatar Initials - Fixed via handleComment data */}
                          <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-[10px] font-bold">
                            {getInitials(c.user || "Anonymous")}
                          </div>
                          
                          {/* Comment Content */}
                          <div className="bg-gray-50 dark:bg-gray-900/80 rounded-2xl rounded-tl-none p-3 flex-1 shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                              {c.user || "Anonymous"}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-4 bg-gray-50 dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 text-black">
                      <input
                        type="text"
                        placeholder="Write a comment..."
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
                        className="flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none dark:text-gray-200"
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
                        className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all hover:scale-105"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;