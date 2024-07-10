import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../css/board_detail.css";

const BoardDetail = ({ setBoards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      const response = await api.get(`/post/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "정말로 이 게시글을 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/boards/${id}`);
        setBoards((prevBoards) =>
          prevBoards.filter((post) => post.id !== parseInt(id))
        );
        navigate("/board");
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-detail">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-info">
        <span className="post-author">{post.userName || "Unknown"}</span>
        <span className="post-date">{post.date || "No date"}</span>
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
        <Link to={`/board/edit/${post.id}`} className="btn btn-primary">
          수정
        </Link>
        <button
          onClick={() => navigate("/board")}
          className="btn btn-secondary"
        >
          목록
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          삭제
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
