import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/navbar.css";
import logo from "../img/mille_logo.png";
import logout from "./logout"; // 로그아웃 함수 가져오기

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      try {
        // 로그아웃 함수 호출
        await logout();

        // 로그아웃 후 로그인 페이지로 리다이렉트
        navigate("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
          <img src={logo} alt="밀리의 서재" className="logo-image" />
        </Link>
        <div className="navbar-center navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary">
                Draft AI
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
          <button
            className="close-sidebar-button btn btn-link"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            &times;
          </button>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary" onClick={toggleSidebar}>
                Draft AI
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
            <li className="nav-item sidebar-logout">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
