import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import SERVER from "../../constants/server";

export default function JobDetails({ route, navigation }) {
  const { job } = route.params;
  const formattedDate = moment(job.created_at).format("YYYY-MM-DD");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const jobID = job.id;
  const empId = "2"; // Replace with actual employee ID in a real scenario
  // const employerImage = job.employer.employer_image; // Assuming the structure is job.employer.employer_image

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const checkEmployeeExists = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/checkEmployee/${empId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking employee:", error);
      return null;
    }
  };

  const handleApply = async () => {
    const employee = await checkEmployeeExists();

    if (employee && employee.exists) {
      const response = await fetch(`${SERVER.primaryUrl}/employee/${empId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const employeeData = await response.json();

      if (employeeData) {
        navigation.navigate("ApplicationForm", {
          job,
          employeeData,
        });
      } else {
        Alert.alert("Error", "Failed to fetch employee data.");
      }
    } else {
      navigation.navigate("CompleteProfileScreen"); // Navigate to profile complete screen if profile is incomplete
    }
  };

  const addToWishlist = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/wishlist/save/${jobID}/${empId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Alert.alert("Success", "Job added to favorites");
      return await response.json();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{job.job_title}</Text>
      </View>

      <View style={styles.postContent}>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.info}>{job.job_category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.info}>{job.job_company_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.info}>{job.job_address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Experience:</Text>
            <Text style={styles.info}>{job.job_experience}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Salary:</Text>
            <Text style={styles.info}>
              ${job.job_min_salary} - ${job.job_max_salary}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.info}>{job.job_type}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Hours:</Text>
            <Text style={styles.info}>{job.job_hour}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.info}>{job.job_contact}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Validity:</Text>
            <Text style={styles.info}>{job.job_validity}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>
            {isDescriptionExpanded
              ? job.job_description
              : `${job.job_description.substring(0, 100)}...`}
          </Text>
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.toggleText}>
              {isDescriptionExpanded ? "Show less" : "Show more"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleApply}>
            <FontAwesome name="check-circle" size={24} color="#007260" />
            <Text style={styles.actionButtonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={addToWishlist}>
            <FontAwesome name="heart" size={24} color="#007260" />
            <Text style={styles.actionButtonText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingVertical: 20,
  },
  header: {
    backgroundColor: "#007260",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  postContent: {
    paddingHorizontal: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    width: 100,
  },
  info: {
    flex: 1,
  },
  descriptionContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  description: {
    lineHeight: 20,
    marginBottom: 10,
  },
  toggleText: {
    color: "#007260",
    fontWeight: "bold",
  },
  employerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  employerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  employerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#007260",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionButtonText: {
    color: "#007260",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
