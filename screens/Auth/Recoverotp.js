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
import CustomAlert from "../../constants/CustomAlert";

const Recoverotp = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleVerifyCode = () => {
    // Handle code verification logic
    navigation.navigate("ResetPassword");
  };
  const handleResendCode = () => {
    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      {/* <Image source={forgotPasswordImage} style={styles.image} /> */}
      <Image
        source={{
          uri: "https://hawkemedia.com/_next/image/?url=https%3A%2F%2Fhawkeheadless.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F05%2FA-Simple-Guide-n-How-to-Include-Animation-in-your-Emails.gif&w=1920&q=75",
        }} // Replace with your actual image URL
        style={styles.image}
      />
      <Text style={styles.header}>Email Verification</Text>
      <Text style={styles.subHeader}>
        Please enter the 4 digit code that was sent to your email address.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter code"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
        maxLength={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verify and Proceed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendText}>Resend</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
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
  },
  subHeader: {
    fontSize: 16,
    color: "#007260",
    marginBottom: 20,
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
  resendText: {
    color: "#4A148C",
    textAlign: "center",
    marginTop: 15,
  },
});

export default Recoverotp;
