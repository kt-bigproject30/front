import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "../src/css/App.css";
import Login from "../src/component/login.jsx";
import Navbar from "../src/component/navbar.jsx";
import Summary from "../src/component/summary.jsx";
import DraftAI from "../src/component/draftai.jsx";
import Home from "../src/component/home.jsx";
import BoardList from "../src/component/board_list.jsx";
import BoardWrite from "../src/component/board_write.jsx";
import BoardDetail from "../src/component/board_detail.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Mypage from "../src/component/mypage.jsx";

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

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
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/summary" element={<Summary />} />
          <Route path="/draftai" element={<DraftAI />} />
          <Route path="/home" element={<Home />} /> {/* Home 라우트 추가 */}
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/board" element={<BoardList />} />{" "}
          {/* BoardList 라우트 추가 */}
          <Route path="/board/new" element={<BoardWrite />} />{" "}
          {/* BoardWrite 라우트 추가 */}
          <Route path="/board/edit/:id" element={<BoardWrite />} />{" "}
          {/* BoardWrite 라우트 추가 */}
          <Route path="/board/:id" element={<BoardDetail />} />{" "}
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
