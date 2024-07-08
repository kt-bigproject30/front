import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/board.css"; // CSS 파일 import

const BoardForm = ({ boards, setBoards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const board = boards.find((b) => b.id === parseInt(id));
      if (board) {
        setTitle(board.title);
        setContent(board.content);
      }
    }
  }, [id, boards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const updatedBoards = boards.map((board) =>
        board.id === parseInt(id) ? { ...board, title, content } : board
      );
      setBoards(updatedBoards);
    } else {
      const newBoard = { id: Date.now(), title, content };
      setBoards([...boards, newBoard]);
    }
    navigate("/board");
  };

  return (
    <div className="board-container">
      <h2>{id ? "글 수정" : "새 글 작성"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          저장
        </button>
      </form>
    </div>
  );
};

export default BoardForm;
