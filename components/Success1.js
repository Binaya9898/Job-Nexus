import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const Success1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, description, navigation1, buttonText1 } = route.params;

  const handleBtn1 = () => {
    navigation.navigate(navigation1);
  };

  return (
    <LinearGradient
      style={{ flex: 1, height: "50%" }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={styles.container}>
        <Image style={styles.icon} source={require("../assets/tick.png")} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={handleBtn1}
        >
          <Text style={styles.buttonText}>{buttonText1}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Success1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007260",
    alignItems: "center",
    paddingTop: 150,
  },
  icon: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 22,
    color: "#FFFFFF",
  },
  description: {
    marginTop: 20,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    margin: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#121212",
    fontSize: 20,
  },
});
