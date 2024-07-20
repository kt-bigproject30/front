import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../component/signup.jsx";
import api from "../api"; // API 모듈 가져오기
import "../css/login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameErrorVisible, setUsernameErrorVisible] = useState(false);
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Toggle 시 오류 메시지 초기화
    setUsernameErrorVisible(false); // Toggle 시 아이디 오류 메시지 숨기기
    setPasswordErrorVisible(false); // Toggle 시 비밀번호 오류 메시지 숨기기
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setUsernameErrorVisible(false); // 로그인 시도 전 아이디 오류 메시지 숨기기
    setPasswordErrorVisible(false); // 로그인 시도 전 비밀번호 오류 메시지 숨기기

    try {
      console.log("Sending login request with:", { username, password }); // 디버깅용 로그
      const response = await api.post("/jwt-login/login", {
        username,
        password,
      });
      console.log("Response received:", response); // 디버깅용 로그

      if (response.status === 200) {
        const token = response.data; // 응답에서 토큰 추출
        console.log("Response data:", response.data); // 디버깅용 로그

        console.log("Token received:", token); // 디버깅용 로그
        localStorage.setItem("authToken", token); // 토큰을 세션 스토리지에 저장
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("authToken")
        ); // 저장된 토큰 확인 로그
        navigate("/home");
      } else {
        // 로그인 실패 시 에러 메시지 표시
        setError(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error occurred during login request:", error); // 디버깅용 로그
      if (error.response && error.response.status === 403) {
        if (error.response.data.error === "Invalid username") {
          setUsernameErrorVisible(true); // 잘못된 자격 증명 메시지 표시
          setError("아이디가 잘못되었습니다.");
        } else if (error.response.data.error === "Invalid password") {
          setPasswordErrorVisible(true); // 잘못된 자격 증명 메시지 표시
          setError("비밀번호가 잘못되었습니다.");
        } else {
          setError("아이디 또는 비밀번호가 잘못되었습니다.");
        }
      } else {
        setError("서버와의 연결에 실패했습니다.");
      }
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
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p
                className={`error-message ${
                  usernameErrorVisible ? "visible" : "hidden"
                }`}
              >
                아이디가 틀렸습니다.
              </p>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                className={`error-message ${
                  passwordErrorVisible ? "visible" : "hidden"
                }`}
              >
                비밀번호가 틀렸습니다.
              </p>
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
