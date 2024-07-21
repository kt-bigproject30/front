import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "../css/draftai.css";
import api from "../api";

const DraftAI = () => {
  const [imageOutputs, setImageOutputs] = useState(["1", "2", "3", "4"]);
  
  const [summaryOutput, setSummaryOutput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  

  const {state} = useLocation();    // 2번 라인
  const {summary} = state;


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token); // 전체 토큰을 콘솔에 출력
  }, []);

  useEffect(() =>{
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
  },[]);



  const modelButtonClick = async (model) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post(
        "/generate",
        { summary, user_select_model: model },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { img1, img2, img3, img4 } = response.data;
      setImageOutputs([img1, img2, img3, img4]);
    } catch (error) {
      console.error("Error fetching image outputs:", error);
    }
    console.log(model);
  };

  const handleDownloadClick = () => {
    const convertBackgroundImageToDataURL = async (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;

      const { backgroundImage, width, height } =
        window.getComputedStyle(element);
      const url = backgroundImage.slice(4, -1).replace(/["']/g, "");

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = parseInt(width, 10);
          canvas.height = parseInt(height, 10);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
      });
    };

    const promises = [
      convertBackgroundImageToDataURL("#imageOutput1"),
      convertBackgroundImageToDataURL("#imageOutput2"),
      convertBackgroundImageToDataURL("#imageOutput3"),
      convertBackgroundImageToDataURL("#imageOutput4"),
    ];

    Promise.all(promises)
      .then((dataURLs) => {
        dataURLs.forEach((dataURL, index) => {
          if (dataURL) {
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = `imageOutput${index + 1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        });
      })
      .catch((error) => {
        console.error("Error converting background image to data URL:", error);
      });
  };

  const moveButtonClick = () => {
    window.location.href = "/board/new";
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="left-column">
        <h2>Model Select</h2>
        <div id="draft-summary" className="summary-text">
          <textarea
            value = {summary}
            name="message"
            id="message"
            rows="5"
            placeholder="요약된 내용"
            readOnly
          ></textarea>
        </div>
        <div className="group-model">
          <button
            id="modelselect1"
            className="cartoon-model"
            onClick={() => modelButtonClick("1")}
  
          >
            <h2>Cartoon</h2>
          </button>

          <button id="modelselect2" 
          className="fairytale-model"
          onClick={() => modelButtonClick("2")}
          >
            <h2>Fairytale</h2>
          </button>
          
          <button id="modelselect3" 
          className="anime-model"
          onClick={() => modelButtonClick("3")}
          >
            <h2>Anime</h2>
          </button>
          
          <button id="modelselect4"
           className="pixel-model"
           onClick={() => modelButtonClick("4")}
           >
            <h2>Pixel</h2>
          </button>
        </div>
      </div>

      <div className="right-column">
        <h2>Image Output</h2>
        <div className="output-group">
          

          {imageOutputs.map((src, index) => (
            <div
              key={index}
              id={`imageOutput${index + 1}`}
              className="output-image"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          ))}
        </div>

      
        <button id="downloadButton" onClick={handleDownloadClick}>
          이미지 다운로드
        </button>
        <button id="uploadButton" onClick={moveButtonClick}>
          게시판 등록
        </button>
      </div>
    </div>
  );
};

export default DraftAI;
