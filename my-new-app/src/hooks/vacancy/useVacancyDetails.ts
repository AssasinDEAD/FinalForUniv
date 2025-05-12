import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Vacancy } from "../../types/vacancy";

export const useVacancyDetails = (id) => {
  const [vacancy, setVacancy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    const fetchVacancy = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://192.168.225.12:3000/vacancies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVacancy(response.data);
      } catch (e) {
        Toast.show({ type: "error", text1: "Ошибка загрузки вакансии" });
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  return { vacancy, isLoading };
};
