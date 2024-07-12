// import React, { useState, useEffect } from "react";
// import "../css/summary.css";
// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import DraftAI from "./draftai"; // draftai.jsx 파일을 임포트합니다.

// const Summary = () => {
//   const navigate = useNavigate();
//   const [textInput, setTextInput] = useState("");
//   const [textOutput, setTextOutput] = useState("");
//   const [summaryOutput, setSummaryOutput] = useState("");

//   useEffect(() => {
//     // JSON 파일에서 데이터를 가져오는 함수
//     const fetchSummaryOutput = async () => {
//       try {
//         const response = await fetch("/summaryData.json");
//         const data = await response.json();
//         setSummaryOutput(data.summaryOutput);
//       } catch (error) {
//         console.error("Error fetching summary output:", error);
//       }
//     };

//     fetchSummaryOutput();
//   }, []);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       const fileContent = e.target.result;
//       setTextInput(fileContent); // 파일 내용을 텍스트 입력란에 설정
//     };

//     reader.readAsText(file); // 파일을 텍스트로 읽어옴
//   };

//   const sendButtonClick = () => {
//     setTextOutput(summaryOutput);
//   };

//   const moveButtonClick = () => {
//     // summary-text 클래스의 내용을 가져옵니다.
//     const summaryText = document.querySelector('.summary-text').innerText;

//     // 세션 스토리지에 내용을 저장합니다.
//     sessionStorage.setItem('summaryText', summaryText);
//     window.location.href = './draftai';
//   };

//   return (
//     <div className="container">
//       <div className="left-column">
//         <h2>text input</h2>
//         <div className="summary-text">
//           <textarea
//             value={textInput}
//             onChange={(e) => setTextInput(e.target.value)}
//             rows="20"
//             placeholder="요약할 내용을 입력하세요"
//             required
//           ></textarea>
//         </div>
//         <input
//             type="file"
//             id="fileInput"
//             accept=".txt,.doc,.docx,.pdf"
//             style={{ display: "none" }}
//             onChange={handleFileSelect}
//           />
//           <button id = "uploadButton" onClick={() => document.getElementById("fileInput").click()}>
//             파일 업로드
//           </button>
//           <button id = "sendButton" onClick={sendButtonClick}>텍스트 요약</button>
//       </div>
//       <div className="right-column">
//         <h2>text output</h2>
//         <div id = "summary-summary" className="summary-text">
//           <textarea
//             value = {summaryOutput}
//             onChange={(e) => setTextOutput(e.target.value)}
//             name="message"
//             id="message"
//             // className="form-control"
//             rows="25"
//             placeholder="요약된 내용"
//             required
//           ></textarea>
//         </div>
//         <button
//           id= "moveButton" onClick={moveButtonClick}
//         >DraftAI</button>

//       </div>
//     </div>
//   );

// };

// export default Summary;
import React, { useState, useEffect } from "react";
import "../css/summary.css";
import Footer from "./footer"; // 푸터 컴포넌트 임포트
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import DraftAI from "./draftai"; // draftai.jsx 파일을 임포트합니다.

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
    // summary-text 클래스의 내용을 가져옵니다.
    const summaryText = document.querySelector(".summary-text").innerText;

    // 세션 스토리지에 내용을 저장합니다.
    sessionStorage.setItem("summaryText", summaryText);
    window.location.href = "./draftai";
  };

  return (
    <div className="container">
      <div className="left-column">
        <h2>text input</h2>
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
        <h2>text output</h2>
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
