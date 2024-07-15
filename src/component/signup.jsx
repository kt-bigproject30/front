import React, { useState } from "react";
import api from "../api"; // API 모듈 가져오기
import "../css/login.css";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    name: "",
    emailLocal: "",
    emailDomain: "",
    birthdate: "",
    email: "",
    phone: "",
  });

  const [customDomain, setCustomDomain] = useState(false); // 사용자 정의 도메인 입력 여부 상태
  const [error, setError] = useState(""); // 에러 메시지 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDomainChange = (e) => {
    const { value } = e.target;
    if (value === "custom") {
      setCustomDomain(true);
      setFormData({ ...formData, emailDomain: "" });
    } else {
      setCustomDomain(false);
      setFormData({ ...formData, emailDomain: value });
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.pwdConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const email = `${formData.emailLocal}@${formData.emailDomain}`;
    setFormData({
      ...formData,
      email,
    });

    try {
      const response = await api.post("/jwt-login/join", {
        ...formData,
        email,
      });
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다!");
        toggleForm(); // 회원가입 후 로그인 폼으로 돌아가기
      } else {
        setError(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      setError("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <div className="profileId">
            <label htmlFor="id">회원가입</label>
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
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="pwdConfirm"
            placeholder="비밀번호 확인"
            value={formData.pwdConfirm}
            onChange={handleChange}
          />
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
          <div className="email">
            <input
              type="text"
              name="emailLocal"
              placeholder="이메일"
              value={formData.emailLocal}
              onChange={handleChange}
            />
            @
            {customDomain ? (
              <input
                type="text"
                name="emailDomain"
                placeholder="도메인 입력"
                value={formData.emailDomain}
                onChange={handleChange}
              />
            ) : (
              <select
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleDomainChange}
              >
                <option value="">이메일 선택</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="kakao.com">kakao.com</option>
                <option value="custom">직접 입력</option>
              </select>
            )}
          </div>
          <input
            type="text"
            name="phone"
            placeholder="핸드폰 번호"
            value={formData.phone}
            onChange={handleChange}
          />

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
