import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import SERVER from "../../constants/server"; // Assuming you have a server constant

const CompleteProfileScreen = () => {
  const [formData, setFormData] = useState({
    employee_address: "",
    employee_description: "",
    employee_education: "",
    employee_work_experience: "",
    employee_participation: "",
    employee_training: "",
    employee_fb_link: "",
    employee_linkedin_link: "",
    // Add more fields as per your model
  });

  const handleChangeText = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${SERVER.primaryUrl}/employee/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to complete profile");
      }

      Alert.alert("Success", "Profile completed successfully");
      // Navigate to next screen or home screen after profile completion
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.employee_address}
        onChangeText={(text) => handleChangeText("employee_address", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.employee_description}
        onChangeText={(text) => handleChangeText("employee_description", text)}
      />
      {/* Add more input fields for other attributes */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Complete Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007260",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CompleteProfileScreen;
