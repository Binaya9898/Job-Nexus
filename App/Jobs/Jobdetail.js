import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert, // Import Alert from react-native
} from "react-native";
import moment from "moment";
import SERVER from "../../constants/server";

export default function JobDetail({ route }) {
  const { job } = route.params;
  const formattedDate = moment(job.created_at).format("YYYY-MM-DD");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [jobID] = useState(job.id); // Directly use job.id
  const empId = 10;

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to wishlist");
      }
      Alert.alert("Success", "Job added to favorites"); // Use correct method to show success

      return await response.json();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{job.job_title}</Text>
        </View>

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>Job Details</Text>

          <Text style={styles.postDescription}>
            <Text style={styles.label}>Category: </Text>
            {job.job_category}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Company: </Text>
            {job.job_company_name}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Location: </Text>
            {job.job_address}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Experience: </Text>
            {job.job_experience}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Salary: </Text>${job.job_min_salary} - $
            {job.job_max_salary}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Type: </Text>
            {job.job_type}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Hours: </Text>
            {job.job_hour}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Contact: </Text>
            {job.job_contact}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Validity: </Text>
            {job.job_validity}
          </Text>

          <View>
            <Text style={styles.label}>Description: </Text>
            <Text style={styles.postDescription}>
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

          <Text style={styles.date}>Posted on: {formattedDate}</Text>

          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: `${SERVER.imageUrl}/images/employer/profile/${job.image}`,
              }}
            />
            <Text style={styles.name}>{job.empName}</Text>
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Apply</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton2} onPress={addToWishlist}>
            <Text style={styles.shareButtonText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#007260",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
  },
  date: {
    color: "#696969",
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#007260",
  },
  profile: {
    flexDirection: "row",
    marginTop: 20,
  },
  name: {
    fontSize: 16,
    color: "#007260",
    fontWeight: "600",
    alignSelf: "center",
    marginLeft: 10,
  },
  shareButton: {
    marginTop: 10,
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#007260",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    paddingVertical: 10,
  },
  shareButton2: {
    marginTop: 10,
    marginLeft: 50,
    height: 65,
    width: 250,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#007260",
  },
  toggleText: {
    color: "#007260",
    fontWeight: "bold",
    marginTop: 5,
  },
});
