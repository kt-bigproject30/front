import React, { useState, useEffect } from "react";
import "../css/summary.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [, setSummaryOutput] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token); // 전체 토큰을 콘솔에 출력
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      setTextInput(fileContent);
    };

    reader.readAsText(file);
  };

  const sendButtonClick = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post(
        "/api/text_summarize",
        { contents: textInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.summary; // 응답 데이터에서 summaryOutput을 추출
      console.log(data);
      setSummaryOutput(data);
      setTextOutput(data);
    } catch (error) {
      console.error("Error fetching summary output:", error);
    }
  };

  const moveButtonClick = async () => {
    const summaryText = textOutput;
    const titleText = title;
    const tagsText = tags;
    const contents = textInput;
    const category = "example-category"; // 필요한 경우 카테고리를 설정

    try {
      const token = localStorage.getItem("authToken");
      await api.post(
        "/api/save_summary",
        { summaryText, titleText, tagsText, contents, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/draftai");
    } catch (error) {
      console.error("Error saving summary:", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="left-column">
        <h2>Text Input</h2>
        <div className="title-text">
          <textarea
            rows="1"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="tag-text">
          <textarea
            rows="1"
            placeholder="태그를 입력하세요"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
