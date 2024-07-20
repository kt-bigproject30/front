import api from "../api"; // api 모듈 가져오기

const logout = async () => {
  try {
    console.log("로그아웃 API 호출 시작");

    // 로컬 스토리지 또는 세션 스토리지에서 토큰 가져오기
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    // 로그아웃 API 호출
    await api.post(
      "/jwt-login/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("로그아웃 API 호출 성공");
    localStorage.removeItem("token");
    console.log("토큰 삭제 성공");
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw new Error("로그아웃에 실패했습니다. 다시 시도해주세요.");
  }
};

export default logout;
