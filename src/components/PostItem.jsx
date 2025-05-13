import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 글 박스 컨테이너
const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 2vw;
  margin-bottom: 2vh;
  border-radius: 8px;
`;

// 글 제목 (링크)
const TitleLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline; // 마우스 올려놓을 때만 밑줄 표시
  }
`;

// 글 내용 미리보기
const ContentPreview = styled.p`
  color: #666;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

function PostItem({ post }) {
  // 미리보기 글자수 제한 함수
  const slice = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text; // maxLength보다 길면 자르고 "..." 붙임
  };

  return (
    <PostContainer>
      <TitleLink to={`/post/${post.id}`}>{post.title}</TitleLink> {/* 제목 클릭 시 상세페이지로 이동 */}
      <ContentPreview>{slice(post.content, 50)}</ContentPreview>
    </PostContainer>
  );
}

export default PostItem;
