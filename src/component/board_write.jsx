import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import "../css/board_write.css";

// 게시물 작성 및 수정 컴포넌트
const BoardWrite = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 변수
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태 변수

  const { state } = useLocation();
  const { summary } = state == null ? "" : state;
  const { titleName } = state == null ? "" : state;
  const { tag } = state == null ? "" : state;
  const { idNumber } = state == null ? "" : state;

  // 이미지 파일이 변경되었을 때 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // 이미지 파일을 상태로 설정
    setImagePreview(URL.createObjectURL(file)); // 선택한 이미지를 미리 보기 위해 URL 생성
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem("authToken");
    if (imageFile) {
      const userinfo = await api.get("/jwt-login/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const username = userinfo.data.name;
      const imagename = username + "_" + imageFile.name;
      const newFile = new File([imageFile], imagename, {
        type: imageFile.type,
        lastModified: imageFile.lastModified,
      });
      formData.append("image", newFile); // 파일 객체를 FormData에 추가
    }
    try {
      const url = `/updatePost/${idNumber}`;
      await api.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error saving summary:", error);
    }
    navigate("/board");
  };

  return (
    <div className="board-write">
      <form onSubmit={handleSubmit} className="board-write-form">
        <div className="form-group">
          <input
            type="text"
            id="title"
            className="input-title"
            value={titleName}
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <textarea
            id="summary"
            className="input-summary"
            rows="10"
            value={summary}
            placeholder="요약문을 입력하세요"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="tags"
            className="input-tags"
            value={tag}
            placeholder="태그 (콤마로 구분)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="label-image">
            사진
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Selected" className="preview-image" />
          )}
        </div>
        <div className="form-group">
          <button id="moveButton" className="btn-submit" type="submit">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardWrite;
