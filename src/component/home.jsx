import React, { useEffect, useRef, useState } from "react";
import "../css/home.css";
import jasingamImage from "../img/jasingam.jpg";

const Home = () => {
  const imageRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [activeButton, setActiveButton] = useState(0);

  const updateImageHeight = () => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  };

  useEffect(() => {
    updateImageHeight(); // Initial update on component mount

    window.addEventListener("resize", updateImageHeight);
    return () => {
      window.removeEventListener("resize", updateImageHeight);
    };
  }, []);

  const moveButtonClick = () => {
    window.location.href = "./usepage";
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="content">
          <div className="image-wrapper">
            <img
              src={jasingamImage}
              alt="Image of Jasingam"
              className="start-image"
              ref={imageRef}
              onLoad={updateImageHeight}
            />
            <div className="controls">
              <button className="arrow-button">{"<"}</button>
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  className={`circle-button ${
                    activeButton === index ? "active" : ""
                  }`}
                  onClick={() => setActiveButton(index)}
                ></button>
              ))}
              <button className="arrow-button">{">"}</button>
            </div>
          </div>
          <div className="side-content">
            <div className="notice-box" style={{ height: imageHeight / 2 }}>
              공지사항
            </div>
            <button
              className="use-box"
              onClick={moveButtonClick}
              style={{ height: imageHeight / 2 }}
            >
              사용방법
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
