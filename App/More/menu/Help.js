import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Help = () => {
  const profile = {
    name: "John Doe",
    jobTitle: "Software Engineer",
    company: "ABC Company",
    email: "john.doe@example.com",
    bio: "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
    profileImage: "https://source.unsplash.com/100x100/?person",
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.jobTitle}>{profile.jobTitle}</Text>
        <Text style={styles.company}>{profile.company}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    color: "#999",
    marginBottom: 15,
  },
  email: {
    fontSize: 16,
    color: "#39B68D",
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default Help;
