import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import COLORS from "../../constants/colors";
import { UserContext } from "../../constants/UserContext";
import SERVER from "../../constants/server";

const Home = () => {
  const { userData, logout } = useContext(UserContext); // Assuming logout function is provided
  const userId = userData.user.id; // Assuming you have the user ID
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    name: userData.user.name,
    address: userData.user.address,
    companyName: "Example Company", // Default value, replace with actual data
    email: userData.user.email,
    phone: userData.user.contact,
    status: "Active",
    image: "", // Default value, replace with actual data
  });
  const [jobData, setJobData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobData();
    fetchUserInfo(); // Fetch user info on component mount
    fetchApplicationData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchJobData(); // Refresh job data
    fetchUserInfo(); // Refresh user info
    fetchApplicationData();
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
      setJobData(data);
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
      // Update userInfo state with fetched data
      setUserInfo({
        name: data.user.name,
        address: data.employer_address,
        companyName: data.employer_company_name,
        email: data.user.email,
        phone: data.user.contact,
        status: data.employer_status,
        image: data.employer_image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplicationData = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/application/list/mobile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch application data");
      }
      const data = await response.json();
      setApplicationData(data);
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

  // Functions to calculate application counts based on status from applicationData
  const getTotalApplications = () => applicationData.length;
  const getPendingApplications = () =>
    applicationData.filter(
      (application) => application.applicant_status === "pending"
    ).length;
  const getRejectedApplications = () =>
    applicationData.filter(
      (application) => application.applicant_status === "rejected"
    ).length;
  const getVerifiedApplications = () =>
    applicationData.filter(
      (application) => application.applicant_status === "accepted"
    ).length;

  // Statistics data with dynamic values
  const statistics = [
    {
      title: "Total Jobs Posted",
      value: getTotalJobs(),
      icon: "briefcase-outline",
      color: COLORS.blue,
      navigateTo: "TotalJob",
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
      title: "Total Applications",
      value: getTotalApplications(),
      icon: "people-outline",
      color: COLORS.purple,
      navigateTo: "TotalApplication", // Navigation target screen name
    },
    {
      title: "Pending Applications",
      value: getPendingApplications(),
      icon: "time-outline",
      color: COLORS.orange,
    },
    {
      title: "Rejected Applications",
      value: getRejectedApplications(),
      icon: "close-circle-outline",
      color: COLORS.brown,
    },
    {
      title: "Verified Applications",
      value: getVerifiedApplications(),
      icon: "checkmark-circle-outline",
      color: COLORS.teal,
    },
  ];

  // Handle back button press
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Logout",
          "Do you want to logout?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                // logout(); // Call the logout function
                navigation.navigate("Welcome"); // Navigate to Welcome screen
              },
            },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  // Function to handle press on statistic items
  const handleStatisticPress = (navigateTo) => {
    switch (navigateTo) {
      case "TotalJob":
        navigation.navigate("TotalJob"); // Navigate to TotalJob
        break;
      case "TotalApplication":
        navigation.navigate("TotalApplication"); // Navigate to TotalApplication
        break;
      default:
        break;
    }
  };

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
          <Image
            source={{
              uri: `${SERVER.imageUrl}/images/employer/profile/${userInfo.image}`,
            }}
            style={styles.userImage}
          />
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
          <TouchableOpacity
            key={index}
            style={[styles.gridItem, { backgroundColor: stat.color }]}
            onPress={() => handleStatisticPress(stat.navigateTo)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={stat.icon} size={40} color={COLORS.white} />
            </View>
            <Text style={styles.gridTitle}>{stat.title}</Text>
            <Text style={styles.gridValue}>{stat.value}</Text>
          </TouchableOpacity>
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
