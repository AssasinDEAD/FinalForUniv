import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Resume } from "../../types/resume";
import { getResume, updateResume } from "../../services/resumeService";

export const useResume = () => {
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userResume = await getResume(token);
        setResume(userResume);
        setFormData(userResume);
      } catch (error) {
        Toast.show({ type: "error", text1: "Ошибка загрузки резюме" });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleChange = (e, field, index) => {
    if (!formData) return;

    setFormData((prev) => {
      if (!prev) return prev;
      if (Array.isArray(prev[field])) {
        return {
          ...prev,
          [field]: prev[field].map((item, i) =>
            i === index ? { ...item, [e.target.name]: e.target.value } : item
          ),
        };
      } else {
        return {
          ...prev,
          [field]: e.target.value,
        };
      }
    });
  };

  const addItem = (field, newItem) => {
    if (!formData) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], newItem],
    }));
  };

  const removeItem = (field, index) => {
    if (!formData) return;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const saveResume = async () => {
    if (!formData) return;

    try {
      const token = await AsyncStorage.getItem("token");
      await updateResume(token, formData);
      Toast.show({ type: "success", text1: "Резюме обновлено" });
      setResume(formData);
      setIsEditing(false);
      navigation.goBack(); // Go back after saving
    } catch (error) {
      Toast.show({ type: "error", text1: "Ошибка при обновлении резюме" });
      console.error(error);
    }
  };

  return {
    resume,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    addItem,
    removeItem,
    saveResume,
    loading,
  };
};
