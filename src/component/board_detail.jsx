import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../css/board_detail.css";

// 게시물 상세보기 컴포넌트
const BoardDetail = ({ setBoards }) => {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [post, setPost] = useState(null); // 게시물 상태 변수

  // 게시물 데이터를 가져오는 함수
  const fetchPost = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [id]);

  // 컴포넌트가 마운트될 때 또는 fetchPost 함수가 변경될 때 실행되는 useEffect
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // 게시물 데이터를 아직 가져오지 못한 경우 로딩 메시지 표시
  if (!post) {
    return <div>Loading...</div>;
  }

  const convertToKST = (utcDate) => {
    const date = new Date(utcDate);
    const utcTime = date.getTime();
    const kstTime = new Date(utcTime + 9 * 60 * 60 * 1000); // 9시간 추가
    return kstTime.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  };

  return (
    <div className="board-detail">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-info">
        <span className="post-author">{post.userEntity.name || "Unknown"}</span>
        <span className="post-date">
          {convertToKST(post.createdAt) || "No date"}
        </span>
      </div>
      <div className="post-tags">
        {post.tags &&
          post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
      </div>
      <div className="post-summary">{post.summary || "No summary"}</div>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="post-image" />
      )}
      <div className="buttons">
        <button
          onClick={() => navigate("/board")}
          className="btn btn-secondary"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
