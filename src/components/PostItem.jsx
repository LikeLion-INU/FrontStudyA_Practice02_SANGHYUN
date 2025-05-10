import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 글 하나를 박스 형태로 보여주는 컴포넌트
const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 2vw;
  margin-bottom: 2vh;
  border-radius: 8px;
`;

// 제목 (링크)
const TitleLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline; // 마우스 올려놓을 때만 밑줄 표시
  }
`;

// 내용 미리보기 텍스트
const ContentPreview = styled.p`
  color: #666;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

function PostItem({ post }) {
  return (
    <PostContainer>
      <TitleLink to={`/post/${post.id}`}>{post.title}</TitleLink>
      <ContentPreview>{post.content}</ContentPreview>
    </PostContainer>
  );
}

export default PostItem;
