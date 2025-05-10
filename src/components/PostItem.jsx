import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// �� �ϳ��� �ڽ� ���·� �����ִ� ������Ʈ
const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 2vw;
  margin-bottom: 2vh;
  border-radius: 8px;
`;

// ���� (��ũ)
const TitleLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline; // ���콺 �÷����� ���� ���� ǥ��
  }
`;

// ���� �̸����� �ؽ�Ʈ
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
