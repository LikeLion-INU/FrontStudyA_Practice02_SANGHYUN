import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../api/axiosInstance";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await instance.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(); // 상태 업데이트
      alert("로그인 성공! 메인 페이지로 이동합니다.");
      navigate("/"); // Home으로 이동
    } catch (err) {
      alert("로그인 실패: " + (err.response?.data?.message || "서버 오류"));
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
}
