import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import userImage from "../../assets/hero1.jpg"; // Replace with your user image
import { UserContext } from "../../constants/UserContext";
import SERVER from "../../constants/server";
const Home = () => {
  const { userData } = useContext(UserContext);
  const userId = userData.user.id; // Assuming you have the user ID

  const [userInfo, setUserInfo] = useState({
    name: userData.user.name,
    address: userData.user.address,
    companyName: "Example Company", // Default value, replace with actual data
    email: userData.user.email,
    phone: userData.user.contact,
    status: "Active", // Default value, replace with actual data
  });
  const [jobData, setJobData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobData();
    fetchUserInfo(); // Fetch user info on component mount
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchJobData(); // Refresh job data
    fetchUserInfo(); // Refresh user info
    setRefreshing(false);
  };

  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/jobdetail/mobile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }
      const data = await response.json();
      // console.log("Job API Response:", data);
      setJobData(data);
      console.log("Auna parni data " + jobData.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/employer/mobile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      console.log("User API Response:", data);

      // Update userInfo state with fetched data
      setUserInfo({
        name: data.user.name,
        address: data.employer_address,
        companyName: data.employer_company_name,
        email: data.user.email,
        phone: data.user.contact,
        status: data.employer_status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Functions to calculate job counts based on status from jobData
  const getTotalJobs = () => jobData.length;
  const getPendingJobs = () =>
    jobData.filter((job) => job.job_status === "pending").length;
  const getRejectedJobs = () =>
    jobData.filter((job) => job.job_status === "rejected").length;
  const getVerifiedJobs = () =>
    jobData.filter((job) => job.job_status === "verified").length;

  // Statistics data with dynamic values
  const statistics = [
    {
      title: "Total Jobs Posted",
      value: getTotalJobs(),
      icon: "briefcase-outline",
      color: COLORS.blue,
    },
    {
      title: "Pending Jobs",
      value: getPendingJobs(),
      icon: "time-outline",
      color: COLORS.primary,
    },
    {
      title: "Rejected Jobs",
      value: getRejectedJobs(),
      icon: "close-circle-outline",
      color: COLORS.red,
    },
    {
      title: "Verified Jobs",
      value: getVerifiedJobs(),
      icon: "checkmark-circle-outline",
      color: COLORS.green,
    },
    {
      title: "Total Applicants",
      value: 300, // Replace with actual data from jobData
      icon: "people-outline",
      color: COLORS.purple,
    },
    {
      title: "Accepted Applicants",
      value: 150, // Replace with actual data from jobData
      icon: "person-add-outline",
      color: COLORS.teal,
    },
    {
      title: "Rejected Applicants",
      value: 50, // Replace with actual data from jobData
      icon: "person-remove-outline",
      color: COLORS.brown,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Banner Section */}
      <View style={{ backgroundColor: COLORS.secondary }}>
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
        <View style={styles.banner}>
          <Image source={userImage} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userDetail}>{userInfo.address}</Text>
            <Text style={styles.userDetail}>{userInfo.companyName}</Text>
            <Text style={styles.userDetail}>{userInfo.email}</Text>
            <Text style={styles.userDetail}>{userInfo.phone}</Text>
            <Text style={styles.userDetail}>{userInfo.status}</Text>
          </View>
        </View>
      </View>
      {/* Statistics Grid */}
      <View style={styles.grid}>
        {statistics.map((stat, index) => (
          <View
            key={index}
            style={[styles.gridItem, { backgroundColor: stat.color }]}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={stat.icon} size={40} color={COLORS.white} />
            </View>
            <Text style={styles.gridTitle}>{stat.title}</Text>
            <Text style={styles.gridValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  banner: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 45,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userDetail: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 2,
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
  grid: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 10,
  },
  gridTitle: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  gridValue: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
