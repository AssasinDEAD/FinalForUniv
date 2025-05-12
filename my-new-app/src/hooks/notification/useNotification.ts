import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";

// Интерфейс для формы уведомления
interface NotificationForm {
  title: string;
  content: string;
  imageUrl: string;
}

// Интерфейс для файла изображения
interface ImageFile {
  uri: string;
  type: string;
  name: string;
}

export const useNotification = (id: string | null) => {
  const [form, setForm] = useState<NotificationForm>({
    title: "",
    content: "",
    imageUrl: "", // Опционально для консистентности
  });
  const [imageFile, setImageFile] = useState<ImageFile | null>(null); // Тип для imageFile
  const [isEdit, setIsEdit] = useState(!!id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Запрос на получение уведомления по ID
      axios
        .get(`http://localhost:3000/notifications/${id}`)
        .then((response) => {
          setForm(response.data);
          setIsEdit(true);
        })
        .catch(() => Toast.show({ type: "error", text1: "Ошибка при загрузке оповещения" }))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", quality: 1 },
      (response) => {
        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          setImageFile({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName || "image.jpg", // Используем имя файла или задаем дефолтное
          });
        }
      }
    );
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);

      if (imageFile) {
        formData.append("image", {
          uri: imageFile.uri,
          type: imageFile.type,
          name: imageFile.name,
        });
      }

      const token = await AsyncStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Если это редактирование, то отправляем PUT запрос, иначе POST
      if (isEdit && id) {
        await axios.put(`http://localhost:3000/notifications/${id}`, formData, { headers });
        Toast.show({ type: "success", text1: "Оповещение обновлено" });
      } else {
        await axios.post("http://localhost:3000/notifications", formData, { headers });
        Toast.show({ type: "success", text1: "Оповещение создано" });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Ошибка при сохранении" });
    }
  };

  return {
    form,
    isEdit,
    isLoading,
    handleChange,
    handleFileChange,
    handleSubmit,
    imageFile,
  };
};
