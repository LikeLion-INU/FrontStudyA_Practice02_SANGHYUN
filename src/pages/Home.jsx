import { React } from "react";
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

function Home({ posts }) {
  const navigate = useNavigate();

  return (
    <div>
      <BlogHeader>MINI BLOG</BlogHeader>
      <PostList>
        <Button onClick={() => navigate("/new")}>글쓰기</Button>
        {posts.map((item) => (
          <PostItem key={item.id} post={item} /> // PostItem에 key와 post를 넘김
        ))}
      </PostList>
    </div>
  );
}

export default Home;
