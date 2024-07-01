import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { UserContext } from "../../constants/UserContext";
import SERVER from "../../constants/server";

// Placeholder image for applicants
const applicantImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s";

const Application = ({ navigation }) => {
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
        `${SERVER.primaryUrl}/view/application/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
      console.log("application id tanni " + applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCV = (applicantId, id) => {
    // Handle view CV action, you might navigate to another screen or open a link
    console.log(`View CV for applicant ID: ${applicantId}`);
    navigation.navigate("EmployerProfile", { applicantId, id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { label: "Pending", color: COLORS.orange };
      case "accepted":
        return { label: "Accepted", color: COLORS.green };
      case "rejected":
        return { label: "Rejected", color: COLORS.red };
      default:
        return { label: "Unknown", color: COLORS.grey };
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.brandText}>JobNexus</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={COLORS.white}
          />
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.white}
          />
          <Ionicons
            name="ellipsis-vertical-outline"
            size={24}
            color={COLORS.white}
          />
        </View>
      </View>
      {applications.map((application) => {
        const statusBadge = getStatusBadge(application.applicant_status);
        return (
          <View key={application.id} style={styles.applicationCard}>
            <Image
              source={{ uri: applicantImage }}
              style={styles.applicantImage}
            />
            <View style={styles.applicantInfo}>
              <Text style={styles.applicantName}>
                {application.applicant.name}
              </Text>
              <Text style={styles.jobTitle}>{application.job.job_title}</Text>
              <Text style={styles.jobDetail}>
                {application.job.job_description}
              </Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusBadge.color },
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {statusBadge.label}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.viewCVButton}
                  onPress={() =>
                    handleViewCV(application.applicant.id, application.id)
                  }
                >
                  <Text style={styles.viewCVButtonText}>View CV</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    padding: 0,
    marginTop: 30,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  brandText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
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
    flexDirection: "row",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  applicantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    color: COLORS.darkGrey,
  },
  jobDetail: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "bold",
  },
  viewCVButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  viewCVButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Application;
