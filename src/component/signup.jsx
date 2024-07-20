import React, { useState } from "react";
import api from "../api"; // API 모듈 가져오기
import "../css/login.css";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    passwordCheck: false,
    form: false,
  }); // 에러 메시지 상태

  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    form: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (name, value) => {
    let error = "";
    let hasError = false;

    switch (name) {
      case "username":
        if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
          error = "아이디는 6자 이상 20자 이하, 영문자와 숫자만 가능합니다.";
          hasError = true;
        }
        break;
      case "password":
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/.test(value)) {
          error = "비밀번호는 10자 이상, 영문자와 숫자를 포함해야 합니다.";
          hasError = true;
        }
        break;
      case "passwordCheck":
        if (value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다.";
          hasError = true;
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: hasError,
    }));

    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: error,
    }));

    return hasError;
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await api.post("/jwt-login/check-username", {
        username,
      });
      return response.data.available;
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: true,
      }));
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        username: "아이디 중복확인에 실패했습니다.",
      }));
      return false;
    }
  };

  const handleSignup = async () => {
    // 모든 필드에 대해 유효성 검사 실행
    const fields = ["username", "password", "passwordCheck"];
    let hasErrors = false;

    fields.forEach((field) => {
      const fieldHasError = validateField(field, formData[field]);
      if (fieldHasError) {
        hasErrors = true;
      }
    });

    // 에러가 있는지 확인
    if (hasErrors) {
      return;
    }

    // 아이디 중복 확인
    const isUsernameAvailable = await checkUsernameAvailability(
      formData.username
    );
    if (!isUsernameAvailable) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: true,
      }));
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        username: "이미 사용중인 아이디입니다. 다른 아이디를 입력해주세요.",
      }));
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
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: true,
        }));
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          form: response.data.message || "회원가입에 실패했습니다.",
        }));
      }
    } catch (error) {
      if (error.response) {
        // 서버에서 응답을 받았으나 상태 코드가 2xx 범위를 벗어나는 경우
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: true,
        }));
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          form: error.response.data.message || "회원가입에 실패했습니다.",
        }));
      } else if (error.request) {
        // 요청이 만들어졌으나 서버로부터 응답을 받지 못한 경우
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: true,
        }));
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          form: "서버와의 연결에 실패했습니다.",
        }));
      } else {
        // 오류를 발생시킨 요청 설정 문제
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: true,
        }));
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          form: "회원가입 과정에서 오류가 발생했습니다.",
        }));
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
              onBlur={() => validateField("username", formData.username)}
            />
            <div
              className={`error-message ${errors.username ? "visible" : ""}`}
            >
              {errorMessages.username}
            </div>
          </div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => validateField("password", formData.password)}
          />
          <div className={`error-message ${errors.password ? "visible" : ""}`}>
            {errorMessages.password}
          </div>
          <input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            value={formData.passwordCheck}
            onChange={handleChange}
            onBlur={() =>
              validateField("passwordCheck", formData.passwordCheck)
            }
          />
          <div
            className={`error-message ${errors.passwordCheck ? "visible" : ""}`}
          >
            {errorMessages.passwordCheck}
          </div>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />

          <button type="button" onClick={handleSignup}>
            회원가입
          </button>
          <div className={`error-message ${errors.form ? "visible" : ""}`}>
            {errorMessages.form}
          </div>
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
