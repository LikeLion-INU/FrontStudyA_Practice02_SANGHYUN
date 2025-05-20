// 서버
// 클라이언트의 각 요청에 따른 로직/응답 처리

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 3001;
const JWT_SECRET = "your_jwt_secret_key";

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// DB 파일 경로
const DB_FILE = path.join(__dirname, "db.json");

// DB 읽기 함수
function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf8");
  return JSON.parse(data);
}

// DB 쓰기 함수
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

// 토큰 검증 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "인증이 필요합니다" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다" });
    }
    req.user = user;
    next();
  });
}

// 사용자 소유권 확인 미들웨어
function checkOwnership(req, res, next) {
  const db = readDB();
  const postId = parseInt(req.params.id);
  const post = db.posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
  }

  if (post.userId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "자신의 게시글만 수정/삭제할 수 있습니다" });
  }

  next();
}

// 1. 회원가입 (POST /signup)
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "이메일과 비밀번호가 필요합니다" });
  }

  try {
    const db = readDB();

    // 이메일 중복 확인
    if (db.users.find((user) => user.email === email)) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다" });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 데이터
    const newUser = {
      id: db.users.length ? Math.max(...db.users.map((u) => u.id)) + 1 : 1,
      email,
      password: hashedPassword,
      name: email.split("@")[0], // 기본 사용자명은 이메일 앞부분으로 설정
    };

    db.users.push(newUser);
    writeDB(db);

    // 비밀번호 정보 제외하고 응답
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 2. 로그인 (POST /login)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "이메일과 비밀번호가 필요합니다" });
  }

  try {
    const db = readDB();
    const user = db.users.find((u) => u.email === email);

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }

    // 비밀번호 검증
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "비밀번호가 올바르지 않습니다" });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // 비밀번호 제외하고 응답
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 3. 글 목록 가져오기 (GET /660/posts)
app.get("/660/posts", authenticateToken, (req, res) => {
  try {
    const db = readDB();
    res.json(db.posts);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 4. 글 작성하기 (POST /660/posts)
app.post("/660/posts", authenticateToken, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용이 필요합니다" });
  }

  try {
    const db = readDB();

    const newPost = {
      id: db.posts.length ? Math.max(...db.posts.map((p) => p.id)) + 1 : 1,
      title,
      content,
      userId: req.user.id,
      createdAt: new Date().toISOString(),
    };

    db.posts.push(newPost);
    writeDB(db);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 5. 글 수정하기 (PUT /660/posts/:id)
app.put("/660/posts/:id", authenticateToken, checkOwnership, (req, res) => {
  const { title, content } = req.body;
  const postId = parseInt(req.params.id);

  if (!title && !content) {
    return res.status(400).json({ message: "수정할 내용이 필요합니다" });
  }

  try {
    const db = readDB();
    const postIndex = db.posts.findIndex((p) => p.id === postId);

    // 기존 값을 유지하면서 새 값으로 업데이트
    const updatedPost = {
      ...db.posts[postIndex],
      title: title || db.posts[postIndex].title,
      content: content || db.posts[postIndex].content,
      updatedAt: new Date().toISOString(),
    };

    db.posts[postIndex] = updatedPost;
    writeDB(db);

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 6. 글 삭제하기 (DELETE /660/posts/:id)
app.delete("/660/posts/:id", authenticateToken, checkOwnership, (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    const db = readDB();
    const filteredPosts = db.posts.filter((p) => p.id !== postId);

    // 글이 존재하지 않는 경우 에러 응답
    if (filteredPosts.length === db.posts.length) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
    }

    db.posts = filteredPosts;
    writeDB(db);

    res.json({ message: "게시글이 삭제되었습니다", id: postId });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error: error.message });
  }
});

// 루트 경로
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
