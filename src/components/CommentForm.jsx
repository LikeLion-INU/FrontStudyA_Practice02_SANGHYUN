import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { ButtonContainer } from "./PostForm";

// 댓글 리스트 컨테이너
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 댓글 입력 칸
const TextArea = styled.textarea`
  width: 68vw;
  padding: 1rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

function CommentForm({ onSubmit }) {
  const [text, setText] = useState(""); // 댓글 내용 관리 변수
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 공백 제출 방지
    if (!text.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    // 작성 완료 후 확인창 띄우기
    const confirm = window.confirm("작성을 완료하시겠습니까?");
    if (!confirm) return;

    onSubmit(text); // 부모에게 댓글 내용 전달
    setText(""); // 입력창 초기화
  };

  return (
    <FormContainer>
      <TextArea
        placeholder="댓글을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={() => navigate(-1)}>돌아가기</Button>
        <Button onClick={handleSubmit}>댓글 등록</Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default CommentForm;
