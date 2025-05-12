import { useState, useEffect } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Типы для навигации
type RootStackParamList = {
  NotificationList: undefined;
  EditNotification: { id: string };
  // Добавьте другие экраны по необходимости
};

// Тип для navigation prop
type NotificationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditNotification'
>;

// Тип для route params
type NotificationRouteProp = RouteProp<RootStackParamList, 'EditNotification'>;

interface DecodedToken {
  role: string;
  [key: string]: any; // Для других возможных полей в токене
}

interface Notification {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  created_at?: string;
}

export const useNotificationDetails = () => {
  const navigation = useNavigation<NotificationDetailsNavigationProp>();
  const route = useRoute<NotificationRouteProp>();
  const { id } = route.params;
  
  const [notification, setNotification] = useState<Notification | null>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode<DecodedToken>(token);
          setRole(decoded.role);
        }

        if (id) {
          const response = await axios.get<Notification>(
            `http://192.168.225.12:3000/notifications/${id}`
          );
          setNotification(response.data);
        }
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Ошибка загрузки оповещения",
        });
      }
    };

    fetchNotification();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await axios.delete(`http://192.168.225.12:3000/notifications/${id}`);
      Toast.show({
        type: "success",
        text1: "Оповещение удалено",
      });
      navigation.navigate("NotificationList");
    } catch {
      Toast.show({
        type: "error",
        text1: "Ошибка при удалении",
      });
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