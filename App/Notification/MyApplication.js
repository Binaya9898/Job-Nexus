import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import SERVER from "../../constants/server";
import { UserContext } from "../../constants/UserContext";
import moment from "moment"; // Import moment for date formatting

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { userData } = useContext(UserContext);
  const empId = userData.user.id;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    fetch(`${SERVER.primaryUrl}/application/${empId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data.applications);
        setLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchApplications();
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
                  size={40}
                  color={getIconColor(application.applicant_status)}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.status}>
                {application.applicant_status.charAt(0).toUpperCase() +
                  application.applicant_status.slice(1)}
              </Text>
              <Text style={styles.date}>
                Applied on:{" "}
                {moment(application.created_at).format("MMMM Do YYYY, h:mm a")}
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
      return { backgroundColor: COLORS.warning };
    case "accepted":
      return { backgroundColor: COLORS.complete };
    case "rejected":
      return { backgroundColor: COLORS.danger };
    default:
      return { backgroundColor: COLORS.lightGrey };
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return "hourglass-empty";
    case "accepted":
      return "check-circle";
    case "rejected":
      return "cancel";
    default:
      return "help-outline";
  }
};

const getIconColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    default:
      return "grey";
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
  date: {
    fontSize: 16,
    color: COLORS.grey,
  },
});

export default MyApplications;
