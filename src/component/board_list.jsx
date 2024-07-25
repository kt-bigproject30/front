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
  const [searchBy, setSearchBy] = useState("title"); // 검색 기준 상태 변수 (제목 또는 카테고리)
  const postsPerPage = 10; // 페이지당 게시물 수
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 컴포넌트가 마운트될 때 게시물 데이터를 가져옴
  useEffect(() => {
    fetchBoards();
  }, []);

  // 게시물 데이터를 API로부터 가져오는 함수
  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await api.get("/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBoards(response.data);
    } catch (error) {
      console.error("Failed to fetch boards:", error); // 에러 로그
      alert("Failed to fetch boards: " + error.message); // 사용자에게 에러 알림
    }
  };

  // 검색어 및 검색 기준에 따라 게시물을 필터링하는 함수
  const filteredBoards = boards.filter((post) => {
    if (searchBy === "title") {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === "category") {
      return (
        post.category &&
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  // 카테고리 클릭 시 해당 카테고리로 검색 설정하는 함수
  const handleCategoryClick = (category) => {
    setSearchTerm(category);
    setSearchBy("category");
    setCurrentPage(1);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredBoards.length / postsPerPage);

  // UTC 시간을 KST로 변환하는 함수
  const convertToKST = (utcDate) => {
    const date = new Date(utcDate);
    const utcTime = date.getTime();
    const kstTime = new Date(utcTime + 9 * 60 * 60 * 1000); // 9시간 추가
    return kstTime.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  };

  return (
    <div className="board-list">
      <div className="board-header">
        <h1 onClick={() => navigate("/board")}>게시글 목록</h1>
      </div>
      <div className="search-container">
        <select
          className="search-by"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="category">카테고리</option>
        </select>
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`검색: ${searchBy === "title" ? "제목" : "카테고리"}`}
        />
      </div>
      {currentPosts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h2 className="post-title">
              <Link to={`/board/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="post-info">
              <span className="post-author">
                {post.userEntity.name || "Unknown"}
              </span>
              <span className="post-date">
                {convertToKST(post.createdAt) || "No date"}
              </span>
            </div>
          </div>
          <div className="post-tags">
            {post.category ? (
              <span
                className="category"
                onClick={() => handleCategoryClick(post.category)}
              >
                {post.category}
              </span>
            ) : (
              <span>카테고리 없음</span>
            )}
          </div>
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
