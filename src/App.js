import { react, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import WriteNew from "./pages/WriteNew";

function App() {
  // 글 목록(더미데이터)
  const [posts, setPosts] = useState([
    { id: 1, title: "안녕", content: "하세요" },
    { id: 2, title: "제", content: "이름은" },
    { id: 3, title: "임상현", content: "입니다" },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/post" element={<ViewPost />} />
        <Route
          path="/new"
          element={<WriteNew posts={posts} setPosts={setPosts} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
