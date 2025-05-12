import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { useResume } from "../../../hooks/resume/useResume";

const ResumePage = () => {
  const {
    resume,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    addItem,
    removeItem,
    saveResume,
    loading,
  } = useResume();

  if (loading) {
    return <Text style={styles.loader}>Загрузка...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Личный кабинет</Text>
      <Button
        title={isEditing ? "Просмотр" : "Редактировать"}
        onPress={() => setIsEditing(!isEditing)}
      />

      {isEditing ? (
        <View>
          <Text style={styles.sectionHeader}>Опыт работы</Text>
          <FlatList
            data={formData?.experience}
            renderItem={({ item, index }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Компания"
                  value={item.company}
                  onChangeText={(text) => handleChange({ target: { name: "company", value: text } }, "experience", index)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Должность"
                  value={item.position}
                  onChangeText={(text) => handleChange({ target: { name: "position", value: text } }, "experience", index)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Длительность"
                  value={item.duration}
                  onChangeText={(text) => handleChange({ target: { name: "duration", value: text } }, "experience", index)}
                />
                <Button title="Удалить" onPress={() => removeItem("experience", index)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Добавить опыт" onPress={() => addItem("experience", { company: "", position: "", duration: "" })} />

          <Text style={styles.sectionHeader}>Навыки</Text>
          <FlatList
            data={formData?.skills}
            renderItem={({ item, index }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Название"
                  value={item.name}
                  onChangeText={(text) => handleChange({ target: { name: "name", value: text } }, "skills", index)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Уровень"
                  value={item.level}
                  onChangeText={(text) => handleChange({ target: { name: "level", value: text } }, "skills", index)}
                />
                <Button title="Удалить" onPress={() => removeItem("skills", index)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Добавить навык" onPress={() => addItem("skills", { name: "", level: "" })} />

          <Text style={styles.sectionHeader}>Языки</Text>
          <FlatList
            data={formData?.languages}
            renderItem={({ item, index }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Язык"
                  value={item.name}
                  onChangeText={(text) => handleChange({ target: { name: "name", value: text } }, "languages", index)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Уровень"
                  value={item.proficiency}
                  onChangeText={(text) => handleChange({ target: { name: "proficiency", value: text } }, "languages", index)}
                />
                <Button title="Удалить" onPress={() => removeItem("languages", index)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Добавить язык" onPress={() => addItem("languages", { name: "", proficiency: "" })} />

          <Text style={styles.sectionHeader}>Дополнительная информация</Text>
          <TextInput
            style={styles.textarea}
            multiline
            value={formData?.additionalInfo}
            onChangeText={(text) =>
              handleChange(
                { target: { name: "additionalInfo", value: text } },
                "additionalInfo", // Field name
                null // Index is not required for non-array fields
              )
            }
          />

          <Button title="Сохранить" onPress={saveResume} />
        </View>
      ) : (
        <View>
          <Text style={styles.sectionHeader}>Опыт работы</Text>
          {resume?.experience?.length ? (
            resume.experience.map((exp, index) => (
              <View key={index} style={styles.item}>
                <Text><Text style={styles.bold}>Компания:</Text> {exp.company}</Text>
                <Text><Text style={styles.bold}>Должность:</Text> {exp.position}</Text>
                <Text><Text style={styles.bold}>Длительность:</Text> {exp.duration}</Text>
              </View>
            ))
          ) : (
            <Text>Нет данных</Text>
          )}

          <Text style={styles.sectionHeader}>Навыки</Text>
          {resume?.skills?.length ? (
            resume.skills.map((skill, index) => (
              <Text key={index}>
                <Text style={styles.bold}>{skill.name}</Text>: {skill.level}
              </Text>
            ))
          ) : (
            <Text>Нет данных</Text>
          )}

          <Text style={styles.sectionHeader}>Языки</Text>
          {resume?.languages?.length ? (
            resume.languages.map((lang, index) => (
              <Text key={index}>
                <Text style={styles.bold}>{lang.name}</Text>: {lang.proficiency}
              </Text>
            ))
          ) : (
            <Text>Нет данных</Text>
          )}

          <Text style={styles.sectionHeader}>Дополнительная информация</Text>
          <Text>{resume?.additionalInfo?.trim() ? resume.additionalInfo : "Нет данных"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
  textarea: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    height: 100,
  },
  bold: {
    fontWeight: "bold",
  },
  item: {
    marginBottom: 8,
  },
  loader: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default ResumePage;
