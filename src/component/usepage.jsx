import React from "react";
import "../css/usepage.css";

const Usepage = () => {
  return (
    <div className="usepage-container">
      <h1>사용법 페이지</h1>
      <p>
        이 페이지는 사용법을 설명합니다. 다음은 이 애플리케이션의 기본적인
        사용법입니다:
      </p>
      <ol>
        <p>로그인 페이지에서 사용자 계정으로 로그인합니다.</p>
        <p>
          로그인 후 메인 대시보드로 이동하여 주요 기능을 탐색할 수 있습니다.
        </p>
        <p>메뉴를 사용하여 다양한 페이지로 이동할 수 있습니다.</p>
        <p>
          사용법에 대한 자세한 내용은 각 페이지에 제공된 도움말을 참고하세요.
        </p>
      </ol>
      <p>
        이 애플리케이션을 사용하다가 문제가 발생하면 고객 지원팀에 문의하십시오.
      </p>
      <div className="howToUse">
        <div id="use1" className="use-image">
          <h2>1. 텍스트 입력 및 파일 업로드를 통해 요약할 내용을 입력</h2>
        </div>

        <div id="use2" className="use-image">
          <h2>2. 텍스트 요약 버튼을 클릭하여 내용을 요약</h2>
        </div>
        
        <div id="use3" className="use-image">
          <h2>3. 요약문을 수정하고, DraftAI 버튼을 클릭하여 이미지 생성페이지로 이동</h2>
        </div>

        <div id="use4" className="use-image">
          <h2>4. 모델을 선택하여 이미지 생성</h2>
        </div>

        <div id="use5" className="use-image">
          <h2>5. 다운로드 버튼을 통해 생성 이미지 다운로드</h2>
        </div>

        <div id="use6" className="use-image">
          <h2>6. 게시판 등록 버튼을 통해 내용과 이미지를 등록</h2>
        </div>  
      </div>
    </div>
  );
};

export default Usepage;
