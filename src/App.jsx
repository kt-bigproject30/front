import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "../src/css/App.css";
import Login from "../src/component/login.jsx";
import Navbar from "../src/component/navbar.jsx";
import DraftAI from "../src/component/draftai.jsx";
import Home from "../src/component/home.jsx";
import Board from "../src/component/board.jsx";
import BoardForm from "../src/component/board_form.jsx";
import BoardDetail from "../src/component/board_detail.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";
  const [boards, setBoards] = useState([]); // boards 상태 초기화
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {shouldShowNavbar && (
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className={`main-content ${isSidebarOpen ? "content-shift" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/draftai" element={<DraftAI />} />
          <Route path="/home" element={<Home />} /> {/* Home 라우트 추가 */}
          <Route path="/board" element={<Board boards={boards} />} />{" "}
          {/* BoardList 라우트 추가 */}
          <Route
            path="/board/new"
            element={<BoardForm boards={boards} setBoards={setBoards} />}
          />{" "}
          {/* BoardForm 라우트 추가 */}
          <Route
            path="/board/edit/:id"
            element={<BoardForm boards={boards} setBoards={setBoards} />}
          />{" "}
          {/* BoardForm 라우트 추가 */}
          <Route
            path="/board/:id"
            element={<BoardDetail boards={boards} />}
          />{" "}
          {/* BoardDetail 라우트 추가 */}
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
