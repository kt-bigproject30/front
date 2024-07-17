import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../css/board_write.css";

// 게시물 작성 및 수정 컴포넌트
const BoardWrite = ({ boards, setBoards }) => {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const isEdit = Boolean(id); // id가 존재하면 수정 모드, 그렇지 않으면 작성 모드
  const [title, setTitle] = useState(""); // 제목 상태 변수
  const [summary, setSummary] = useState(""); // 요약문 상태 변수
  const [tags, setTags] = useState(""); // 태그 상태 변수
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 변수
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태 변수
  const [summaryOutput, setSummaryOutput] = useState(""); // 요약문 데이터를 위한 상태 변수
  const [titleOutput, setTitleOutput] = useState(""); // 제목 데이터를 위한 상태 변수
  const [tagOutput, setTagOutput] = useState(""); // 태그 데이터를 위한 상태 변수
  // 게시물 데이터를 가져오는 함수
  const fetchPost = useCallback(async () => {
    try {
      const response = await api.get(`/post/${id}`);
      const post = response.data;
      setTitle(post.title);
      setSummary(post.summary);
      setTags(post.tags ? post.tags.join(", ") : "");
      setImagePreview(post.imageUrl); // 이미지 URL을 미리보기로 설정
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [id]);

  // 컴포넌트가 마운트되거나 isEdit 또는 id가 변경될 때 실행되는 useEffect
  useEffect(() => {
    if (isEdit) {
      fetchPost(); // 게시물 데이터를 가져옴
      const foundPost = boards.find((post) => post.id === parseInt(id));
      if (foundPost) {
        setTitle(foundPost.title);
        setSummary(foundPost.summary);
        setTags(foundPost.tags.join(", "));
        setImagePreview(foundPost.image); // 이미지 미리보기로 설정
      }
    }
  }, [fetchPost, isEdit, id, boards]);

  // 요약문 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchSummaryOutput = async () => {
      try {
        const response = await fetch("/summaryData.json");
        const data = await response.json();
        setSummaryOutput(data.summaryOutput);
      } catch (error) {
        console.error("Error fetching summary output:", error);
      }
    };

    fetchSummaryOutput();
  }, []);

  // 제목 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTitleOutput = async () => {
      try {
        const response = await fetch("/summaryData.json");
        const data = await response.json();
        setTitleOutput(data.titleOutput);
      } catch (error) {
        console.error("Error fetching title output:", error);
      }
    };

    fetchTitleOutput();
  }, []);

  // 태그 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchTagOutput = async () => {
      try {
        const response = await fetch("/summaryData.json");
        const data = await response.json();
        setTagOutput(data.tagOutput);
      } catch (error) {
        console.error("Error fetching tag output:", error);
      }
    };

    fetchTagOutput();
  }, []);

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
    formData.append("summary", summary);
    formData.append("tags", tags);
    if (imageFile) {
      formData.append("image", imageFile); // 파일 객체를 FormData에 추가
    }

    try {
      if (isEdit) {
        await api.put(`/post/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/board"); // 게시판 페이지로 이동
    } catch (error) {
      console.error("Failed to save post:", error);
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
            // value={title}
            // value={isEdit ? title : titleOutput}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <textarea
            id="summary"
            className="input-summary"
            // value={isEdit ? summary : summaryOutput}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="요약문을 입력하세요"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="tags"
            className="input-tags"
            // value={tags}
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
          <button type="submit" className="btn-submit">
            {isEdit ? "수정" : "발행"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardWrite;
