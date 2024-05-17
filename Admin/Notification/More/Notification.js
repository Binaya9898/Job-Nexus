import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          subject: "Software Engineer Application",
          position: "Software Engineer",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          subject: "Web Developer Application",
          position: "Web Developer",
        },
        // Add more sample applications as needed
      ],
    };
  }

  renderApplications() {
    return this.state.applications.map((application) => (
      <View key={application.id} style={styles.application}>
        <Text style={styles.applicationText}>{application.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.viewResume(application)}
        >
          <Text style={styles.buttonText}>View Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.shortlist(application)}
        >
          <Text style={styles.buttonText}>Shortlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.reject(application)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    ));
  }

  viewResume(application) {
    // Code to view the resume
  }

  shortlist(application) {
    // Code to shortlist the candidate
  }

  reject(application) {
    // Code to reject the candidate
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Applications from employees</Text>
        </View>
        <View style={styles.applications}>
          <Text style={styles.applicationsTitle}>Applications</Text>
          {this.renderApplications()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007260", // Primary color
  },
  applications: {
    marginTop: 20,
  },
  applicationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007260", // Primary color
  },
  application: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  applicationText: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#39B68D", // Secondary color
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
