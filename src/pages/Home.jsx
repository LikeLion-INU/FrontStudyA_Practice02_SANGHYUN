import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import PostItem from "../components/PostItem";

// 블로그 헤더
const BlogHeader = styled.div`
  padding: 3vh;
  background-color: black;
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

// 글 목록
const PostList = styled.div`
  padding: 3vh;
  margin-top: 3vh;
`;

function Home() {
  // 글 목록(더미데이터)
  const dummyPosts = [
    { id: 1, title: "안녕", content: "하세요" },
    { id: 2, title: "제", content: "이름은" },
    { id: 3, title: "임상현", content: "이고요" },
    { id: 2, title: "코딩왕이", content: "되고 싶습니다" },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <BlogHeader>TITLE</BlogHeader>
      <PostList>
        <Button onClick={() => navigate("/new")}>글쓰기</Button>
        {dummyPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </PostList>
    </div>
  );
}

export default Home;
