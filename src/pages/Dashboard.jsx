import React, { useEffect, useState } from "react";
import "../css/home.css";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const[errormsg,setErrormsg]=useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://postlybackend-ovcm.onrender.com/api/blogs/my-blogs/?page=${page}&limit=10`,
          {
            credentials: "include",
          }
        );

       // auth handling
        if (res.status === 401 || res.status === 403) {
          navigate("/login");
          return;
        }
        if (!res.ok) {
          throw new Error("Server error");
        }
        const data = await res.json();
        setBlogs(data.blogs || []);
        setTotalpage(data.totalPages || 1);
      } catch (error) {
        setErrormsg("Server Error...");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, navigate]);

return (
  <div className="home_main_cont">

    <div className="home_header">
      <h1>My Contents</h1>
      <p>Discover articles from the community</p>
    </div>
    {errormsg && (
      <div className="error_box">
        {errormsg}
      </div>
    )}

    <div className="all_blogs">
      {loading ? (
        <h2>Loading....</h2>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))
      ) : (
        !errormsg && (
          <div className="empty_state">
            <h2>No blogs found</h2>
           
          </div>
        )
      )}
    </div>
    <div className="pagination">
      <button
        disabled={page === 1 || errormsg}
        onClick={() => setPage((prev) => prev - 1)}
      >
        ← Previous
      </button>

      <span>
        Page {page} of {totalpage}
      </span>

      <button
        disabled={page === totalpage || errormsg}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next →
      </button>
    </div>

  </div>
);
};

export default Dashboard;