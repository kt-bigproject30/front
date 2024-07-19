import React, { useState, useEffect } from "react";
import "../css/mypage.css";
import api from "../api"; // API 모듈

const Mypage = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await api.get("/mypost", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched user posts:", response.data); // 응답 데이터 로그
      setUserPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch user posts:", error); // 에러 로그
      alert("Failed to fetch user posts: " + error.message); // 사용자에게 에러 알림
    }
  };

  return (
    <div className="mypage-container">
      <h1>마이 페이지</h1>
      <div className="user-posts">
        <h2>내가 작성한 글</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <img src={post.image} alt={post.title} className="post-image" />
              <p>{post.summary}</p>
              <p>
                <strong>작성일:</strong> {post.createdAt}
              </p>
              <p>
                <strong>카테고리:</strong> {post.category}
              </p>
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
