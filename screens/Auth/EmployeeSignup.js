import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SERVER from "../../constants/server";

const EmployeeSignup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
      valid = false;
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number";
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!contact.trim()) {
      errors.contact = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(contact)) {
      errors.contact = "Contact number must be exactly 10 digits";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleRegisterNow = () => {
    if (validate()) {
      setLoading(true);

      const employeeData = {
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
        body: JSON.stringify(employeeData),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          console.log("User Added Successfully", data);
          Alert.alert("Added Successfully");

          const { id } = data;
          console.log("Id should be: " + id);

          navigation.navigate("CompleteProfile", { id });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
          Alert.alert("Error", "Failed to register user.");
        });
    } else {
      Alert.alert("Error", "Please fix the errors in the form.");
    }
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
            <Text style={styles.title}>Job Seeker Registration</Text>

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
                editable={!loading} // Disable input while loading
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Email *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                keyboardType="email-address"
                editable={!loading} // Disable input while loading
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

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
                editable={!loading} // Disable input while loading
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

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
                editable={!loading} // Disable input while loading
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Contact *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setContact(text)}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={10}
                editable={!loading} // Disable input while loading
              />
            </View>
            {errors.contact && (
              <Text style={styles.errorText}>{errors.contact}</Text>
            )}

            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Button
                title="Register Now"
                onPress={handleRegisterNow}
                filled
                disabled={loading}
                style={{ marginTop: 20 }}
              />
            )}
          </View>
        </LinearGradient>
      </ScrollView>
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
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default EmployeeSignup;
