import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SERVER from "../../constants/server";

const EmployerSignup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const handleRegisterNow = () => {
    if (!name || !email || !password || !contact) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Validate password criteria
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      Alert.alert(
        "Password Requirements",
        "Password must be at least 8 characters long, contain at least one uppercase letter, and one number."
      );
      return;
    }

    // Validate phone number
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(contact)) {
      Alert.alert(
        "Phone Number Requirements",
        "Phone number must be exactly 10 digits."
      );
      return;
    }

    setLoading(true);

    const employerData = {
      name,
      email,
      password,
      contact,
      role,
    };

    fetch(`${SERVER.primaryUrl}/user/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employerData),
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        setLoading(false);
        console.log("User Added Successfully", data);
        Alert.alert("Added Successfully");

        // Extract user_id from the response data
        const { id } = data;
        console.log("Id should be: " + id);

        // Pass user_id to CompleteEmployerProfile
        navigation.navigate("CompleteEmployerProfile", { id });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        Alert.alert("Error", "Failed to register employer.");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.gradientBackground}
        >
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Employer Registration</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Name *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setName(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Email *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Password *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Confirm Password *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Contact"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setContact(text)}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>

            <Button
              title={loading ? "Registering..." : "Register Now"}
              onPress={handleRegisterNow}
              filled
              disabled={loading}
              style={{ marginTop: 20 }}
            />
          </View>
        </LinearGradient>
      </ScrollView>
      {loading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmployerSignup;
