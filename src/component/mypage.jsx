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
      const response = await api.get("/user/post");
      const posts = response.data.map((post) => ({
        id: post.id,
        title: post.title,
        summary: post.contents, // contents를 summary로 변경
        image: post.image,
        username: post.username,
        create_dt: post.create_dt,
        category: post.category,
      }));
      setUserPosts(posts);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
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
                <strong>작성자:</strong> {post.username}
              </p>
              <p>
                <strong>작성일:</strong> {post.create_dt}
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
