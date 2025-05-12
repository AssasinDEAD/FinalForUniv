import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useVacancy } from "../../../hooks/vacancy/useVacancy";

// Определите типы для навигации
type RootStackParamList = {
  Vacancies: undefined;
  VacancyForm: { id?: string };
};

type VacancyFormRouteProp = RouteProp<RootStackParamList, "VacancyForm">;
type VacancyFormNavigationProp = StackNavigationProp<RootStackParamList, "VacancyForm">;

interface VacancyFormProps {
  navigation: VacancyFormNavigationProp;
  route: VacancyFormRouteProp;
}

const VacancyFormPage: React.FC<VacancyFormProps> = ({ navigation, route }) => {
  const { id } = route.params || {};
  
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
    try {
      await handleSubmit();
      navigation.navigate("Vacancies");
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось сохранить вакансию");
    }
  };

  // Адаптер для handleChange
  const handleFieldChange = (field: keyof typeof form) => (text: string) => {
    handleChange({ 
      target: { 
        name: field, 
        value: text 
      } 
    } as React.ChangeEvent<HTMLInputElement>);
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
        onChangeText={handleFieldChange("title")}
      />
      
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Описание"
        value={form.description}
        onChangeText={handleFieldChange("description")}
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
        onChangeText={handleFieldChange("location")}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Зарплата"
        value={form.salary}
        onChangeText={handleFieldChange("salary")}
      />
      
      <Button 
        title={isEdit ? "Сохранить" : "Создать"} 
        onPress={onSubmit} 
      />
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
    textAlignVertical: "top",
  },
});

export default VacancyFormPage;