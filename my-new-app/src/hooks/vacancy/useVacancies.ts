import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vacancy } from "../../types/vacancy";

export const useVacancies = (role, showMy) => {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const url =
          role === "company" && showMy
            ? "http://192.168.225.12:3000/vacancies/my"
            : "http://192.168.225.12:3000/vacancies";

        const { data } = await axios.get(url, { headers });
        setVacancies(data);
      } catch {
        Toast.show({ type: "error", text1: "Не удалось загрузить вакансии" });
      } finally {
        setIsLoading(false);
      }
    };

    if (role) fetchVacancies();
  }, [role, showMy]);

  return { vacancies, isLoading };
};
