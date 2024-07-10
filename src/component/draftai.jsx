import React, { useState, useEffect } from "react";
import "../css/draftai.css";

const DraftAI = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [imageOutput, setImageOutput] = useState("");
  const [summaryOutput, setSummaryOutput] = useState("");
  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const fileContent = e.target.result;
  //     setTextInput(fileContent); // 파일 내용을 텍스트 입력란에 설정
  //   };

  //   reader.readAsText(file); // 파일을 텍스트로 읽어옴
  // };

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

  const handleButtonClick = () => {
    setTextOutput(textInput);

    // 이미지 출력 (예: 임의의 이미지 URL 사용)
    const imageUrl = "https://via.placeholder.com/400x300"; // 여기에 실제 이미지 URL을 설정하세요
    setImageOutput(imageUrl);
  };
  
  const moveButtonClick = () => {
    
    window.location.href = '/board/new';
  };

  return (
    <div className="container">
      <div className="left-column">
        <h2>model select</h2>
        <div id="draft-summary" className="summary-text">
          <textarea
            value={summaryOutput}
            name="message"
            id="message"
            // className="form-control"
            rows="5"
            placeholder="요약된 내용"
            required
          ></textarea>
        </div>
        <div className="group-model">
          <button id="modelselect1" className="cartoon-model"><h2>cartoon</h2></button>
          <button id="modelselect2" className="fairytale-model"><h2>fairytale</h2></button>
          <button id="modelselect3" className="anime-model"><h2>anime</h2></button>
          <button id="modelselect4" className="pixel-model"><h2>pixel</h2></button>
        </div>
      </div>

      <div className="right-column">
        <h2>image output</h2>
        
        <div className="output-group">
          <div id="imageOutput1" className="output-image">
            {imageOutput && <img src={imageOutput} alt="출력 이미지" />}
          </div>
          <div id="imageOutput2" className="output-image"></div>
          <div id="imageOutput3" className="output-image"></div>
          <div id="imageOutput4" className="output-image"></div>
        </div>
        {/* <h2>image download</h2>
        <div className="group-img">
          <div id="imgselect1" className="select-img"></div>
          <div id="imgselect2" className="select-img"></div>
          <div id="imgselect3" className="select-img"></div>
          <div id="imgselect4" className="select-img"></div>
        </div> */}
        <button id="downloadButton" onClick={() => document.getElementById("fileInput").click()}>
            이미지 다운로드
        </button>
        <button id = "uploadButton"onClick={moveButtonClick}>게시판 등록</button>
      </div>
    </div>
  );
};

export default DraftAI;
