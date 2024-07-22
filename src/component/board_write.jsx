import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../css/board_write.css";

// 게시물 작성 및 수정 컴포넌트
const BoardWrite = ({ boards, setBoards }) => {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const isEdit = Boolean(id); // id가 존재하면 수정 모드, 그렇지 않으면 작성 모드
  const [title, setTitle] = useState(""); // 제목 상태 변수
  const [summary2, setSummary] = useState(""); // 요약문 상태 변수
  const [tags, setTags] = useState(""); // 태그 상태 변수
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 변수
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태 변수
  const [summaryOutput, setSummaryOutput] = useState(""); // 요약문 데이터를 위한 상태 변수
  const [titleOutput, setTitleOutput] = useState(""); // 제목 데이터를 위한 상태 변수
  const [tagOutput, setTagOutput] = useState(""); // 태그 데이터를 위한 상태 변수
  

  const { state } = useLocation(); // 2번 라인
  const {summary} = state == null ?"": state;
  const {titleName} = state == null ?"": state;
  const {tag} = state == null ?"": state;
  const {idNumber} = state == null ?"": state;


  console.log("1번",summary);
  console.log("2번",tag);
  console.log("3번",titleName);
  console.log("4번",idNumber);


  // 게시물 데이터를 가져오는 함수
  const fetchPost = useCallback(async () => {
    try {
      const response = await api.get(`/post/${id}`);
      const post = response.data;
      setTitle(post.title);
      setSummary(post.summary2);
      setTags(post.tags ? post.tags.join(", ") : "");
      setImagePreview(post.imageUrl); // 이미지 URL을 미리보기로 설정
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [id]);



  const moveButtonClick = async () => {
    
    

    try {
  
      const url = `/updatePost/${idNumber}`;
      const token = localStorage.getItem("authToken");
      console.log("Saving summary...");
      const imageUrl = "https://d22e4sjbrjllgi.cloudfront.net/generated_images/4model_zxqwas9510_1.png";
      const response = await api.put(
        url,
        { imageUrl},
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Summary saved successfully:", response.data);
      
    } catch (error) {
      console.error("Error saving summary:", error);
    }
    navigate("/board")

    
    
  };








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
    formData.append("title", title);
    formData.append("summary", summary2);
    formData.append("tags", tags);
    if (imageFile) {
      formData.append("image", imageFile); // 파일 객체를 FormData에 추가
    }

    
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
            // value={isEdit ? title : titleOutput}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <textarea
            id="summary"
            className="input-summary"
            rows="10"
            value={summary}

            // value={isEdit ? summary2 : summaryOutput}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="요약문을 입력하세요"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="tags"
            className="input-tags"
            value={tag}
            // value={isEdit ? tags : tagOutput}
            onChange={(e) => setTags(e.target.value)}
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
          {/* <button type="submit" className="btn-submit">
            {isEdit ? "수정" : "발행"}
          </button> */}

          <button id="moveButton" className="btn-submit" onClick={moveButtonClick} type="submit">
            등록
          </button>

        </div>
      </form>
    </div>
  );
};

export default BoardWrite;
