import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/board_detail.css";

const BoardDetail = ({ boards, setBoards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = boards.find((post) => post.id === parseInt(id));
    setPost(foundPost);
  }, [id, boards]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      const updatedBoards = boards.filter((post) => post.id !== parseInt(id));
      setBoards(updatedBoards);
      navigate("/board");
    }
  };

  return (
    <div className="board-detail">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-info">
        <span className="post-author">{post.userName}</span>
        <span className="post-date">{post.date}</span>
      </div>
      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="post-summary">{post.summary}</div>
      {post.image && <img src={post.image} alt="Post" className="post-image" />}
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
