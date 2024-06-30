import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const EmployerProfile = () => {
  const navigation = useNavigation();

  const employee = {
    name: "Akriti CHapgain",
    email: "john.doe@example.com",
    contactNumber: "+1234567890",
    profileImage: require("../../assets/hero1.jpg"),
    linkedin: "https://www.linkedin.com/johndoe",
    facebook: "https://www.facebook.com/johndoe",
    details: [
      { label: "Work Experience", text: "5 years", date: "2017 - Present" },
      {
        label: "Education",
        text: "Bachelor's in Computer Science",
        date: "2013 - 2017",
      },
      {
        label: "Participation",
        text: "Active member of tech community",
        date: "Ongoing",
      },
      {
        label: "Training",
        text: "Certified in Agile methodologies",
        date: "2020",
      },
      {
        label: "sjjdkadjka",
        text: "Certified in Agile methodologies",
        date: "2020",
      },
    ],
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${employee.email}`);
  };

  const handleSocialMediaPress = (url) => {
    Linking.openURL(url);
  };

  const handleAcceptProfile = () => {
    // Add your accept profile functionality here
    console.log("Accept Candidate");
  };

  const handleRejectProfile = () => {
    // Add your reject profile functionality here
    console.log("Reject Candidate");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="#007260" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image source={employee.profileImage} style={styles.profileImage} />
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
              <Text style={styles.dateText}>{detail.date}</Text>
            </View>
          ))}
        </View>
        <View style={styles.socialContainer}>
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAcceptProfile}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D9534F" }]}
            onPress={handleRejectProfile}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#007260",
    marginLeft: 5,
  },
  profileContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
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
    textAlign: "center",
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
    textAlign: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007260",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmployerProfile;