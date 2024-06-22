import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import COLORS from "../../constants/colors"; // Import your colors

export default function ApplicationForm({ route }) {
  const { job, employeeData } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  // Populate the form fields once the component mounts
  useEffect(() => {
    if (employeeData) {
      setName(employeeData.employee_name || "name not fetched");
      setEmail(employeeData.employee_email || "");
      setAddress(employeeData.employee_address || "");
      setContact(employeeData.employee_contact || "");
      setDescription(employeeData.employee_description || "");
    }
  }, [employeeData]);

  const handleRegisterNow = () => {
    console.log("Employee ID:", employeeData.user_id);
    console.log("Job ID:", job.id);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Address:", address);
    console.log("Contact:", contact);
    console.log("Description:", description);

    Alert.alert(
      "Application Submitted",
      "Your application has been submitted successfully."
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              color: COLORS.primary,
              textAlign: "center",
            }}
          >
            Application Form
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              placeholder="Name"
              placeholderTextColor={COLORS.grey}
              value={name}
              onChangeText={setName}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
            />
          </View>

          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.grey}
            value={email}
            style={styles.input}
            editable={false}
          />

          <TextInput
            placeholder="Address"
            placeholderTextColor={COLORS.grey}
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            multiline
          />

          <TextInput
            placeholder="Contact"
            placeholderTextColor={COLORS.grey}
            value={contact}
            onChangeText={setContact}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            placeholderTextColor={COLORS.grey}
            value={description}
            onChangeText={setDescription}
            style={[
              styles.input,
              { height: 100, textAlignVertical: "top", marginTop: 20 },
            ]}
            multiline
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegisterNow}
          >
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
