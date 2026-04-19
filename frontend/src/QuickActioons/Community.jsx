

// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../Context/AuthContext";
// import timeToShareimg from "../assets/timeToShare.jpg";

// const API_URL = "http://localhost:8000/api/posts";

// /* ================= INITIALS FUNCTION ================= */
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

//   /* ================= FETCH POSTS ================= */
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/viewPost`);
//         setPosts(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPosts();
//   }, []);

//   /* ================= ADD POST ================= */
//   const handlePost = async () => {
//     if (!newPost.trim()) return;

//     try {
//       const res = await axios.post(`${API_URL}/addPost`, {
//         content: newPost,
//         userId: user?._id || null,
//         user: user?.name || "Anonymous",
//       });

//       setPosts((prev) => [res.data, ...prev]);
//       setNewPost("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= LIKE ================= */
//   const handleLike = async (id) => {
//     try {
//       const res = await axios.put(`${API_URL}/${id}/likePost`);
//       setPosts((prev) =>
//         prev.map((p) => (p._id === id ? res.data : p))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= COMMENT ================= */
//   const handleComment = async (id, text) => {
//     if (!text?.trim()) return;

//     try {
//       const res = await axios.post(`${API_URL}/${id}/commentPost`, {
//         text,
//         userId: user?._id || null,
//         user: user?.name || "Anonymous",
//       });

//       setPosts((prev) =>
//         prev.map((p) => (p._id === id ? res.data : p))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= TOGGLE COMMENTS ================= */
//   const toggleComments = (id) => {
//     setPosts((prev) =>
//       prev.map((p) =>
//         p._id === id ? { ...p, showComments: !p.showComments } : p
//       )
//     );
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         overflowY: "auto",
//         background: "linear-gradient(to bottom right, #0f172a, #020617)",
//         paddingTop: "90px",
//         paddingBottom: "60px",
//         paddingLeft: "16px",
//         paddingRight: "16px",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
//         <img
//           src={timeToShareimg}
//           alt=""
//           style={{
//             width: "120px",
//             height: "120px",
//             borderRadius: "50%",
//             marginBottom: "20px",
//           }}
//         />

//         <h1 style={{ color: "white", fontSize: "32px" }}>
//           Community <span style={{ color: "#8b5cf6" }}>Space</span>
//         </h1>

//         <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
//           Connect, share, and inspire with others.
//         </p>
//       </div>

//       {/* ================= POST BOX ================= */}
//       <div style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
//         <div
//           style={{
//             background: "#1e293b",
//             padding: "20px",
//             borderRadius: "20px",
//           }}
//         >
//           <textarea
//             rows="3"
//             value={newPost}
//             onChange={(e) => setNewPost(e.target.value)}
//             placeholder="What's happening?"
//             style={{
//               width: "100%",
//               background: "#020617",
//               color: "white",
//               border: "none",
//               padding: "10px",
//               borderRadius: "10px",
//             }}
//           />

//           <div style={{ textAlign: "right", marginTop: "10px" }}>
//             <button
//               onClick={handlePost}
//               style={{
//                 background: "#6366f1",
//                 color: "white",
//                 padding: "8px 20px",
//                 borderRadius: "20px",
//                 cursor: "pointer",
//               }}
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= POSTS ================= */}
//       <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//         {posts.map((post) => (
//           <div
//             key={post._id}
//             style={{
//               background: "#1e293b",
//               padding: "20px",
//               borderRadius: "20px",
//               marginBottom: "20px",
//               color: "white",
//             }}
//           >
//             {/* USER HEADER */}
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               {/* INITIALS AVATAR */}
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {getInitials(post.user)}
//               </div>

//               {/* NAME */}
//               <p style={{ margin: 0, fontWeight: "bold" }}>
//                 {post.user || "Anonymous"}
//               </p>
//             </div>

//             {/* CONTENT */}
//             <p style={{ margin: "12px 0" }}>{post.content}</p>

//             {/* ACTIONS */}
//             <div style={{ display: "flex", gap: "20px" }}>
//               <button onClick={() => handleLike(post._id)}>
//                 ❤️ {post.likes || 0}
//               </button>

//               <button onClick={() => toggleComments(post._id)}>
//                 💬 {post.comments?.length || 0}
//               </button>
//             </div>

//             {/* COMMENTS */}
//             {post.showComments && (
//               <div style={{ marginTop: "15px" }}>
//                 {post.comments?.map((c, i) => (
//                   <p key={i} style={{ fontSize: "14px" }}>
//                     <b>{getInitials(c.user)}</b>: {c.text}
//                   </p>
//                 ))}

//                 <input
//                   placeholder="Add comment..."
//                   value={post.newComment || ""}
//                   onChange={(e) =>
//                     setPosts((prev) =>
//                       prev.map((p) =>
//                         p._id === post._id
//                           ? { ...p, newComment: e.target.value }
//                           : p
//                       )
//                     )
//                   }
//                   style={{
//                     width: "100%",
//                     marginTop: "10px",
//                     padding: "8px",
//                     borderRadius: "10px",
//                   }}
//                 />

//                 <button
//                   onClick={() => handleComment(post._id, post.newComment)}
//                   style={{ marginTop: "8px" }}
//                 >
//                   Send
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Community;
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import timeToShareimg from "../assets/timeToShare.jpg";

const API_URL = "http://localhost:8000/api/posts";

/* ================= INITIALS FUNCTION ================= */
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

  /* ================= FETCH POSTS ================= */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/viewPost`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  /* ================= ADD POST ================= */
  const handlePost = async () => {
    if (!newPost.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/addPost`, {
        content: newPost,
        userId: user?._id || null,
        user: "Anonymous", // 🔒 Removed full name
      });

      setPosts((prev) => [res.data, ...prev]);
      setNewPost("");
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= LIKE ================= */
  const handleLike = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}/likePost`);
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= COMMENT ================= */
  const handleComment = async (id, text) => {
    if (!text?.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/${id}/commentPost`, {
        text,
        userId: user?._id || null,
        user: "Anonymous", // 🔒 Removed full name
      });

      setPosts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= TOGGLE COMMENTS ================= */
  const toggleComments = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, showComments: !p.showComments } : p
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        background: "linear-gradient(to bottom right, #0f172a, #020617)",
        paddingTop: "90px",
        paddingBottom: "60px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      {/* ================= HEADER ================= */}
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <img
          src={timeToShareimg}
          alt=""
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />

        <h1 style={{ color: "white", fontSize: "32px" }}>
          Community <span style={{ color: "#8b5cf6" }}>Space</span>
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
          Connect, share, and inspire with others.
        </p>
      </div>

      {/* ================= POST BOX ================= */}
      <div style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <textarea
            rows="3"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            style={{
              width: "100%",
              background: "#020617",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
            }}
          />

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button
              onClick={handlePost}
              style={{
                background: "#6366f1",
                color: "white",
                padding: "8px 20px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* ================= POSTS ================= */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "20px",
              color: "white",
            }}
          >
            {/* USER HEADER */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* INITIALS AVATAR */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {getInitials(post.user)}
              </div>

              {/* 🔒 NO FULL NAME
              <p style={{ margin: 0, fontWeight: "bold" }}>
                User
              </p> */}
            </div>

            {/* CONTENT */}
            <p style={{ margin: "12px 0" }}>{post.content}</p>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: "20px" }}>
              <button onClick={() => handleLike(post._id)}>
                ❤️ {post.likes || 0}
              </button>

              <button onClick={() => toggleComments(post._id)}>
                💬 {post.comments?.length || 0}
              </button>
            </div>

            {/* COMMENTS */}
            {post.showComments && (
              <div style={{ marginTop: "15px" }}>
                {post.comments?.map((c, i) => (
                  <p key={i} style={{ fontSize: "14px" }}>
                    <b>{getInitials(c.user)}</b>: {c.text}
                  </p>
                ))}

                <input
                  placeholder="Add comment..."
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
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                />

                <button
                  onClick={() => handleComment(post._id, post.newComment)}
                  style={{ marginTop: "8px" }}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;