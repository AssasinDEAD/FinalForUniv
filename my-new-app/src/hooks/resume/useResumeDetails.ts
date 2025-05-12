import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ResumeWithUser } from "../../types/resume";

export const useResumeDetails = (id) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/resumes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResume(response.data);
      } catch (e) {
        Toast.show({ type: "error", text1: "Ошибка при загрузке резюме" });
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  return { resume, loading };
};
