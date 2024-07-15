import React, { useState } from "react";
import api from "../api"; // API 모듈 가져오기
import "../css/login.css";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    name: "",
    // birthdate: "",
    // phone: "",
  });

  const [error, setError] = useState(""); // 에러 메시지 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await api.post("/jwt-login/join", {
        ...formData,
      });

      if (response.status === 200) {
        alert("회원가입이 완료되었습니다!");
        toggleForm(); // 회원가입 후 로그인 폼으로 돌아가기
      } else {
        setError(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      if (error.response) {
        // 서버에서 응답을 받았으나 상태 코드가 2xx 범위를 벗어나는 경우
        setError(error.response.data.message || "회원가입에 실패했습니다.");
      } else if (error.request) {
        // 요청이 만들어졌으나 서버로부터 응답을 받지 못한 경우
        setError("서버와의 연결에 실패했습니다.");
      } else {
        // 오류를 발생시킨 요청 설정 문제
        setError("회원가입 과정에서 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <div className="profileId">
            <label htmlFor="username">회원가입</label>
            <input
              type="text"
              placeholder="6자~20자"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="notice hidden">
              영문 소문자, 숫자를 포함한 6~20자를 입력하세요.
            </div>
          </div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            value={formData.passwordCheck}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
          {/* 생년월일, 핸드폰 번호 입력 필드를 주석처리해도 초기값을 설정해줘서 오류를 방지합니다. */}
          {/* <input
            type="date"
            name="birthdate"
            placeholder="생년월일"
            value={formData.birthdate}
            onChange={handleChange}
          /> */}
          {/* <input
            type="text"
            name="phone"
            placeholder="핸드폰 번호"
            value={formData.phone}
            onChange={handleChange}
          /> */}

          <button type="button" onClick={handleSignup}>
            회원가입
          </button>
          {error && <p className="error-message">{error}</p>}
          <p className="message">
            이미 회원이신가요?{" "}
            <button type="button" onClick={toggleForm} className="link-button">
              로그인
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
