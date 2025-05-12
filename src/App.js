import { react, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import WriteNew from "./pages/WriteNew";

function App() {
  // 글/댓글 목록(더미데이터)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "치킨은 언제나 옳다",
      content: "야근하고 먹는 치킨은 왜 이렇게 맛있을까요?",
      comments: [
        {
          content: "이 글에 치킨 향이 나는 것 같아요",
          date: "2025-05-11 18:00",
        },
        { content: "순살이냐 뼈냐, 그것이 문제로다", date: "2025-05-11 18:03" },
      ],
    },
    {
      id: 2,
      title: "자바스크립트와 나의 평행이론",
      content: "이해하면 사라지고, 모르면 나오는 JS... 나만 그래?",
      comments: [
        { content: "JS는 살아있는 생명체야...", date: "2025-05-11 14:40" },
      ],
    },
    {
      id: 3,
      title: "꿈에서 출근했는데 진짜 출근하래",
      content: "꿈에서 이미 일 다 했는데 왜 또 해야 하죠?",
      comments: [
        {
          content: "그건 꿈속의 너고 지금은 현실이지...",
          date: "2025-05-11 09:20",
        },
        { content: "꿈에서도 과장님 보고 싶었잖아~", date: "2025-05-11 09:21" },
      ],
    },
    {
      id: 4,
      title: "고양이가 내 키보드를 점령했다",
      content: "코딩 좀 하려는데 자꾸 눌러앉아요... 이건 고양이도구화인가요?",
      comments: [
        { content: "이젠 IDE 말고 C-A-T 쓰셔야죠", date: "2025-05-11 11:10" },
      ],
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route
          path="/post/:id"
          element={<ViewPost posts={posts} setPosts={setPosts} />}
        />

        <Route
          path="/new"
          element={<WriteNew posts={posts} setPosts={setPosts} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
