import React, { useState } from "react";
import "../css/card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ blog }) => {
  const navigate = useNavigate();
  const [totalLike, setTotalLike] = useState(blog.likes || 0);
  const [isLiked, setIsLiked] = useState(blog.isLiked || false);
  const [likeLoading, setLikeLoading] = useState(false);

  async function haldleLike(id) {
    if (likeLoading) return;
    setLikeLoading(true);

    const prevLiked = isLiked;
    const prevCount = totalLike;

    setIsLiked(!isLiked);
    setTotalLike((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const res = await fetch("https://postlybackend-ovcm.onrender.com/api/blogs/like", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: id }),
      });
      if (!res.ok) throw new Error("failed to like..");
      let data = await res.json();
      setIsLiked(data.isLiked);
    } catch (error) {
      console.log(error);
      setIsLiked(prevLiked);
      setTotalLike(prevCount);
    } finally {
      setLikeLoading(false);
    }
  }

  function openUserProfile(userId) {
    navigate(`/user/${userId}`);
  }

  return (
    <div className="card_box">
      <div onClick={() => navigate(`/blog/${blog._id}`)} className="card_image">
        <img src={blog.image || "https://sl1nk.com/h9ua675"} alt={blog.title} />
      </div>

      <div className="card_content">
        <span className="category_badge">{blog.category}</span>

        <h2>{blog.title}</h2>

        <p className="card_preview">{blog.content?.slice(0, 120)}...</p>

        <div className="card_footer">
          <div
            onClick={() => {
              openUserProfile(blog.author._id);
            }}
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src={blog.author.profile}
              alt="."
            />
            <strong>{blog.author?.name}</strong>
          </div>
          <div>
            <div className="like_section">
              <span
                onClick={() => !likeLoading && haldleLike(blog._id)}
                style={{ fontSize: "large", cursor: likeLoading ? "not-allowed" : "pointer" }}
              >
                {isLiked ? "❤️" : "🩶"}
              </span>
              :{totalLike}
            </div>
          </div>
          <div>{new Date(blog.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;