import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../css/board_write.css";

const BoardWrite = ({ boards, setBoards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null); // 이미지 파일을 저장할 상태 변수
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기를 위한 상태 변수
  const [summaryOutput, setSummaryOutput] = useState("");

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

  useEffect(() => {
    if (isEdit) {
      fetchPost();
      const foundPost = boards.find((post) => post.id === parseInt(id));
      if (foundPost) {
        setTitle(foundPost.title);
        setSummary(foundPost.summary);
        setTags(foundPost.tags.join(", "));
        setImagePreview(foundPost.image); // 이미지 미리보기로 설정
      }
    }
  }, [fetchPost, isEdit, id, boards]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // 이미지 파일을 상태로 설정
    setImagePreview(URL.createObjectURL(file)); // 선택한 이미지를 미리 보기 위해 URL 생성
  };

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
      navigate("/board");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <textarea
            id="summary"
            className="input-summary"
            value={isEdit ? summary : summaryOutput}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="요약문을 입력하세요"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="tags"
            className="input-tags"
            value={tags}
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
