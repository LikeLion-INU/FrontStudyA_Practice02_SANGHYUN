import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // �⺻ �ּ� ����
});

// ��û ������ ���� ��ū�� �ڵ����� ����� �߰�
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ����� ��ū ����
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // �ڵ� ����
  }
  return config;
});

export default instance;
