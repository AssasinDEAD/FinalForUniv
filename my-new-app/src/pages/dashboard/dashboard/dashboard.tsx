import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

const Dashboard = () => {
  const { user } = useCurrentUser();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Личный кабинет</Text>
      {user && <Text style={styles.welcomeText}>Добро пожаловать, {user.name}!</Text>}

      <View style={styles.nav}>
        {["student", "career_center", "admin"].includes(user?.role || "") && (
          <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to notifications */ }}>
            <Text style={styles.linkText}>Оповещении</Text>
          </TouchableOpacity>
        )}

        {user?.role === "student" && (
          <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to myResume */ }}>
            <Text style={styles.linkText}>Мое резюме</Text>
          </TouchableOpacity>
        )}

        {user?.role === "admin" && (
          <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to newUser */ }}>
            <Text style={styles.linkText}>Новый пользователь</Text>
          </TouchableOpacity>
        )}

        {["career_center", "company"].includes(user?.role || "") && (
          <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to resumes */ }}>
            <Text style={styles.linkText}>Резюме студентов</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to vacancies */ }}>
          <Text style={styles.linkText}>Вакансии</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to settings */ }}>
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
