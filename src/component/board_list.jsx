import React from "react";
import { Link } from "react-router-dom";
import "../css/board_list.css";

const BoardList = ({ boards }) => {
  return (
    <div className="board-list">
      <div className="board-header">
        <h1>Board List</h1>
        <Link to="/board/new" className="btn btn-primary">
          Write a new post
        </Link>
      </div>
      {boards.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h2 className="post-title">
              <Link to={`/board/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="post-info">
              <span className="post-author">{post.userName}</span>
              <span className="post-date">{post.date}</span>
            </div>
          </div>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
