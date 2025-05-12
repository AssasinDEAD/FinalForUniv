import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';  // Импортируем типы для навигации
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Описание типов для навигации
type RootStackParamList = {
  Dashboard: undefined;  // Тип для экрана "Dashboard"
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;  // Тип для навигации на экран "Dashboard"

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Используем типизацию для навигации
  const navigation = useNavigation<NavigationProp>();  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      // Сохраняем токен и данные пользователя в AsyncStorage
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Навигация на экран "Dashboard" после успешного входа
      navigation.navigate("Dashboard");
      Toast.show({ type: "success", text1: data.message || "Успешно!" });
    } catch (err) {
      // Выводим сообщение об ошибке
      const errorMessage = err.response?.data?.message || "Ошибка";
      Toast.show({ type: "error", text1: errorMessage });
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  };
};
