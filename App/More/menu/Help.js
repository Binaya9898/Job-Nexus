import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';

const EmployeeProfile = () => {
  const navigation = useNavigation();

  const employee = {
    name: "John Doe",
    jobTitle: "Software Engineer",
    company: "ABC Company",
    email: "john.doe@example.com",
    bio:
      "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
    profileImage: "https://source.unsplash.com/100x100/?person",
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${employee.email}`);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { employee });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: employee.profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.jobTitle}>{employee.jobTitle}</Text>
        <Text style={styles.company}>{employee.company}</Text>
        <TouchableOpacity style={styles.emailContainer} onPress={handleEmailPress}>
          <Text style={styles.email}>{employee.email}</Text>
        </TouchableOpacity>
        <Text style={styles.bio}>{employee.bio}</Text>
        <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
          <Text style={styles.buttonText}>Contact Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
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
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: '90%',
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
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  company: {
    fontSize: 16,
    color: "#999",
    marginBottom: 15,
    textAlign: "center",
  },
  emailContainer: {
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    color: "#39B68D",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  bio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
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
  editButton: {
    backgroundColor: "#39B68D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmployeeProfile;
