import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // 기본 주소 지정
});

// 요청 보내기 전에 토큰을 자동으로 헤더에 추가
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 저장된 토큰 꺼냄
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 자동 삽입
  }
  return config;
});

export default instance;
