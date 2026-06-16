import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/blogDetails.css";
import { useAuth } from "../context/AuthContext";
import Update from "./Update";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";


const BlogDetails = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
 const { user, loading: userLoading } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [comments, setCommnets] = useState([]);
  const [totalComments, settotalComments] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [comment, setComment] = useState("");
  const [commentError, setcommentError] = useState(null);
  async function handleComment() {
    if (!comment.trim()) return;
    setcommentError(null);
    try {
      let res = await fetch("https://postlybackend-ovcm.onrender.com/api/blogs/comment", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment, blogId: blogId }),
      });
      if (!res.ok) {
        return setcommentError(data.message || "Error while posting...");
      }
      let data = await res.json();
      settotalComments((prev) => prev + 1);
      setCommnets((prev) => [data.new_comment, ...prev]);
      setComment("");
    } catch (error) {
      console.log(error);
      setcommentError("Error while posting...");
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `https://postlybackend-ovcm.onrender.com/api/blogs/${blogId}/comments?page=${page}&limit=10`,
          { credentials: "include" },
        );
        let data = await res.json();
        setCommnets((prev) => [...prev, ...data.comments||[]]);
        settotalComments(data.totalComments);
        setHasMore(data.hasMore);
      } catch (error) {
        setcommentError("Error while parsing comments...");
        console.log("err", error);
      }
    };

    fetchComments();
  }, [blogId, page]);

  async function handleDelete() {
    try {
      let res = await fetch(
        `https://postlybackend-ovcm.onrender.com/api/blogs/Blog/${blog._id}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      );
      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }
      let data = await res.json();

      setError(data.message);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://postlybackend-ovcm.onrender.com/api/blogs/blog/${blogId}`,
          { credentials: "include" },
        );

        if (res.status === 404) {
          setError("Blog not found");
          setBlog(null);
          return;
        }
        if (!res.ok) {
          setError("Something went wrong. Do you logged in?");
          setBlog(null);
          return;
        }
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        setError("Network error");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  
if (loading || userLoading) {
  return <div className="loading">Loading...</div>;
}

if (error) {
  return <div className="error_box">{error}</div>;
}

if (!blog) {
  return <div className="error_box">Blog not found</div>;
}
const isMyblog = user?.id?.toString() === blog?.author?._id?.toString();
  async function handleDeleteComment(comment) {
    try {
      let res = await fetch("https://postlybackend-ovcm.onrender.com/api/blogs/comment", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId: comment._id }),
      });
      if (!res.ok) {
        setcommentError("Error while deleteing...");
      }
      let data = await res.json();
      setCommnets((prevComments) =>
        prevComments.filter((c) => c._id !== comment._id),
      );
      settotalComments((prev) => Math.max(0, prev - 1));
    } catch (error) {
      setcommentError("Error while deleteing...");
    }
  }
  

  return (
    <>
      {isMyblog && isDeleting && (
        <div className="delete_sure">
          <h3 style={{ padding: "10px", textAlign: "center" }}>
            Are you sure want to delete??
          </h3>
          <div className="canceldeleteCont">
            <button onClick={() => setisDeleting(false)} className="cancel">
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
                setisDeleting(false);
              }}
              className="delete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className="blog_details_container">
          <div className="blog_header">
            <span className="category_tag">{blog.category}</span>
            <h1>{blog.title}</h1>
            {isMyblog && (
              <div className="up">
                <button onClick={() => setisEditing(true)} className="update">
                  <img className="image_up" src={editIcon} alt="" />
                </button>
                <button onClick={() => setisDeleting(true)} className="delete">
                  <img className="image_up" src={deleteIcon} alt="" />
                </button>
              </div>
            )}

            <div className="blog_meta">
              <span style={{color:"blue",cursor:"pointer"}} onClick={()=>{navigate(`/user/${blog.author._id}`)}}>{blog.author?.name}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="blog_image">
            <img
              src={blog.image || "https://via.placeholder.com/1200x500"}
              alt={blog.title}
            />
          </div>

          <div className="blog_content">{blog.content}</div>
          <div className="comment_section">
            <div className="i_comment">
              <h3>Add Comment...</h3>
              <div className="m">
                <input
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  type="text"
                  className="comment_bar"
                  maxLength={150}
                />
                <button onClick={handleComment}>Comment</button>
              </div>
            </div>
            <div className="allComments">
              <h3>All comments ({totalComments})</h3>
              {commentError && <h6 style={{ color: "red" }}>{commentError}</h6>}
              <div className="comment_section">
                {comments.map((comment, idx) => (
                  <div key={idx} className="specific_comment">
                    <h5 style={{marginBottom:"5px"}}>{comment.text}<br></br>
                    <span style={{fontSize:"10px",color:"grey"}}>
                      { new Date(comment.createdAt).toLocaleString()}
                    </span>
                    </h5>

                    <h6
                    
                      className={
                        user && comment.author._id === user.id ? "me" : ""
                      }
                    >
                      <img
                        style={{ width: "30px", height: "30px" }}
                        src={comment.author.profile}
                        alt="."
                      />

                      {comment.author?.name || "Anonymous"}
                    </h6>
                   
                    {user && comment.author._id === user.id && (
                      <span
                        onClick={() => {
                          handleDeleteComment(comment);
                        }}
                        className="deleteIcon"
                      >
                        <img style={{width:"20px"}} src={deleteIcon}/>
                      </span>
                    )}
                  </div>
                ))}
                {hasMore && (
                  <h6
                    className="load_more"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Load more
                  </h6>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditing && <Update blog={blog} close={setisEditing} />}
    </>
  );
};

export default BlogDetails;
