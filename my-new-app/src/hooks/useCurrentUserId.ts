import { useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCurrentUserId = () => {
  return useMemo(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return null;

      try {
        const payload = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString("utf8")
        );
        return payload.id;
      } catch {
        console.error("Не удалось декодировать токен");
        return null;
      }
    };

    return fetchUserId();
  }, []);
};
