import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

interface ProtectedRouteProps {
  requiredRole: string | string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [redirectPath, setRedirectPath] = useState<string>("/login");
  const navigation = useNavigation<any>(); // Добавление типа для navigation

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const { data: user } = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        await AsyncStorage.setItem("user", JSON.stringify(user));

        if (requiredRole) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          if (!roles.includes(user.role)) {
            Toast.show({ type: "error", text1: "У вас нет доступа!" });
            setRedirectPath("/"); 
            setAuthorized(false);
            return;
          }
        }

        setAuthorized(true);
      } catch (err) {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  if (authorized === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (!authorized) {
    navigation.navigate(redirectPath);
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Добро пожаловать! Вы авторизованы.</Text>
    </View>
  );
};

export default ProtectedRoute;
