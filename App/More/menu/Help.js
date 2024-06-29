import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming FontAwesome for social media icons

const EmployeeProfile = () => {
  const navigation = useNavigation();
  const window = Dimensions.get('window');

  const employee = {
    name: "John Doe",
    company: "ABC Company",
    email: "john.doe@example.com",
    contact: "+1 123-456-7890",
    profileImage: "https://source.unsplash.com/100x100/?person",
    jobExperiences: [
      { title: "Software Engineer", company: "Tech Solutions Inc", duration: "2018 - Present" },
      { title: "Junior Developer", company: "DevTeam LLC", duration: "2016 - 2018" },
    ],
    education: "Bachelor's in Computer Science",
    participation: [
      "Active member of local tech meetup group",
      "Organizer of hackathons",
    ],
    training: [
      "Certified in Agile methodologies",
      "Advanced JavaScript training",
    ],
    linkedin: "https://www.linkedin.com/johndoe",
    facebook: "https://www.facebook.com/johndoe",
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${employee.email}`);
  };

  const handleSocialMediaPress = (url) => {
    Linking.openURL(url);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { employee });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: employee.profileImage }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.company}>{employee.company}</Text>
        <TouchableOpacity style={styles.emailContainer} onPress={handleEmailPress}>
          <Text style={styles.email}>{employee.email}</Text>
        </TouchableOpacity>
        <Text style={styles.contact}>{employee.contact}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {employee.jobExperiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDuration}>{exp.duration}</Text>
            </View>
          ))}
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.detailText}>{employee.education}</Text>
          <Text style={styles.sectionTitle}>Participation</Text>
          {employee.participation.map((item, index) => (
            <Text key={index} style={styles.detailText}>{item}</Text>
          ))}
          <Text style={styles.sectionTitle}>Training</Text>
          {employee.training.map((item, index) => (
            <Text key={index} style={styles.detailText}>{item}</Text>
          ))}
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => handleSocialMediaPress(employee.linkedin)}>
            <FontAwesome name="linkedin" size={30} color="#0077B5" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialMediaPress(employee.facebook)}>
            <FontAwesome name="facebook-square" size={30} color="#4267B2" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  profileContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
    maxWidth: 500, // Max width for the profile container
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  company: {
    fontSize: 16,
    color: "#999",
    marginBottom: 5,
    textAlign: "center",
  },
  emailContainer: {
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#39B68D",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  contact: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  experienceItem: {
    marginBottom: 15,
    alignItems: "center",
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  experienceCompany: {
    fontSize: 14,
    color: "#666",
  },
  experienceDuration: {
    fontSize: 14,
    color: "#999",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#007260",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmployeeProfile;
