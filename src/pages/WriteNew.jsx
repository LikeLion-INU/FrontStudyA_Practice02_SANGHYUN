import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

function WriteNew({ posts, setPosts }) {
  const navigate = useNavigate();

  const handlePostSubmit = ({ title, content }) => {
    const newId = posts.length
      ? Math.max(...posts.map((item) => item.id)) + 1 // post가 작성됐다면 (기존 id의 최댓값 + 1)을 새 id로 설정
      : 1;
    const newPost = { id: newId, title, content }; // 새 게시물 객체 생성
    setPosts([newPost, ...posts]); // 새 데이터 등록 후 메인으로 이동
    navigate("/");
  };

  return <PostForm onSubmit={handlePostSubmit} />; // PostForm에 onSubmit(=handlePostSubmit)을 넘김
}

export default WriteNew;
