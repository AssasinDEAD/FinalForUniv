import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Toast.show({ type: "error", text1: "Вы не авторизованы" });
          return;
        }

        const userFromStorage = await AsyncStorage.getItem("user");
        if (userFromStorage) {
          setUser(JSON.parse(userFromStorage));
        }
      } catch (error) {
        Toast.show({ type: "error", text1: "Ошибка загрузки данных пользователя" });
      }
    };

    fetchUser();
  }, []);

  return { user };
};
