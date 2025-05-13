import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Для навигации
import { useAuth } from "../../../contexts/AuthContext"; // Хук для получения данных пользователя

const Dashboard = () => {
  const { user } = useAuth(); // Получаем текущего пользователя
  const navigation = useNavigation(); // Получаем объект навигации

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Личный кабинет</Text>
      {user && <Text style={styles.welcomeText}>Добро пожаловать, {user.name}!</Text>}

      <View style={styles.nav}>
        {/* Оповещения для всех ролей */}
        {["student", "career_center"].includes(user?.role || "") && (
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("NotificationList")} // Переход на страницу с оповещениями
          >
            <Text style={styles.linkText}>Оповещении</Text>
          </TouchableOpacity>
        )}

        {/* Резюме для студента */}
        {user?.role === "student" && (
          <>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate("MyResume")} // Переход на страницу "Мое резюме"
            >
              <Text style={styles.linkText}>Мое резюме</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate("MyResponses")} // Переход на страницу "Мое отклики"
            >
              <Text style={styles.linkText}>Мое отклики</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Новый пользователь для админа */}
        {user?.role === "admin" && (
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("CreateUser")} // Переход на страницу создания пользователя
          >
            <Text style={styles.linkText}>Новый пользователь</Text>
          </TouchableOpacity>
        )}

        {/* Резюме для компаний и карьерных центров */}
        {["career_center", "company"].includes(user?.role || "") && (
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("ResumeList")} // Переход на страницу резюме студентов
          >
            <Text style={styles.linkText}>Резюме студентов</Text>
          </TouchableOpacity>
        )}

        {/* Вакансии для всех */}
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("VacancyList")} // Переход на страницу вакансий
        >
          <Text style={styles.linkText}>Вакансии</Text>
        </TouchableOpacity>

        {/* Настройки для всех */}
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Settings")} // Переход на страницу настроек
        >
          <Text style={styles.linkText}>Настройки</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  nav: {
    marginTop: 20,
  },
  link: {
    marginBottom: 15,
    padding: 10,
  },
  linkText: {
    fontSize: 18,
    color: "#007BFF",
  },
});

export default Dashboard;
