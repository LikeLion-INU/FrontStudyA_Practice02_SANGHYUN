import styled from "styled-components";

// 버튼 스타일
const Button = styled.button`
  font-size: 14px;
  padding: 4px 20px;
  margin-bottom: 2vh;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;

  // 마우스 올렸을 때 색 변화
  &:hover {
    background-color: #e25555;
  }
`;

export default Button;
