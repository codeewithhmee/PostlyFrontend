import React, { useEffect, useState } from "react";
import GetSearchedBlog from "./getSearchedBlog";
import "../css/filter.css"
const CATEGORIES = [
   "All",
  "Technology",
  "Programming",
  "Science",
  "Health",
  "Travel",
  "Food",
  "Business",
  "Education",
  "Entertainment",
  "Sports",
  "Lifestyle",
];


const Filter = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => setQuery(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="filter_page">
      <h1 style={{textAlign:"center",margin:"10px"}}>Explore blogs</h1>
      <div className="mm">
         <div className="search_wrap">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="cats">
        <select className="categories_select" onChange={(e) => setCategory(e.target.value)} name="" id="">
        {CATEGORIES.map((cat) => (
         <option  value={cat}>{cat}</option>
        ))}
        </select>
      </div>
      </div>
      <GetSearchedBlog blog_name={query} category={category} />
    </div>
  );
};

export default Filter;