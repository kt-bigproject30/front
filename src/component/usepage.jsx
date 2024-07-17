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
        <li>로그인 페이지에서 사용자 계정으로 로그인합니다.</li>
        <li>
          로그인 후 메인 대시보드로 이동하여 주요 기능을 탐색할 수 있습니다.
        </li>
        <li>메뉴를 사용하여 다양한 페이지로 이동할 수 있습니다.</li>
        <li>
          사용법에 대한 자세한 내용은 각 페이지에 제공된 도움말을 참고하세요.
        </li>
      </ol>
      <p>
        이 애플리케이션을 사용하다가 문제가 발생하면 고객 지원팀에 문의하십시오.
      </p>
    </div>
  );
};

export default Usepage;
