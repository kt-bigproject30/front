import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../component/signup.jsx";
import "../css/login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // 여기에 로그인 로직을 추가하세요.
    // 로그인 성공 시 start 페이지로 이동.
    navigate("/start");
  };

  return (
    <div>
      {isLogin ? (
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={handleLogin}>
              <input type="text" placeholder="ID" />
              <input type="password" placeholder="password" />
              <button type="submit">로그인</button>
              <p className="message">
                아직 회원이 아니신가요?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="link-button"
                >
                  회원가입
                </button>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Login;
