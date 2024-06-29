import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import icon set
import COLORS from "../../constants/colors";
import SERVER from "../../constants/server";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    fetch(`${SERVER.primaryUrl}/application/${2}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data.applications);
        setLoading(false);
        setIsRefreshing(false); // Reset refreshing state after fetch
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
        setIsRefreshing(false); // Reset refreshing state on error
      });
  };

  const handleRefresh = () => {
    setIsRefreshing(true); // Set refreshing state to true
    fetchApplications(); // Fetch data again
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.header}>My Applications</Text>

          {applications.map((application) => (
            <View
              key={application.id}
              style={[
                styles.applicationContainer,
                getStatusStyle(application.applicant_status),
              ]}
            >
              <View style={styles.applicationHeader}>
                <Text style={styles.jobTitle}>
                  {application.job ? application.job.job_title : "Unknown Job"}
                </Text>
                <Icon
                  name={getStatusIcon(application.applicant_status)}
                  size={80} // Set icon size to 80
                  color={getIconColor(application.applicant_status)}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.status}>{application.applicant_status}</Text>
              <Text style={styles.description}>
                {application.applicant_description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return { backgroundColor: COLORS.yellowLight };
    case "accepted":
      return { backgroundColor: COLORS.greenLight };
    case "rejected":
      return { backgroundColor: COLORS.redLight };
    default:
      return { backgroundColor: COLORS.lightGrey }; // Default background color
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return "hourglass-empty"; // Pending icon
    case "accepted":
      return "check-circle"; // Accepted icon
    case "rejected":
      return "cancel"; // Rejected icon
    default:
      return "help-outline"; // Default icon
  }
};

const getIconColor = (status) => {
  switch (status) {
    case "pending":
      return "purple"; // Yellow icon for pending
    case "accepted":
      return "green"; // Green icon for accepted
    case "rejected":
      return "red"; // Red icon for rejected
    default:
      return COLORS.grey; // Default icon color
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 40,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  applicationContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
  },
  applicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 10,
  },
  icon: {
    alignSelf: "flex-end",
  },
  status: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.grey,
  },
});

export default MyApplications;
