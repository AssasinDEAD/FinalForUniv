import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ResumeWithUser } from "../../types/resume";

export const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumesData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/resumes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumes(response.data);
      } catch (e) {
        Toast.show({ type: "error", text1: "Ошибка при загрузке резюме" });
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchResumesData();
  }, []);

  return { resumes, loading };
};
