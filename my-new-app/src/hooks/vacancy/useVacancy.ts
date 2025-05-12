import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Vacancy } from "../../types/vacancy";

export const useVacancy = (id) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: [],
    location: "",
    salary: "",
  });
  const [requirementsInput, setRequirementsInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      setIsLoading(true);
      const fetchVacancy = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(`http://192.168.225.12:3000/vacancies/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setForm(response.data);
          setRequirementsInput(response.data.requirements.join(", "));
        } catch (e) {
          Toast.show({ type: "error", text1: "Ошибка загрузки вакансии" });
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };

      fetchVacancy();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementsChange = (e) => {
    setRequirementsInput(e.target.value);
  };

  const handleSubmit = async () => {
    const requirementsArray = requirementsInput
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const vacancyToSend = {
      ...form,
      requirements: requirementsArray,
    };

    try {
      const token = await AsyncStorage.getItem("token");
      if (isEdit && id) {
        await axios.put(`http://192.168.225.12:3000/vacancies/${id}`, vacancyToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Toast.show({ type: "success", text1: "Вакансия обновлена" });
      } else {
        await axios.post("http://192.168.225.12:3000/vacancies", vacancyToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Toast.show({ type: "success", text1: "Вакансия создана" });
      }
    } catch (e) {
      Toast.show({ type: "error", text1: "Ошибка при сохранении вакансии" });
      console.error(e);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleRequirementsChange,
    requirementsInput,
    handleSubmit,
    isLoading,
    isEdit,
  };
};
