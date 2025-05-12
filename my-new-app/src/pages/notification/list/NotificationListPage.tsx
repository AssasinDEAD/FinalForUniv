import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useNotifications } from "../../../hooks/notification/useNotifications";

const BASE_URL = "http://localhost:3000";

const NotificationListPage = ({ navigation }) => {
  const { user } = useCurrentUser();
  const { notifications, loading } = useNotifications();

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;

  const handleNavigateToDetails = (id) => {
    navigation.navigate("NotificationDetails", { id });
  };

  const handleCreateNotification = () => {
    if (user?.role === "career_center") {
      navigation.navigate("NotificationForm");
    } else {
      Alert.alert("Доступ запрещен", "Вы не имеете прав для создания оповещений.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      {item.imageUrl ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}${item.imageUrl}` }}
            style={styles.image}
          />
          <View style={styles.overlay} />
          <View style={styles.textOverlay}>
            <TouchableOpacity onPress={() => handleNavigateToDetails(item.id)}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.notificationDate}>
              {new Date(item.created_at || "").toLocaleString()}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => handleNavigateToDetails(item.id)}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
          </TouchableOpacity>
          <Text style={styles.notificationDate}>
            {new Date(item.created_at || "").toLocaleString()}
          </Text>
        </View>
      )}
      <Text style={styles.contentPreview}>
        {item.content.slice(0, 100)}...
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Оповещения</Text>
        {user?.role === "career_center" && (
          <TouchableOpacity style={styles.createButton} onPress={handleCreateNotification}>
            <Text style={styles.createButtonText}>Создать оповещение</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
  },
  notificationCard: {
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  notificationDate: {
    fontSize: 12,
    color: "white",
  },
  textContainer: {
    padding: 10,
  },
  contentPreview: {
    fontSize: 14,
    color: "#555",
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationListPage;
