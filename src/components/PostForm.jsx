import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

// 입력 칸 컨테이너
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 1vh 5vh;
`;

// 제목 입력 칸
const InputTitle = styled.input`
  padding: 2vh;
`;

// 내용 입력 칸
const InputContent = styled.textarea`
  padding: 2vh;
  height: 52vh;
`;

// 버튼 컨테이너
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
`;

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState(""); // 제목 관리 변수
  const [content, setContent] = useState(""); // 내용 관리 변수
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 공백 제출 방지
    if (!title.trim() || !content.trim()) {
      alert("제목/내용을 입력해주세요.");
      return;
    }

    // 작성 완료 후 확인창 띄우기
    const confirm = window.confirm("작성을 완료하시겠습니까?");
    if (!confirm) return;

    onSubmit({ title, content }); // onSubmit(=handlePostSubmit) 함수 실행
  };

  return (
    <InputContainer>
      <h1>글쓰기</h1>
      <InputTitle
        type="text"
        placeholder="제목을 입력하세요..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputContent
        placeholder="내용을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={() => navigate(-1)}>취소</Button>
        <Button onClick={handleSubmit}>작성 완료</Button>
      </ButtonContainer>
    </InputContainer>
  );
}

export default PostForm;
