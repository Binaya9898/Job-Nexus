import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

export default class Home extends Component {
  render() {
    const { navigation } = this.props;

    // Dummy data for job vacancies
    const jobVacancies = [
      { id: 1, title: "Software Engineer", company: "XYZ Corp", location: "New York, NY" },
      { id: 2, title: "Product Manager", company: "ABC Inc", location: "San Francisco, CA" },
      { id: 3, title: "Data Scientist", company: "DataWorks", location: "Chicago, IL" },
      { id: 4, title: "UX Designer", company: "Creative Minds", location: "Austin, TX" },
      { id: 5, title: "Marketing Specialist", company: "MarketGuru", location: "Boston, MA" },
      { id: 6, title: "HR Manager", company: "HR Solutions", location: "Seattle, WA" },
      { id: 7, title: "Sales Executive", company: "SalesForce", location: "Denver, CO" },
      { id: 8, title: "Business Analyst", company: "BizAnalytica", location: "Miami, FL" },
      { id: 9, title: "DevOps Engineer", company: "Techies", location: "Houston, TX" },
      { id: 10, title: "Customer Support", company: "Supportly", location: "Orlando, FL" },
    ];

    // Dummy statistics data
    const stats = {
      jobOpenings: jobVacancies.length,
      applicationsReceived: 120, 
      totalJobsPosted: 50, 
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/hero1.jpg')} style={styles.logo} />
          <Text style={styles.headerText}>Job Portal</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={require('../../assets/banner.jpg')} style={styles.banner} />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.jobOpenings}</Text>
              <Text style={styles.statLabel}>Job Openings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.applicationsReceived}</Text>
              <Text style={styles.statLabel}>Applications Received</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalJobsPosted}</Text>
              <Text style={styles.statLabel}>Total Jobs Posted</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PostJob")}
          >
            <Text style={styles.buttonText}>Post Jobs</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Job Vacancies</Text>
          {jobVacancies.map((job) => (
            <View key={job.id} style={styles.jobContainer}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <Text style={styles.jobLocation}>{job.location}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate("JobDetail", { jobId: job.id })}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#007260",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007260",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  button: {
    backgroundColor: "#39B68D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  jobContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007260",
  },
  jobCompany: {
    fontSize: 16,
    color: "#666666",
  },
  jobLocation: {
    fontSize: 14,
    color: "#999999",
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#007260",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  detailsButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
