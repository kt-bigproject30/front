import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      navigate("/login");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler sidebar-toggler"
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand custom-padding" to="/home">
          Jasingam
        </Link>
        <div className="navbar-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary">
                Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/draftai">
                DraftAI
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/board">
                Board
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mypage">
                Mypage
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right ml-auto">
          <button
            className="nav-link logout-button btn btn-link"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="sidebar show">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleBack}>
                뒤로가기
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary" onClick={toggleSidebar}>
                Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/draftai" onClick={toggleSidebar}>
                DraftAI
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/board" onClick={toggleSidebar}>
                Board
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mypage" onClick={toggleSidebar}>
                Mypage
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
