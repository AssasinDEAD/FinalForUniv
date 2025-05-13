import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null); // Состояние для хранения данных пользователя

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user"); // Получаем пользователя из AsyncStorage
      if (userData) {
        setUser(JSON.parse(userData)); // Если данные есть, устанавливаем их в состояние
      }
    };

    fetchUser(); // Выполняем загрузку данных пользователя при монтировании компонента
  }, []);

  return { user }; // Возвращаем данные пользователя
};
