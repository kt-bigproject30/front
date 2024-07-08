import React from "react";
import "../css/home.css"; // 필요한 경우 CSS 파일 import

const Home = () => {
  return (
    <div className="home-container">
      <h1>Jasingam</h1>
      <img src="../img/jasingam.jpg" alt="Jasingam" className="start-image" />
    </div>
  );
};

export default Home;
