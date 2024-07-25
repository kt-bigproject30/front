import api from "../api"; // api 모듈 가져오기

const logout = async () => {
  try {
    // 로컬 스토리지 또는 세션 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("authToken");

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
  } catch (error) {
    throw new Error("로그아웃에 실패했습니다. 다시 시도해주세요.");
  }
};

export default logout;
