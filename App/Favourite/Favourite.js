import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import SERVER from "../../constants/server";

const Favourite = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleRegisterNow = async () => {
    setLoading(true);

    const url = `${SERVER.primaryUrl}/job/save`;

    const jobData = {
      job_title: "Geceptionist",
      job_category: "Marketing",
      job_address: "123 Main Street, Kathmandu",
      job_company_name: "KTM Consulting",
      job_experience: "1 year",
      job_max_salary: 30000,
      job_min_salary: 15000,
      job_slug: "receptionist-marketing-ktm-consulting",
      job_status: "Open",
      job_contact: "9816188459",
      job_validity: "2024-05-20",
      job_description:
        "This is the job description for a receptionist position at KTM Consulting. The candidate will be responsible for managing the front desk and handling client inquiries.",
      job_type: "Part Time",
      job_hour: "1pm-9pm",
    };

    console.log("Sending job data:", jobData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Job registration successful", json);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRegisterNow} disabled={loading}>
        <Text style={styles.buttonText}>Register Now</Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator size="large" color="#39B68D" style={styles.activityIndicator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#007260",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default Favourite;
