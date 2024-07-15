import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../component/signup.jsx";
import api from "../api"; // API 모듈 가져오기
import "../css/login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(" /login", {
        id,
        password,
      });
      if (response.status === 200) {
        // 로그인 성공 시 홈으로 이동
        navigate("/home");
      } else {
        // 로그인 실패 시 에러 메시지 표시
        setError(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setError("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div>
      {isLogin ? (
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="ID"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">로그인</button>
              {error && <p className="error-message">{error}</p>}
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
