import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get("http://192.168.225.12:3000/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        Toast.show({ type: "error", text1: "Не удалось загрузить оповещения" });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading };
};
