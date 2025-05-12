import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserRole = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const payload = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString("utf8")
        );
        setRole(payload.role);
      } catch {
        console.error("Ошибка декодирования токена");
      }
    };

    fetchRole();
  }, []);

  return role;
};
