import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/searchUser.css"
const SearchUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const[noBlog,setnoBlog]=useState(false);

  async function getResult() {
    setLoading(true);
    seterrormsg("");
    setnoBlog(false)
    try {
      const res = await fetch(
        `https://postlybackend-ovcm.onrender.com/api/blogs/search_user/?page=${page}&limit=10&userName=${username}`,
        { credentials: "include" },
      );

      if (res.status === 401 || res.status === 403) {
        navigate("/login");
        return;
      }
      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      if(data.users && data.users.length==0){
        setnoBlog(true);
      }
      setUsers(data.users || []);
      setTotalpage(data.totalPages || 1);
    } catch (error) {
      seterrormsg("Server Error...");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let y = setTimeout(getResult, 300);
    return () => clearTimeout(y);
  }, [username]);

  return (
    <div className="main">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Search users..."
        className="search_user_input_bar"
      />
      {noBlog && <p style={{textAlign:"center"}}>No user found..</p>}
      {loading && <p>Loading...</p>}
      {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}

      <div>
        {users.map((user, idx) => (
          <div
            key={idx}
           className="user_profile"
            onClick={()=>{navigate(`/user/${user._id}`)}}
          >
            <img
              src={user.profile}
              alt={user.name}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <div>
              <p style={{ margin: 0 }}>{user.name}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "grey" }}>
                {user.email}
              </p>
            </div>
          </div>
        ))}
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

export default SearchUser;
