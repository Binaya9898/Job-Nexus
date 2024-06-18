import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SERVER from "../../../constants/server";

export default function FavoriteJobs({ navigation }) {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const empId = 2; // Ensure empId is correct

  useEffect(() => {
    fetchFavoriteJobs();
  }, []);

  const fetchJobDetails = async (jobId) => {
    const response = await fetch(`${SERVER.primaryUrl}/job/detail/${jobId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for job ID: ${jobId}`);
    }
    return await response.json();
  };

  const fetchFavoriteJobs = async () => {
    try {
      const response = await fetch(`${SERVER.primaryUrl}/wishlist/${empId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorite jobs");
      }
      const data = await response.json();
      const favoriteJobsArray = Object.values(data);

      // Fetch details for each job
      const detailedJobs = await Promise.all(
        favoriteJobsArray.map(async (item) => {
          const jobDetails = await fetchJobDetails(item.job_id);
          return { ...item, ...jobDetails }; // Merge job details with original item
        })
      );

      console.log("Detailed Favorite Jobs Array:", detailedJobs);
      setFavoriteJobs(detailedJobs);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const removeFromWishlist = async (jobId) => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/wishlist/${jobId}/${empId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        // Log the error for debugging but allow the UI to update
        console.error(
          `Failed to remove job with ID: ${jobId}. Error: ${errorData.message}`
        );
      } else {
        Alert.alert("Removed", "Job removed from favorites");
      }
    } catch (error) {
      console.error(
        `Failed to remove job with ID: ${jobId}. Error: ${error.message}`
      );
    } finally {
      // Fetch the updated list of favorite jobs regardless of success or failure
      fetchFavoriteJobs();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Jobs</Text>
      </View>
      {favoriteJobs.length === 0 ? (
        <Text style={styles.emptyText}>No favorite jobs found.</Text>
      ) : (
        favoriteJobs.map((job) => (
          <View key={job.job_id} style={styles.jobContainer}>
            <Image
              source={{
                uri: `${SERVER.imageUrl}/images/employer/profile/${job.image}`,
              }}
              style={styles.image}
            />
            <View style={styles.jobDetails}>
              <Text style={styles.jobTitle}>{job.job_title}</Text>
              <Text style={styles.jobCompany}>{job.job_company_name}</Text>
              <Text style={styles.jobLocation}>{job.job_address}</Text>
              <Text style={styles.salary}>
                ${job.job_min_salary} - ${job.job_max_salary}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => removeFromWishlist(job.job_id)}
            >
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  headerTitle: {
    paddingBottom: 25,
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  jobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  jobCompany: {
    color: "#555",
    marginBottom: 5,
  },
  jobLocation: {
    color: "#555",
  },
  salary: {
    marginTop: 5,
    color: "#007bff",
  },
  favoriteButton: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
});
