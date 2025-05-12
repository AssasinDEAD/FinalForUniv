import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useNotificationDetails } from "../../../hooks/notification/useNotificationDetails";

const NotificationDetailsPage = () => {
  const { notification, role, handleDelete, handleEdit } = useNotificationDetails();

  if (!notification) {
    return <Text style={styles.message}>Оповещение не найдено</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.date}>
        Создано: {new Date(notification.created_at || "").toLocaleString()}
      </Text>
      <Text style={styles.content}>{notification.content}</Text>

      {role === "career_center" && (
        <View style={styles.buttonsContainer}>
          <Button
            title="Редактировать"
            onPress={handleEdit}
            color="#007BFF"
          />
          <Button
            title="Удалить"
            onPress={() => {
              Alert.alert(
                "Подтверждение",
                "Вы уверены, что хотите удалить это оповещение?",
                [
                  { text: "Отмена" },
                  { text: "Удалить", onPress: handleDelete },
                ]
              );
            }}
            color="#FF0000"
          />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NotificationDetailsPage;
