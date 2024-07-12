import React, { useState, useEffect } from "react";
import "../css/mypage.css";
import "../img/user.png";
import api from "../api"; // API 모듈

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchUserPosts();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/user/me"); // 사용자 정보 API
      setUserInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get("/user/posts");
      setUserPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };

  return (
    <div className="mypage-container">
      <h1>마이 페이지</h1>
      <div className="user-info">
        <img
          src="../img/user.png"
          alt="User Profile"
          className="profile-image"
        />
        <div className="user-details">
          <p>
            <strong>이름:</strong> {userInfo.name}
          </p>
          <p>
            <strong>이메일:</strong> {userInfo.email}
          </p>
        </div>
      </div>
      <div className="user-posts">
        <h2>내가 작성한 글</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
            </div>
          ))
        ) : (
          <p>작성한 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mypage;
