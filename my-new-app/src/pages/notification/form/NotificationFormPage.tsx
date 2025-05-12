import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from "react-native";
import { useNotification } from "../../../hooks/notification/useNotification";

const NotificationFormPage = ({ navigation }) => {
  const { id } = useParams(); // Для React Navigation понадобится другой способ получения параметров
  const { form, handleChange, handleFileChange, handleSubmit, isEdit, isLoading } = useNotification(id);

  const onSubmit = async () => {
    try {
      await handleSubmit();
      navigation.navigate("Notifications"); // Переход к списку уведомлений
    } catch (err) {
      Alert.alert("Ошибка", "Не удалось создать/сохранить оповещение");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{isEdit ? "Редактировать оповещение" : "Создать оповещение"}</Text>
      
      {isLoading ? (
        <Text>Загрузка...</Text>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            name="title"
            value={form.title}
            onChangeText={(text) => handleChange({ target: { name: "title", value: text } })}
            placeholder="Заголовок"
            required
          />
          <TextInput
            style={styles.textarea}
            name="content"
            value={form.content}
            onChangeText={(text) => handleChange({ target: { name: "content", value: text } })}
            placeholder="Сообщение"
            multiline
            numberOfLines={5}
            required
          />
          <Button title="Выбрать изображение" onPress={handleFileChange} />
          {form.imageUrl && <Image source={{ uri: form.imageUrl }} style={styles.image} />}
          <Button title={isEdit ? "Сохранить" : "Создать"} onPress={onSubmit} color="#007BFF" />
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  textarea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
    textAlignVertical: "top", // Для текста в верхней части
  },
  image: {
    maxWidth: 200,
    marginTop: 15,
  },
});

export default NotificationFormPage;
