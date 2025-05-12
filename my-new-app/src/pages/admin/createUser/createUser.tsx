import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useCreateUserForm } from "../../../hooks/admin/useCreateUserForm";

const CreateUser = () => {
  const { formData, handleChange, handleSubmit } = useCreateUserForm();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Добавить нового пользователя</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={formData.name}
        onChangeText={(text) => handleChange({ target: { name: "name", value: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange({ target: { name: "email", value: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange({ target: { name: "password", value: text } })}
      />
      <Picker
        selectedValue={formData.role}
        style={styles.input}
        onValueChange={(itemValue) =>
          handleChange({ target: { name: "role", value: itemValue } })
        }
      >
        <Picker.Item label="Студент" value="student" />
        <Picker.Item label="Компания" value="company" />
        <Picker.Item label="Центр карьеры" value="career_center" />
        <Picker.Item label="Админ" value="admin" />
      </Picker>
      <Button title="Добавить пользователя" onPress={handleSubmit} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});

export default CreateUser;
