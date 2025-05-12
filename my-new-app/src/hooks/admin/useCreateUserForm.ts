import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  // Используем типизацию для навигации
  const navigation = useNavigation<any>(); // Используем any или настройте типы навигации

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        "http://192.168.225.12:3000/users/newUser",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Toast.show({ type: "success", text1: res.data.message });
      navigation.navigate("Home"); // Navigate to home or another screen after user creation
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Ошибка при создании пользователя",
      });
    }
  };

  return { formData, handleChange, handleSubmit };
};
