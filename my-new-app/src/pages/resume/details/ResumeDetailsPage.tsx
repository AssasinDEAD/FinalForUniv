import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useResumeDetails } from "../../../hooks/resume/useResumeDetails";

const ResumeDetailsPage = ({ route }) => {
  const { id } = route.params; // Получаем ID из маршрута
  const { resume, loading } = useResumeDetails(id);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  if (!resume) return <Text style={styles.errorText}>Резюме не найдено.</Text>;

  const renderList = (data, title) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>
              {item.name || item.position} — {item.level || item.company || item.proficiency}
            </Text>
          )}
        />
      ) : (
        <Text>Нет данных</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Резюме пользователя: {resume.User?.name || "Нет имени"}
      </Text>

      {renderList(resume.skills, "Навыки")}
      {renderList(resume.experience, "Опыт работы")}
      {renderList(resume.languages, "Языки")}

      {resume.additionalInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дополнительная информация</Text>
          <Text>{resume.additionalInfo || "Нет информации"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResumeDetailsPage;
