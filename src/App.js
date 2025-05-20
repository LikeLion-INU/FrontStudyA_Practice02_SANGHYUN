import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import WriteNew from "./pages/WriteNew";
import instance from "./api/axiosInstance";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await instance.get("/660/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("게시글 가져오기 실패:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchPosts(); // 토큰이 있을 때만 게시글 가져오기
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={() => {
                  setIsLoggedIn(true);
                  fetchPosts(); // 로그인 성공 시 게시글 다시 불러오기
                }}
              />
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home posts={posts} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/post/:id"
            element={
              isLoggedIn ? (
                <ViewPost posts={posts} setPosts={setPosts} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/new"
            element={
              isLoggedIn ? (
                <WriteNew posts={posts} setPosts={setPosts} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
