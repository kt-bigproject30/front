import React from "react";
import { Link } from "react-router-dom";
import "../css/board.css"; // CSS 파일 import

const Board = ({ boards, handleDelete }) => {
  return (
    <div className="board-container">
      <h2>게시판 목록</h2>
      {boards.length > 0 ? (
        <ul className="list-group">
          <li className="list-group-header">
            <span>제목</span>
            <span>이름</span>
            <span>작성일</span>
          </li>
          {boards.map((board) => (
            <li key={board.id} className="list-group-item">
              <span>
                <Link to={`/board/${board.id}`}>{board.title}</Link>
              </span>
              <span>{board.userId}</span>
              <span>{board.date}</span>
            </li>
          ))}

          <div className="board-controls">
            <Link to="/board/new" className="btn">
              새 글 작성
            </Link>
          </div>
        </ul>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default Board;
