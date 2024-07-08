import React, { useState } from "react";
import "../css/draftai.css";

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
        <div className="input-group">
          <input
            type="text"
            id="textInput"
            placeholder="텍스트를 입력하세요"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input
            type="file"
            id="fileInput"
            accept=".txt,.doc,.docx,.pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <button onClick={() => document.getElementById("fileInput").click()}>
            파일 업로드
          </button>
          <button onClick={handleButtonClick}>텍스트 요약</button>
        </div>
        <h2>text output</h2>
        <div className="input-group">
          <div id="textOutput" className="output-text">
            {textOutput}
          </div>
          <button onClick={handleButtonClick}>이미지 생성</button>
        </div>
      </div>
      <div className="right-column">
        <h2>image output</h2>
        <div className="group-model">
          <div id="modelselect1" className="select-model"></div>
          <div id="modelselect2" className="select-model"></div>
          <div id="modelselect3" className="select-model"></div>
          <div id="modelselect4" className="select-model"></div>
        </div>
        <div className="output-group">
          <div id="imageOutput1" className="output-image">
            {imageOutput && <img src={imageOutput} alt="출력 이미지" />}
          </div>
          <div id="imageOutput2" className="output-image"></div>
          <div id="imageOutput3" className="output-image"></div>
          <div id="imageOutput4" className="output-image"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
