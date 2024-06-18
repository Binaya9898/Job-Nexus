import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import BackButton from "../../constants/BackButton";

// Ensure you have the correct path to your image
// const forgotPasswordImage = require("./assets/images/forgot_password.png");

const Forgotpw = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleRecoverPassword = () => {
    // Handle password recovery logic
    navigation.navigate("Recoverotp");
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      {/* <Image source={forgotPasswordImage} style={styles.image} /> */}
      <Image
        source={{
          uri: "https://assets-global.website-files.com/6414ce4dcbfbc306cd05cebb/6414ce4dcbfbc3387605dc9f_SOC2-Banner-800x357_short.gif",
        }} // Replace with your actual image URL
        style={styles.image}
      />
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.subHeader}>
        Enter the email address associated with your account.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
        <Text style={styles.buttonText}>Send Verification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,

    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007260",
    marginBottom: 20,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#007260",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#007260",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007260",
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Forgotpw;
