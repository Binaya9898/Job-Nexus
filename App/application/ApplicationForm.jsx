import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import COLORS from "../../constants/colors"; // Import your colors

export default function ApplicationForm({ route }) {
  const { job, employeeData } = route.params;

  const [name] = useState(employeeData?.employee_name || "");
  const [email] = useState(employeeData?.employee_email || "");
  const [address] = useState(employeeData?.employee_address || "");
  const [contact] = useState(employeeData?.employee_contact || "");
  const [description] = useState(employeeData?.employee_description || "");
  const [cvUrl] = useState(employeeData?.employee_cv || "");

  const handleRegisterNow = () => {
    console.log("Employee ID:", employeeData.user_id);
    console.log("Job ID:", job.id);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Address:", address);
    console.log("Contact:", contact);
    console.log("Description:", description);
    console.log("CV URL:", cvUrl);

    Alert.alert(
      "Application Submitted",
      "Your application has been submitted successfully."
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>Application Confirmation</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.detailText}>{name}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.detailText}>{email}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.detailText}>{address}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Contact Number:</Text>
            <Text style={styles.detailText}>{contact}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Brief Description:</Text>
            <Text style={[styles.detailText, styles.multilineText]}>
              {description}
            </Text>
          </View>

          {cvUrl ? (
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Curriculum Vitae (CV):</Text>
              <TouchableOpacity
                onPress={() => {} /* Implement CV view action */}
                style={styles.cvPreview}
              >
                <Text style={styles.cvLinkText}>View CV</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={styles.note}>
            Note: If you need to update any information, please update your
            profile.
          </Text>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegisterNow}
          >
            <Text style={styles.submitButtonText}>Confirm Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.primary,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.black,
  },
  multilineText: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  cvPreview: {
    backgroundColor: COLORS.lightGrey,
    padding: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  cvLinkText: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: "center",
  },
  note: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 20,
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
