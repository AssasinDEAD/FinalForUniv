import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // React Navigation
import { useVacancy } from "../../../hooks/vacancy/useVacancy"; // Кастомный хук для работы с вакансией

const VacancyFormPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {}; // Получаем параметр id из маршрута

  const {
    form,
    handleChange,
    handleRequirementsChange,
    requirementsInput,
    handleSubmit,
    isEdit,
    isLoading,
  } = useVacancy(id);

  const onSubmit = async () => {
    await handleSubmit();
    navigation.navigate("Vacancies"); // Переход к списку вакансий
  };

  if (isLoading) return <Text>Загрузка...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEdit ? "Редактировать вакансию" : "Создать вакансию"}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Название"
        value={form.title}
        onChangeText={(text) => handleChange("title", text)}
      />
      
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Описание"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
        multiline
      />
      
      <TextInput
        style={styles.input}
        placeholder="Требования (через запятую)"
        value={requirementsInput}
        onChangeText={handleRequirementsChange}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Локация"
        value={form.location}
        onChangeText={(text) => handleChange("location", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Зарплата"
        value={form.salary}
        onChangeText={(text) => handleChange("salary", text)}
      />
      
      <Button title={isEdit ? "Сохранить" : "Создать"} onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  textarea: {
    height: 100,
  },
});

export default VacancyFormPage;
