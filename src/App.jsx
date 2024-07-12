import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./css/App.css";
import Login from "./component/login.jsx";
import Navbar from "./component/navbar.jsx";
import Summary from "./component/summary.jsx";
import DraftAI from "./component/draftai.jsx";
import Home from "./component/home.jsx";
import BoardList from "./component/board_list.jsx";
import BoardWrite from "./component/board_write.jsx";
import BoardDetail from "./component/board_detail.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Mypage from "./component/mypage.jsx";
import Footer from "./component/footer.jsx";
import Policy from "./component/policy.jsx";

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
          <Route path="/policy" element={<Policy />} />{" "}
          {/* 개인정보처리방침 라우트 추가 */}
        </Routes>
      </div>
      <Footer /> {/* 푸터 컴포넌트 추가 */}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
