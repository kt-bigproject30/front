import React from "react";
import "../css/policy.css"; // 스타일링을 위한 CSS 파일

const Policy = () => {
  return (
    <div className="policy-content">
      <h1>개인정보처리방침</h1>
      <p>
        JASINGAM COMPANY(이하 '회사')는 개인정보 보호법 제30조에 따라 정보주체의
        개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
        있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
      </p>

      <h2>제1조(개인정보의 처리 목적)</h2>
      <p>
        회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는
        다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경될 시에는
        사전 동의를 구할 예정입니다.
      </p>
      <p>- 홈페이지 회원가입 및 관리</p>
      <p>- 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리</p>
      <p>- 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</p>
      <p>- 신규 서비스 개발 및 맞춤 서비스 제공</p>

      <h2>제2조(개인정보의 처리 및 보유 기간)</h2>
      <p>
        회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
        수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
        처리·보유합니다.
      </p>

      <h2>제3조(개인정보의 제3자 제공)</h2>
      <p>
        회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
        내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보
        보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
        제공합니다.
      </p>

      <h2>제4조(개인정보처리 위탁)</h2>
      <p>
        회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를
        위탁하고 있습니다.
      </p>
      <p>- 위탁받는 자 (수탁자) : [수탁자명]</p>
      <p>- 위탁하는 업무의 내용 : [위탁업무내용]</p>

      <h2>제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h2>
      <p>
        정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
        행사할 수 있습니다.
      </p>
      <p>- 개인정보 열람요구</p>
      <p>- 오류 등이 있을 경우 정정 요구</p>
      <p>- 삭제요구</p>
      <p>- 처리정지 요구</p>

      <h2>제6조(처리하는 개인정보의 항목 작성)</h2>
      <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
      <p>
        - 홈페이지 회원가입 및 관리 : 성명, 생년월일, 아이디, 비밀번호,
        이메일주소, 전화번호
      </p>

      <h2>제7조(개인정보의 파기)</h2>
      <p>
        회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게
        되었을 때에는 지체없이 해당 개인정보를 파기합니다.
      </p>

      <h2>제8조(개인정보의 안전성 확보 조치)</h2>
      <p>
        회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
      </p>
      <p>- 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등</p>
      <p>
        - 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템
        설치, 고유식별정보의 암호화
      </p>
      <p>- 물리적 조치 : 전산실, 자료보관실 등의 접근통제</p>

      <h2>제9조(개인정보 보호책임자)</h2>
      <p>
        회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
        관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이
        개인정보 보호책임자를 지정하고 있습니다.
      </p>
      <p>- 개인정보 보호책임자 성명 : [성명]</p>
      <p>- 직책 : [직책]</p>
      <p>- 연락처 : [연락처]</p>

      <h2>제10조(개인정보 처리방침 변경)</h2>
      <p>
        이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
        변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터
        공지사항을 통하여 고지할 것입니다.
      </p>
    </div>
  );
};

export default Policy;