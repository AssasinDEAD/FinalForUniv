import axiosInstance from "../api/axiosInstance"; // Импортируем axiosInstance
import AsyncStorage from "@react-native-async-storage/async-storage";

// Функция для логина
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  
  // Если токен в ответе, сохраняем его в AsyncStorage
  if (response.data.token) {
    await AsyncStorage.setItem("token", response.data.token);
  }

  return response.data; // Возвращаем данные пользователя (или любой ответ)
};

// Функция для выхода
export const logout = async () => {
  await axiosInstance.post("/auth/logout"); // Отправляем запрос на выход
  await AsyncStorage.removeItem("token"); // Удаляем токен из AsyncStorage
};

// Функция для получения данных о текущем пользователе
export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me"); // Запрос на данные пользователя
  return response.data; // Возвращаем данные о пользователе
};
