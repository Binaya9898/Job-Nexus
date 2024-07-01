import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
  ScrollView, // Import ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import SERVER from "../../../constants/server";
import { UserContext } from "../../../constants/UserContext";

const Profile = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    contactNumber: "",
    profileImage: require("../../../assets/hero1.jpg"),
    linkedin: "",
    facebook: "",
    details: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `${SERVER.primaryUrl}/checkEmployee/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Employee Data:", data);

        setEmployee({
          name: data.data.user.name || "",
          email: data.data.user.email || "",
          contactNumber: data.data.user.contact || "",
          profileImage: data.data.employee_image
            ? {
                // uri: `${SERVER.imageUrl}/images/employee/profile${data.data.employee_image}`,
                uri: `${SERVER.imageUrl}/images/employee/profile/avatar3.png`,
              }
            : require("../../../assets/hero1.jpg"),
          linkedin: data.data.employee_linkedin_link
            ? `https://${data.data.employee_linkedin_link}`
            : "",
          facebook: data.data.employee_fb_link
            ? `https://${data.data.employee_fb_link}`
            : "",
          details: [
            {
              label: "Work Experience",
              text: data.data.employee_work_experience || "None",
              date: "", // Add the date if available
            },
            {
              label: "Education",
              text: data.data.employee_education || "Not specified",
              date: "", // Add the date if available
            },
            {
              label: "Participation",
              text: data.data.employee_participation || "Not specified",
              date: "", // Add the date if available
            },
            {
              label: "Training",
              text: data.data.employee_training || "Not specified",
              date: "", // Add the date if available
            },
            {
              label: "Description",
              text: data.data.employee_description || "No description provided",
              date: "", // Add the date if available
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false);
        Alert.alert("Error", "Failed to fetch employee details.");
      }
    };

    if (userId) {
      fetchEmployeeData();
    }
  }, [userId]);

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${employee.email}`);
  };

  const handleSocialMediaPress = (url) => {
    Linking.openURL(url);
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", { employee });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007260" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            employee.profileImage.uri
              ? { uri: employee.profileImage.uri }
              : require("../../../assets/hero1.jpg")
          }
          style={styles.profileImage}
        />
        <Text style={styles.name}>{employee.name}</Text>
        <TouchableOpacity
          style={styles.contactContainer}
          onPress={handleEmailPress}
        >
          <Text style={styles.contact}>{employee.email}</Text>
          <Text style={styles.contact}>{employee.contactNumber}</Text>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          {employee.details.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailText}>{detail.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.socialContainer}>
          {employee.linkedin ? (
            <TouchableOpacity
              onPress={() => handleSocialMediaPress(employee.linkedin)}
            >
              <FontAwesome
                name="linkedin"
                size={30}
                color="#0077B5"
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          ) : null}
          {employee.facebook ? (
            <TouchableOpacity
              onPress={() => handleSocialMediaPress(employee.facebook)}
            >
              <FontAwesome
                name="facebook-square"
                size={30}
                color="#4267B2"
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  profileContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  contactContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  contact: {
    fontSize: 16,
    color: "#39B68D",
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 20,
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  detailText: {
    fontSize: 16,
    color: "#666",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#007260",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
