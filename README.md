# FrontStudyA_Practice02_SANGHYUN

멋쟁이사자처럼 13기 프론트엔드 실습 "미니 블로그 만들기"

---

## 📁 파일 구성

```
mini-blog/
├─server/
│   ├─ db.json       # (신규) 데이터베이스
│   ├─ server.js     # (신규) 서버
│   ├─ index.html    # (신규) API 확인 페이지
│   └─ ...
│
└─src/
   ├─ api/
   │    └─ axiosInstance.js    # (신규) axios 공통 설정
   ├─ components/
   │    ├─ Button.jsx          # 버튼 공통 스타일
   │    ├─ CommentForm.jsx     # 댓글 작성 폼
   │    ├─ CommentItem.jsx     # 댓글 목록
   │    ├─ PostForm.jsx        # 게시물 작성 폼
   │    └─ PostItem.jsx        # 게시물 목록
   ├─ contexts/
   │    └─ AuthContext.jsx     # (신규) 로그인 상태 관리
   ├─ pages/
   │    ├─ Home.jsx            # 메인 페이지 (글 목록)
   │    ├─ LoginPage.jsx       # (신규) 로그인 페이지
   │    ├─ SignupPage.jsx      # (신규) 회원가입 페이지
   │    ├─ ViewPost.jsx        # 게시물 자세히 보기
   │    └─ WriteNew.jsx        # 새 게시물 작성
   ...
```

---

## 📝 커밋 규칙

| 태그       | 설명                         |
| ---------- | ---------------------------- |
| `Feat`     | 새로운 기능 추가             |
| `Fix`      | 버그 수정                    |
| `Docs`     | 문서 수정                    |
| `Style`    | 코드 포맷팅 (기능 변경 없음) |
| `Refactor` | 코드 리팩토링                |
| `Test`     | 테스트 코드 작성             |
