import { useState, useEffect } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

// Тип для параметров маршрута
type NotificationRouteParams = {
  id: string;
};

// Тип для навигации (в данном случае только для этого маршрута)
type RootStackParamList = {
  NotificationList: undefined;
  EditNotification: { id: string };
};

// Получаем параметры маршрута с правильным типом
export const useNotificationDetails = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "EditNotification">>(); // Указываем правильный тип
  const { id } = params || {}; // Получаем id уведомления из параметров маршрута
  const [notification, setNotification] = useState(null);
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Расшифровка токена
          const decoded = jwtDecode<{ role: string }>(token); // Объявление типа для результата
          setRole(decoded.role); // Устанавливаем роль из расшифрованного токена
        }

        if (id) {
          const response = await axios.get(`http://localhost:3000/notifications/${id}`);
          setNotification(response.data);
        }
      } catch (err) {
        Toast.show({ type: "error", text1: "Ошибка загрузки оповещения" });
      }
    };

    fetchNotification();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = confirm("Удалить это оповещение?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/notifications/${id}`);
        Toast.show({ type: "success", text1: "Оповещение удалено" });
        navigation.navigate("NotificationList"); // Перенаправляем на список уведомлений
      } catch {
        Toast.show({ type: "error", text1: "Ошибка при удалении" });
      }
    }
  };

  const handleEdit = () => {
    navigation.navigate("EditNotification", { id });
  };

  return {
    notification,
    role,
    handleDelete,
    handleEdit,
  };
};
