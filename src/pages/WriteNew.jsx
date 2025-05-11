import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

function WriteNew({ posts, setPosts }) {
  const navigate = useNavigate();

  const handlePostSubmit = ({ title, content }) => {
    const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost = { id: newId, title, content };
    setPosts([newPost, ...posts]);
    navigate("/"); // 새 데이터 등록 후 메인으로 이동
  };

  return <PostForm onSubmit={handlePostSubmit} />; // handlePostSubmit 함수를 onSubmit이라는 props로 전달
}

export default WriteNew;
