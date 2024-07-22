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

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "정말로 이 게시글을 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("authToken");
        await api.delete(`/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(`Post with ID ${id} has been deleted successfully.`);
        // 삭제 후 게시물 목록을 다시 불러옴
        fetchUserPosts();
      } catch (error) {
        console.error("Failed to delete post:", error); // 에러 로그
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
        alert("Failed to delete post: " + error.message); // 사용자에게 에러 알림
      }
    }
  };

  const convertToKST = (utcDate) => {
    const date = new Date(utcDate);
    const utcTime = date.getTime();
    const kstTime = new Date(utcTime + 9 * 60 * 60 * 1000); // 9시간 추가
    console.log("???????", kstTime);
    return kstTime.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    //return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
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
              <p>
                <strong>작성일:</strong> {convertToKST(post.createdAt)}
              </p>
              <p>
                <strong>카테고리:</strong> {post.category}
              </p>
              <p>{post.summary}</p>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="post-image"
              />
              <button onClick={() => deletePost(post.id)}>삭제</button>
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
