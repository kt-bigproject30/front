import React from "react";
import { Link, useParams } from "react-router-dom";
import "../css/board.css"; // CSS 파일 import

const BoardDetail = ({ boards }) => {
  const { id } = useParams();
  const board = boards.find((b) => b.id === parseInt(id));

  if (!board) {
    return <div className="board-container">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="board-container">
      <h2 className="board-title">{board.title}</h2>
      <hr className="divider" />
      <div className="board-content-container">
        <p className="board-content">{board.content}</p>
      </div>
      <hr className="divider" />
      <div className="board-detail-controls">
        <Link to={`/board/edit/${board.id}`} className="btn btn-secondary">
          수정
        </Link>
        <Link to="/board" className="btn btn-primary">
          목록
        </Link>
      </div>
    </div>
  );
};

export default BoardDetail;
