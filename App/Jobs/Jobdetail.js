import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function JobDetail({ route }) {
  const { job } = route.params;

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
            <Text style={styles.label}>Status: </Text>
            {job.job_status}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Contact: </Text>
            {job.job_contact}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Validity: </Text>
            {job.job_validity}
          </Text>
          <Text style={styles.postDescription}>
            <Text style={styles.label}>Description: </Text>
            {job.job_description}
          </Text>

          <Text style={styles.date}>Posted on: {job.created_at}</Text>

          <View style={styles.profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
              }}
            />
            <Text style={styles.name}>Company Representative</Text>
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Applyy</Text>
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
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#007260",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
