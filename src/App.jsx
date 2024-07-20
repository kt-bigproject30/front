import React, { useState, useEffect } from "react";
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
import Usepage from "./component/usepage.jsx";
import PrivateRoute from "./component/private_route.jsx"; // PrivateRoute 컴포넌트 추가

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/login";
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  ); // 로그인 상태 추가
  const token = localStorage.getItem("authToken");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, [token]);

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
          <Route
            path="/summary"
            element={
              <PrivateRoute element={<Summary />} authenticated={isLoggedIn} />
            }
          />
          <Route
            path="/draftai"
            element={
              <PrivateRoute element={<DraftAI />} authenticated={isLoggedIn} />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute element={<Home />} authenticated={isLoggedIn} />
            }
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute element={<Mypage />} authenticated={isLoggedIn} />
            }
          />
          <Route
            path="/board"
            element={
              <PrivateRoute
                element={<BoardList />}
                authenticated={isLoggedIn}
              />
            }
          />
          <Route
            path="/board/new"
            element={
              <PrivateRoute
                element={<BoardWrite />}
                authenticated={isLoggedIn}
              />
            }
          />
          <Route
            path="/board/edit/:id"
            element={
              <PrivateRoute
                element={<BoardWrite />}
                authenticated={isLoggedIn}
              />
            }
          />
          <Route
            path="/board/:id"
            element={
              <PrivateRoute
                element={<BoardDetail />}
                authenticated={isLoggedIn}
              />
            }
          />
          <Route
            path="/usepage"
            element={
              <PrivateRoute element={<Usepage />} authenticated={isLoggedIn} />
            }
          />
          <Route
            path="/policy"
            element={
              <PrivateRoute element={<Policy />} authenticated={isLoggedIn} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
