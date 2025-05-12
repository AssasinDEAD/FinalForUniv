import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Добро пожаловать в Job Portal.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Text style={styles.link}>Перейти в личный кабинет</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  link: {
    fontSize: 18,
    color: "#007BFF",
  },
});

export default Home;
