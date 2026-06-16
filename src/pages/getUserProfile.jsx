import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../components/card'

const GetUserProfile = () => {
 
  const { userid } = useParams()      
  const [author, setAuthor] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalpage, setTotalpage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errormsg, setErrormsg] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://postlybackend-ovcm.onrender.com/api/blogs/get_specific/${userid}?page=${page}&limit=10`,
          { credentials: "include" }
        )
        if (res.status === 401 || res.status === 403) {
          navigate("/login")
          return
        }
        if (!res.ok) throw new Error("Server error")

        const data = await res.json()
        setAuthor(data.author)
        setBlogs(data.blogs || [])
        setTotalpage(data.totalPages || 1)
      } catch (error) {
        setErrormsg("Server Error...")
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [page, userid])

  return (
    <div className="home_main_cont">

      {/* author info */}
      {author && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
          <img
            src={author.profile}
            alt={author.name}
            style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
          />
          <h2>{author.name}</h2>
        </div>
      )}

      {errormsg && <div className="error_box">{errormsg}</div>}

      <div className="all_blogs">
        {loading ? (
          <h2>Loading....</h2>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => <Card key={blog._id} blog={blog} />)
        ) : (
          !errormsg && (
            <div className="empty_state">
              <h2>No blogs yet</h2>
              <p>This user hasn't published anything.</p>
            </div>
          )
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1 || !!errormsg} onClick={() => setPage(p => p - 1)}>
          ← Previous
        </button>
        <span>Page {page} of {totalpage}</span>
        <button disabled={page === totalpage || !!errormsg} onClick={() => setPage(p => p + 1)}>
          Next →
        </button>
      </div>
    </div>
  )
}

export default GetUserProfile