import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from "react-native";
import { useNotification } from "../../../hooks/notification/useNotification";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Определите типы для навигации
type RootStackParamList = {
  Notifications: undefined;
  NotificationForm: { id?: string };
};

type NotificationFormRouteProp = RouteProp<RootStackParamList, "NotificationForm">;
type NotificationFormNavigationProp = StackNavigationProp<RootStackParamList, "NotificationForm">;

interface Props {
  navigation: NotificationFormNavigationProp;
  route: NotificationFormRouteProp;
}

const NotificationFormPage: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params || {};
  const { form, handleChange, handleFileChange, handleSubmit, isEdit, isLoading } = useNotification(id);

  const onSubmit = async () => {
    try {
      await handleSubmit();
      navigation.navigate("Notifications");
    } catch (err) {
      Alert.alert("Ошибка", "Не удалось создать/сохранить оповещение");
    }
  };

  // Адаптация handleChange для React Native
  const handleTextChange = (fieldName: string) => (text: string) => {
    handleChange({ 
      target: { 
        name: fieldName, 
        value: text 
      } 
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isEdit ? "Редактировать оповещение" : "Создать оповещение"}
      </Text>
      
      {isLoading ? (
        <Text>Загрузка...</Text>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            value={form.title}
            onChangeText={handleTextChange("title")}
            placeholder="Заголовок"
          />
          <TextInput
            style={styles.textarea}
            value={form.content}
            onChangeText={handleTextChange("content")}
            placeholder="Сообщение"
            multiline
            numberOfLines={5}
          />
          <Button 
            title="Выбрать изображение" 
            onPress={handleFileChange} 
          />
          {form.imageUrl && (
            <Image 
              source={{ uri: form.imageUrl }} 
              style={styles.image} 
            />
          )}
          <Button 
            title={isEdit ? "Сохранить" : "Создать"} 
            onPress={onSubmit} 
            color="#007BFF" 
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
    textAlignVertical: "top",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 15,
    alignSelf: "center",
  },
});

export default NotificationFormPage;