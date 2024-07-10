import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/board_write.css"; // CSS 파일을 불러옵니다.

const BoardWrite = ({ boards, setBoards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id); // id가 있으면 수정 모드로 설정
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [summaryOutput, setSummaryOutput] = useState("");

  useEffect(() => {
    if (isEdit) {
      const foundPost = boards.find((post) => post.id === parseInt(id));
      if (foundPost) {
        setTitle(foundPost.title);
        setSummary(foundPost.summary);
        setTags(foundPost.tags.join(", "));
        setImage(foundPost.image);
      }
    }
  }, [id, isEdit, boards]);

  useEffect(() => {
    // JSON 파일에서 데이터를 가져오는 함수
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
    setImage(URL.createObjectURL(file)); // 선택한 이미지를 미리 보기 위해 URL 생성
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const updatedBoards = boards.map((post) =>
        post.id === parseInt(id)
          ? {
              ...post,
              title,
              summary,
              tags: tags.split(",").map((tag) => tag.trim()),
              image,
            }
          : post
      );
      setBoards(updatedBoards);
    } else {
      const newPost = {
        id: boards.length + 1,
        title,
        userName: "CurrentUser", // 실제 로그인된 사용자 이름으로 변경 필요
        date: new Date().toLocaleDateString(),
        tags: tags.split(",").map((tag) => tag.trim()),
        summary,
        image,
      };
      setBoards([...boards, newPost]);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <textarea
            id="summary"
            className="input-summary"
            // value={summary}
            value={summaryOutput}
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
          <label htmlFor="image" className="label-image"></label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <img src={image} alt="Selected" className="preview-image" />
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
