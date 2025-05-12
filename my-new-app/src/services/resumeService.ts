import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Resume, ResumeWithUser, defaultResume } from "../types/resume";

const API_URL = "http://192.168.225.12:3000/resumes";

// Получение заголовков с авторизацией
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Вы не авторизованы");
  return { Authorization: `Bearer ${token}` };
};

// Получить свое резюме
export const getResume = async (token: string | null): Promise<Resume> => {
  if (!token) throw new Error("Вы не авторизованы");
  try {
    const { data } = await axios.get<Resume>(`${API_URL}/me`, {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) return defaultResume;
    throw err;
  }
};

// Обновить резюме
export const updateResume = async (token: string | null, formData: Resume) => {
  if (!token) throw new Error("Вы не авторизованы");
  await axios.put(API_URL, formData, {
    headers: await getAuthHeaders(),
  });
};

// Получить все резюме для компаний/ЦК
export const fetchResumes = async (token: string | null): Promise<ResumeWithUser[]> => {
  if (!token) throw new Error("Вы не авторизованы");
  const { data } = await axios.get<ResumeWithUser[]>(API_URL, {
    headers: await getAuthHeaders(),
  });
  return data;
};

// Получить одно резюме для компаний/ЦК
export const fetchResumeById = async (id: string, token: string | null): Promise<ResumeWithUser> => {
  if (!token) throw new Error("Вы не авторизованы");
  const { data } = await axios.get<ResumeWithUser>(`${API_URL}/${id}`, {
    headers: await getAuthHeaders(),
  });
  return data;
};
