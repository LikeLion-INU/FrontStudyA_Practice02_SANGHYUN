import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

function WriteNew({ posts, setPosts }) {
  const navigate = useNavigate();

  const handlePostSubmit = ({ title, content }) => {
    const newId = posts.length
      ? Math.max(...posts.map((item) => item.id)) + 1
      : 1;
    const newPost = { id: newId, title, content };
    setPosts([newPost, ...posts]);
    navigate("/"); // 새 데이터 등록 후 메인으로 이동
  };

  return <PostForm onSubmit={handlePostSubmit} />; // PostForm에 onSubmit(=handlePostSubmit)을 넘김
}

export default WriteNew;
