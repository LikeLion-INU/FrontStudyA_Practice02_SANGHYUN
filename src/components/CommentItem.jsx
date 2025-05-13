import React from "react";
import styled from "styled-components";

// 댓글 컨테이너
const ItemContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

// 댓글 내용
const Content = styled.p`
  font-size: 15px;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

// 날짜
const Date = styled.span`
  font-size: 13px;
  color: #888;
`;

function CommentItem({ comment }) {
  return (
    <ItemContainer>
      <Content>{comment.content}</Content>
      <Date>{comment.date}</Date>
    </ItemContainer>
  );
}

export default CommentItem;
