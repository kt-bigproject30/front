import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./pagination.jsx"; // 페이지네이션 컴포넌트
import api from "../api"; // API 모듈
import "../css/board_list.css"; // CSS 파일

// 게시판 목록 컴포넌트
const BoardList = () => {
  const [boards, setBoards] = useState([]); // 게시물 목록 상태 변수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 변수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 변수
  const [searchBy, setSearchBy] = useState("title"); // 검색 기준 상태 변수 (제목 또는 태그)
  const postsPerPage = 10; // 페이지당 게시물 수
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 컴포넌트가 마운트될 때 게시물 데이터를 가져옴
  useEffect(() => {
    fetchBoards();
  }, []);

  // 게시물 데이터를 API로부터 가져오는 함수
  const fetchBoards = async () => {
    try {
      console.log("tlqkf");
      const response = await api.get("/post");
      console.log(response);
      setBoards(response.data);
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    }
  };

  // 검색어 및 검색 기준에 따라 게시물을 필터링하는 함수
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

  // 현재 페이지에 표시할 게시물의 인덱스 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBoards.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 태그 클릭 시 해당 태그로 검색 설정하는 함수
  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setSearchBy("tag");
    setCurrentPage(1);
  };

  // 전체 페이지 수 계산
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
          <option value="notice">공지</option>
        </select>
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`검색: ${searchBy === "title" ? "제목" : "태그"}`}
        />
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
