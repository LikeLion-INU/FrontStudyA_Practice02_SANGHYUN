import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import CommentForm from "../components/CommentForm";
import CommentItem from "../components/CommentItem";

// 전체 컨테이너
const Container = styled.div`
  max-width: 70vw;
  margin: 0 auto;
  padding: 3vw;
`;

// 글 박스
const PostBox = styled.div`
  padding: 7vh;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

// 제목
const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
`;

// 내용
const Content = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
`;

// 구분선
const SectionDivider = styled.hr`
  margin-top: 7vh;
  margin-bottom: 4vh;
  border-top: 1px solid #eee;
`;

// 댓글창
const CommentArea = styled.div`
  margin-top: 2vh;
`;

function ViewPost({ posts, setPosts }) {
  const { id } = useParams(); // URL에서 id만 추출
  const post = posts.find((item) => item.id === parseInt(id)); // 해당 글 탐색
  const navigate = useNavigate();

  const handleAddComment = (commentText) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " "); // 현재 시각을 "2025-00-00 00:00" 형태로 변환
    const newComment = { content: commentText, date: now }; // 새로운 댓글 객체 생성

    const updatedPosts = posts.map((item) =>
      item.id === post.id // 지금 보고 있는 글이면
        ? { ...item, comments: [...(item.comments || []), newComment] } // 기존 댓글 배열에 새 댓글 추가
        : item
    );

    setPosts(updatedPosts);
  };

  const handleDeletePost = () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    const updated = posts.filter((item) => item.id !== post.id); // 지금 보는 게시물을 제외하고 나머지만 남김
    setPosts(updated);
    navigate("/");
  };

  if (!post) return <p>존재하지 않는 글입니다.</p>;

  return (
    <Container>
      <PostBox>
        <Button style={{ padding: "5px" }} onClick={handleDeletePost}>
          삭제
        </Button>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
      </PostBox>
      <SectionDivider />
      <h3>댓글</h3>
      <CommentForm onSubmit={handleAddComment} />
      {post.comments?.map((comment, idx) => (
        <CommentItem key={idx} comment={comment} />
      ))}
    </Container>
  );
}

export default ViewPost;
