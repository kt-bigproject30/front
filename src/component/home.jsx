import React from "react";
import "../css/home.css";
import jasingamImage from "../img/jasingam.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Jasingam</h1>
      <img src={jasingamImage} alt="Jasingam" className="start-image" />
    </div>
  );
};

export default Home;
