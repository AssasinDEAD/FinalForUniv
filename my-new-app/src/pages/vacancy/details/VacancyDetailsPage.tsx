import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useVacancyDetails } from "../../../hooks/vacancy/useVacancyDetails";
import { useCurrentUserId } from "../../../hooks/useCurrentUserId";
import { deleteVacancy } from "../../../services/vacancyService";
import Toast from "react-native-toast-message";

// Определите типы для навигации
type RootStackParamList = {
  Vacancies: undefined;
  EditVacancy: { id: string };
  VacancyDetails: { id: string };
};

type VacancyDetailsRouteProp = RouteProp<RootStackParamList, "VacancyDetails">;
type VacancyDetailsNavigationProp = StackNavigationProp<RootStackParamList, "VacancyDetails">;

interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  userId?: string;
}

const VacancyDetailsPage = () => {
  const route = useRoute<VacancyDetailsRouteProp>();
  const navigation = useNavigation<VacancyDetailsNavigationProp>();
  const { id } = route.params;
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
            Toast.show({
              type: "success",
              text1: "Вакансия удалена",
            });
            navigation.navigate("Vacancies");
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Ошибка при удалении вакансии",
            });
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("EditVacancy", { id });
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