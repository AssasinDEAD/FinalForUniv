import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // Используем React Navigation для работы с роутингом в React Native
import { useVacancyDetails } from "../../../hooks/vacancy/useVacancyDetails";
import { useCurrentUserId } from "../../../hooks/useCurrentUserId";
import { deleteVacancy } from "../../../services/vacancyService";
import { toast } from "react-toastify"; // Toast, возможно, придется заменить на React Native аналог

const VacancyDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // В React Native для работы с параметрами роутинга используем useRoute
  const currentUserId = useCurrentUserId();
  const { vacancy, isLoading } = useVacancyDetails(id);

  const handleDelete = async () => {
    if (!id) return;
    Alert.alert("Подтверждение", "Вы уверены, что хотите удалить вакансию?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Удалить",
        onPress: async () => {
          try {
            await deleteVacancy(id);
            toast.success("Вакансия удалена");
            navigation.navigate("Vacancies"); // Перенаправление в список вакансий
          } catch (error) {
            toast.error("Ошибка при удалении вакансии");
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("EditVacancy", { id }); // Переход на страницу редактирования вакансии
  };

  if (isLoading) return <Text>Загрузка...</Text>;
  if (!vacancy) return <Text>Вакансия не найдена</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{vacancy.title}</Text>
      <Text><Text style={styles.bold}>Описание:</Text> {vacancy.description}</Text>
      <Text><Text style={styles.bold}>Требования:</Text> {vacancy.requirements.join(", ") || "Не указаны"}</Text>
      <Text><Text style={styles.bold}>Локация:</Text> {vacancy.location}</Text>
      <Text><Text style={styles.bold}>Зарплата:</Text> {vacancy.salary}</Text>

      {vacancy.userId === currentUserId && (
        <View style={styles.buttonContainer}>
          <Button title="Редактировать" onPress={handleEdit} color="#007bff" />
          <Button title="Удалить" onPress={handleDelete} color="#dc3545" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default VacancyDetailsPage;
