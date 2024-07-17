import React, { useState, useEffect } from "react";
import "../css/summary.css";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [summaryOutput, setSummaryOutput] = useState("");

  useEffect(() => {
    // JSON 파일에서 데이터를 가져오는 함수
    const fetchSummaryOutput = async () => {
      try {
        const response = await fetch("/summaryData.json");
        const data = await response.json();
        setSummaryOutput(data.summaryOutput);
      } catch (error) {
        console.error("Error fetching summary output:", error);
      }
    };

    fetchSummaryOutput();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      setTextInput(fileContent); // 파일 내용을 텍스트 입력란에 설정
    };

    reader.readAsText(file); // 파일을 텍스트로 읽어옴
  };

  const sendButtonClick = () => {
    setTextOutput(summaryOutput);
  };

  const moveButtonClick = () => {
    const summaryText = document.querySelector(".summary-text").innerText;
    sessionStorage.setItem("summaryText", summaryText);
    navigate("/draftai"); // useNavigate를 사용하여 경로 이동
  };

  return (
    <div className="container">
      <div className="left-column">
        <h2>Text Input</h2>
        <div className="title-text">
          <textarea
            rows="1"
            placeholder="제목을 입력하세요"
            required
          ></textarea>
        </div>
        <div className="tag-text">
          <textarea
            rows="1"
            placeholder="태그를 입력하세요"
            required
          ></textarea>
        </div>
        <div className="summary-text">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows="20"
            placeholder="요약할 내용을 입력하세요"
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
        <button
          id="uploadButton"
          onClick={() => document.getElementById("fileInput").click()}
        >
          파일 업로드
        </button>
        <button id="sendButton" onClick={sendButtonClick}>
          텍스트 요약
        </button>
      </div>
      <div className="right-column">
        <h2>Text Output</h2>
        <div id="summary-summary" className="summary-text">
          <textarea
            value={textOutput}
            onChange={(e) => setTextOutput(e.target.value)}
            name="message"
            id="message"
            rows="25"
            placeholder="요약된 내용"
            required
          ></textarea>
        </div>
        <button id="moveButton" onClick={moveButtonClick}>
          DraftAI
        </button>
      </div>
    </div>
  );
};

export default Summary;
