import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./pagination.jsx";
import api from "../api";
import "../css/board_list.css";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await api.get("/post");
      setBoards(response.data);
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    }
  };

  const filteredBoards = boards.filter((post) => {
    if (searchBy === "title") {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === "tag") {
      return (
        post.tags &&
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return true;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBoards.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setSearchBy("tag");
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchBy("title");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBoards.length / postsPerPage);

  return (
    <div className="board-list">
      <div className="board-header">
        <h1 onClick={() => navigate("/board")}>게시판 목록</h1>
        <Link to="/board/new" className="btn btn-primary">
          글쓰기
        </Link>
      </div>
      <div className="search-container">
        <select
          className="search-by"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="tag">태그</option>
        </select>
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`검색: ${searchBy === "title" ? "제목" : "태그"}`}
        />
        <button onClick={handleResetSearch} className="btn btn-secondary">
          초기화
        </button>
      </div>
      {currentPosts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h2 className="post-title">
              <Link to={`/board/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="post-info">
              <span className="post-author">{post.userName || "Unknown"}</span>
              <span className="post-date">{post.date || "No date"}</span>
            </div>
          </div>
          <div className="post-tags">
            {post.tags &&
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
          </div>
          {post.summary && <div className="post-summary">{post.summary}</div>}
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalPosts={filteredBoards.length}
      />
    </div>
  );
};

export default BoardList;
