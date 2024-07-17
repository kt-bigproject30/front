import React, { useState, useEffect } from "react";
import "../css/draftai.css";

const DraftAI = () => {
  const [imageOutputs] = useState(["", "", "", ""]);
  const [summaryOutput, setSummaryOutput] = useState("");

  useEffect(() => {
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

  const modelButtonClick = () => {
    const imageOutput1 = document.querySelector("#imageOutput1");
    const imageOutput2 = document.querySelector("#imageOutput2");
    const imageOutput3 = document.querySelector("#imageOutput3");
    const imageOutput4 = document.querySelector("#imageOutput4");

    if (imageOutput1) {
      imageOutput1.style.backgroundImage = "url('imgai/result1.png')";
    }
    if (imageOutput2) {
      imageOutput2.style.backgroundImage = "url('imgai/result2.png')";
    }
    if (imageOutput3) {
      imageOutput3.style.backgroundImage = "url('imgai/result3.png')";
    }
    if (imageOutput4) {
      imageOutput4.style.backgroundImage = "url('imgai/result4.png')";
    }
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
            value={summaryOutput}
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
            onClick={modelButtonClick}
          >
            <h2>Cartoon</h2>
          </button>
          <button id="modelselect2" className="fairytale-model">
            <h2>Fairytale</h2>
          </button>
          <button id="modelselect3" className="anime-model">
            <h2>Anime</h2>
          </button>
          <button id="modelselect4" className="pixel-model">
            <h2>Pixel</h2>
          </button>
        </div>
      </div>

      <div className="right-column">
        <h2>Image Output</h2>
        <div className="output-group">
          <div id="imageOutput1" className="output-image">
            {imageOutputs[0] && <img src={imageOutputs[0]} alt="Output 1" />}
          </div>
          <div id="imageOutput2" className="output-image">
            {imageOutputs[1] && <img src={imageOutputs[1]} alt="Output 2" />}
          </div>
          <div id="imageOutput3" className="output-image">
            {imageOutputs[2] && <img src={imageOutputs[2]} alt="Output 3" />}
          </div>
          <div id="imageOutput4" className="output-image">
            {imageOutputs[3] && <img src={imageOutputs[3]} alt="Output 4" />}
          </div>
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
