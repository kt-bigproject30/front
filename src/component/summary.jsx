import React, { useState } from "react";
import "../css/summary.css";

const App = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [imageOutput, setImageOutput] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      setTextInput(fileContent); // 파일 내용을 텍스트 입력란에 설정
    };

    reader.readAsText(file); // 파일을 텍스트로 읽어옴
  };

  const handleButtonClick = () => {
    setTextOutput(textInput);

    // 이미지 출력 (예: 임의의 이미지 URL 사용)
    const imageUrl = "https://via.placeholder.com/400x300"; // 여기에 실제 이미지 URL을 설정하세요
    setImageOutput(imageUrl);
  };

  return (
    <div className="container">
      <div className="left-column">
        <h2>text input</h2>
        <div className="summary-text">
          <textarea
            name="message"
            id="message"
            // className="form-control"
            rows="20"
            placeholder="요약할 내용을 입력"
            required
          ></textarea>
        </div>
        <input
            type="file"
            id="fileInput"
            accept=".txt,.doc,.docx,.pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <button id = "uploadButton" onClick={() => document.getElementById("fileInput").click()}>
            파일 업로드
          </button>
          <button id = "sendButton" onClick={handleButtonClick}>텍스트 요약</button>
      </div>
      <div className="right-column">
        <h2>text output</h2>
        <div className="summary-text">
          <textarea
            name="message"
            id="message"
            // className="form-control"
            rows="25"
            placeholder="요약된 내용"
            required
          ></textarea>
        </div>
        <button id = "moveButton" onClick={handleButtonClick}>DraftAI</button>
      </div>
    </div>
  );
};

export default App;
