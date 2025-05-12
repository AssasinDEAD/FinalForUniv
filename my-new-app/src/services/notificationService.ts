import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Notification } from "../types/notification";

const API_URL = "http://localhost:3000/notifications";

// Получаем заголовки с авторизацией
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) throw new Error("Вы не авторизованы");
  return { Authorization: `Bearer ${token}` };
};

// Получить список оповещений
export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await axios.get(API_URL, {
    headers: await getAuthHeaders(),
  });
  return data;
};

// Получить оповещение по ID
export const getNotificationById = async (id: string): Promise<Notification> => {
  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: await getAuthHeaders(),
  });
  return data;
};

// Создать новое оповещение
export const createNotification = async (formData: FormData): Promise<Notification> => {
  const { data } = await axios.post(API_URL, formData, {
    headers: {
      ...(await getAuthHeaders()),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Обновить существующее оповещение
export const updateNotification = async (id: string, formData: FormData): Promise<Notification> => {
  const { data } = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      ...(await getAuthHeaders()),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Удалить оповещение
export const deleteNotification = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: await getAuthHeaders(),
  });
};
