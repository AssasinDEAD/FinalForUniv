import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Для навигации
import { getMe, logout as logoutRequest } from "../services/authService"; // Сервисы для авторизации
import { User } from "../types/user"; // Типы данных
import AsyncStorage from "@react-native-async-storage/async-storage"; // Для хранения данных на устройстве

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Для навигации

  // Функция для получения данных пользователя
  const fetchUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData)); // Сохраняем данные пользователя в AsyncStorage
    } catch (err) {
      setUser(null);
      await AsyncStorage.removeItem("user"); // Удаляем данные, если ошибка
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для выхода из системы
  const logout = async () => {
    try {
      await logoutRequest(); // Запрос на выход
      setUser(null);
      await AsyncStorage.removeItem("user"); // Удаляем данные пользователя
      navigation.navigate("Login"); // Переход на страницу логина
    } catch (err) {
      console.error("Ошибка при выходе", err);
    }
  };

  // Загрузка данных пользователя при монтировании компонента
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования данных авторизации в других компонентах
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};
