import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default class Home extends Component {
  state = {
    recentJobs: [
      {
        id: 1,
        title: "Software Engineer",
        company: "ABC Company",
        location: "New York, NY",
      },
      {
        id: 2,
        title: "Web Developer",
        company: "XYZ Tech",
        location: "San Francisco, CA",
      },
      {
        id: 3,
        title: "Data Analyst",
        company: "PQR Inc.",
        location: "Austin, TX",
      },
      {
        id: 4,
        title: "Marketing Manager",
        company: "LMN Corp.",
        location: "Seattle, WA",
      },
      {
        id: 5,
        title: "Sales Associate",
        company: "OPQ Retail",
        location: "Los Angeles, CA",
      },
      {
        id: 6,
        title: "Product Manager",
        company: "GHI Industries",
        location: "Boston, MA",
      },
      {
        id: 7,
        title: "Graphic Designer",
        company: "JKL Media",
        location: "Chicago, IL",
      },
      {
        id: 8,
        title: "Customer Service Rep",
        company: "MNO Services",
        location: "Miami, FL",
      },
      {
        id: 9,
        title: "HR Specialist",
        company: "EFG Solutions",
        location: "Dallas, TX",
      },
      {
        id: 10,
        title: "IT Support",
        company: "UVW Corp.",
        location: "Denver, CO",
      },
    ],
  };

  render() {
    const { navigation } = this.props;
    const { recentJobs } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/6583/6583566.png?semt=ais_hybrid",
            }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Job Portal</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Explore job opportunities and apply for your dream job.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Jobs")}
          >
            <Text style={styles.buttonText}>Explore Jobs</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryButtons}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate("MostRelevant")}
          >
            <Text style={styles.categoryButtonText}>Most Relevant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate("MostRecent")}
          >
            <Text style={styles.categoryButtonText}>Most Recent</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Most Recent Jobs</Text>
          {recentJobs.map((job) => (
            <View key={job.id} style={styles.jobContainer}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <Text style={styles.jobLocation}>{job.location}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#007260", // Primary color
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // White color for text
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333333", // Dark text color
  },
  subtitle: {
    fontSize: 16,
    color: "#666666", // Medium text color
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#39B68D", // Secondary color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  categoryButton: {
    backgroundColor: "#39B68D", // Secondary color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  categoryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  jobContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  jobCompany: {
    fontSize: 16,
    color: "#666666",
  },
  jobLocation: {
    fontSize: 14,
    color: "#999999",
  },
});
