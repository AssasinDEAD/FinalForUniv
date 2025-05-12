import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useResumes } from "../../../hooks/resume/useResumes";

const ResumeListPage = ({ navigation }) => {
  const { resumes, loading } = useResumes();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      resumes.filter(
        (r) =>
          (r.User?.name?.toLowerCase().includes(q) ?? false) ||
          (r.skills?.some((s) => s?.name?.toLowerCase().includes(q)) ?? false) ||
          (r.languages?.some((l) => l?.name?.toLowerCase().includes(q)) ?? false)
      )
    );
  }, [search, resumes]);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Все резюме</Text>
      <TextInput
        style={styles.input}
        placeholder="Поиск по имени, навыкам или языкам..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.User?.name ?? "Без имени"}</Text>
            <Text>
              <Text style={styles.bold}>Навыки: </Text>
              {Array.isArray(item.skills) && item.skills.length > 0
                ? item.skills.map((s) => s?.name ?? "Без названия").join(", ")
                : "Нет"}
            </Text>

            <Text>
              <Text style={styles.bold}>Языки: </Text>
              {Array.isArray(item.languages) && item.languages.length > 0
                ? item.languages.map((l) => l?.name ?? "Без названия").join(", ")
                : "Нет"}
            </Text>

            <Button
              title="Подробнее"
              onPress={() => navigation.navigate("ResumeDetails", { id: item.id })}
            />
          </View>
        )}
      />
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
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResumeListPage;
