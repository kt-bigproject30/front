import React, { useState } from "react";
import "../css/login.css";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    pwdConfirm: "",
    name: "",
    emailLocal: "",
    emailDomain: "",
    birthdate: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = () => {
    // 회원가입 로직을 처리합니다.
    console.log("회원가입 정보:", formData);
    alert("회원가입이 완료되었습니다!");
    toggleForm(); // 회원가입 후 로그인 폼으로 돌아가기
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form">
          <div className="profileId">
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              placeholder="6자~20자"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
            <div className="notice hidden">
              영문 소문자, 숫자를 포함한 6~20자를 입력하세요.
            </div>
          </div>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthdate"
            placeholder="생년월일"
            value={formData.birthdate}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="핸드폰 번호"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={handleSignup}>
            회원가입
          </button>
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
