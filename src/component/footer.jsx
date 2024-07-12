import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css"; // 푸터 스타일링을 위한 CSS 파일

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 JASINGAM COMPANY. All Rights Reserved.</p>
        <Link to="/policy" className="footer-link">
          개인정보처리방침
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
