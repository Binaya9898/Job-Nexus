import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { UserContext } from "../../constants/UserContext";

const Application = () => {
  const { userData } = useContext(UserContext);
  const userId = userData.user.id; // Assuming you have the user ID

  const [applications, setApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchApplications();
    setRefreshing(false);
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.108:8000/api/view/application/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {applications.map((application) => (
        <View key={application.id} style={styles.applicationCard}>
          <Text style={styles.jobTitle}>{application.job.job_title}</Text>
          <Text style={styles.jobDetail}>
            {application.job.job_description}
          </Text>
          <Text style={styles.applicantName}>
            Applicant: {application.applicant.name}
          </Text>
          <Text style={styles.applicantDetail}>
            Email: {application.applicant.email}
          </Text>
          <Text style={styles.applicantDetail}>
            Contact: {application.applicant.contact}
          </Text>
          <Text style={styles.applicantStatus}>
            Status: {application.applicant_status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  applicationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  jobDetail: {
    fontSize: 14,
    color: COLORS.darkGrey,
    marginBottom: 5,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginTop: 10,
  },
  applicantDetail: {
    fontSize: 14,
    color: COLORS.grey,
  },
  applicantStatus: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.green,
    marginTop: 5,
  },
});

export default Application;
