import React, { useEffect, useRef, useState } from "react";
import "../css/home.css";
import jasingamImage from "../img/jasingam.jpg";
import useImage from "../img/use.jpg";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const images = [jasingamImage, useImage]; // 필요한 경우 여기에 더 많은 이미지를 추가

const Home = () => {
  const imageRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [activeButton, setActiveButton] = useState(1); // 기본 활성 버튼을 1로 설정
  const [currentImage, setCurrentImage] = useState(images[0]); // 초기 이미지를 설정
  const [direction, setDirection] = useState("next");

  const updateImageHeight = () => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  };

  useEffect(() => {
    updateImageHeight(); // 컴포넌트가 마운트될 때 초기 업데이트

    window.addEventListener("resize", updateImageHeight);
    return () => {
      window.removeEventListener("resize", updateImageHeight);
    };
  }, []);

  const handleButtonClick = (index) => {
    if (index !== activeButton) {
      setDirection(index > activeButton ? "next" : "prev");
      setActiveButton(index);
      setCurrentImage(images[index - 1]);
    }
  };

  const handleArrowClick = (direction) => {
    let newIndex = activeButton;
    if (direction === "prev") {
      newIndex = activeButton > 1 ? activeButton - 1 : images.length;
    } else if (direction === "next") {
      newIndex = activeButton < images.length ? activeButton + 1 : 1;
    }
    handleButtonClick(newIndex);
  };

  const useImageClick = () => {
    if (activeButton === 2) {
      window.location.href = './usepage';
    }
  };

  return (
    <div className="home-container">
      <h1>Jasingam</h1>
      <div className="content">
        <div className="image-wrapper">
          <TransitionGroup component={null}>
            <CSSTransition
              key={currentImage}
              classNames="slide"
              timeout={500}
            >
              <img
                src={currentImage}
                alt="Displayed"
                className={`start-image ${direction}`}
                ref={imageRef}
                onLoad={updateImageHeight}
                onClick={useImageClick}
              />
            </CSSTransition>
          </TransitionGroup>
          <div className="controls">
            <button
              className="arrow-button"
              aria-label="Previous Image"
              onClick={() => handleArrowClick("prev")}
            >
              {"<"}
            </button>
            {[...Array(images.length)].map((_, index) => (
              <button
                key={index}
                className={`circle-button ${activeButton === index + 1 ? "active" : ""}`}
                onClick={() => handleButtonClick(index + 1)}
                aria-label={`Image ${index + 1}`}
              ></button>
            ))}
            <button
              className="arrow-button"
              aria-label="Next Image"
              onClick={() => handleArrowClick("next")}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <div className="side-content">
          <div
            className="notice-box"
          
          >
            무언가 추가할 것?
          </div>
        </div>
    </div>
  );
};

export default Home;
