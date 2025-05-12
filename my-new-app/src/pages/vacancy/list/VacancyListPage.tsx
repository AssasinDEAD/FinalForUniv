import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useUserRole } from "../../../hooks/useUserRole"; // Кастомный хук для роли пользователя
import { useVacancies } from "../../../hooks/vacancy/useVacancies"; // Кастомный хук для вакансий

const VacancyListPage = () => {
  const [search, setSearch] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(true);
  const role = useUserRole();
  const { vacancies, isLoading } = useVacancies(role, showMyVacancies);

  const filteredVacancies = vacancies.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Вакансии</Text>
        {role === "company" && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {/* navigate to create vacancy page */}}>
              <Text style={styles.buttonText}>Создать вакансию</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={() => setShowMyVacancies(!showMyVacancies)}
            >
              <Text style={styles.buttonText}>
                {showMyVacancies ? "Показать все вакансии" : "Показать мои вакансии"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по названию или описанию..."
        value={search}
        onChangeText={setSearch}
      />

      {isLoading ? (
        <Text>Загрузка...</Text>
      ) : filteredVacancies.length === 0 ? (
        <Text>Вакансии не найдены</Text>
      ) : (
        <FlatList
          data={filteredVacancies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.vacancyItem}>
              <Text style={styles.vacancyTitle}>{item.title}</Text>
              <Text style={styles.vacancyInfo}>
                {item.location} — {item.salary}
              </Text>
              <Text style={styles.vacancyDescription}>{item.description.slice(0, 100)}...</Text>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => {/* navigate to vacancy details page */}}
              >
                <Text style={styles.viewDetailsButtonText}>Подробнее</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  vacancyItem: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  vacancyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  vacancyInfo: {
    color: "gray",
    fontSize: 14,
  },
  vacancyDescription: {
    color: "gray",
  },
  viewDetailsButton: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  viewDetailsButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default VacancyListPage;
