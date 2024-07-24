import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, element }) => {
  const navigate = useNavigate();

  if (!authenticated) {
    alert("로그인이 필요합니다.");
    navigate("/login");
    return null;
  }

  return element;
};

export default PrivateRoute;
