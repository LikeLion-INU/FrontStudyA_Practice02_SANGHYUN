import { useState } from "react";
import instance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

// 스타일 적용
const Container = styled.div`
  max-width: 400px;
  margin: 10vh auto;
  padding: 6vw;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 5vh;
  color: #333;
`;

const Input = styled.input`
  width: 96%;
  padding: 1vw 1vh;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0077ff;
  }
`;

const BottomText = styled.p`
  text-align: center;
  font-size: 15px;
  color: #555;

  a {
    color: #0077ff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await instance.post("/signup", { email, password });
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "회원가입 실패";
      alert(`⚠️ ${msg}`);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleSignup}
        style={{ padding: "10px 40%", marginTop: "2vh", marginLeft: "12px" }}
      >
        회원가입
      </Button>
    </Container>
  );
}
