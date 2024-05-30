import React, { Component, useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JobDetails from "./JobDetails";
import BackButton from "../../constants/BackButton";

export default class Home extends Component {
  state = {
    categories: [
      {
        id: 1,
        name: "Design",
        image: "https://source.unsplash.com/100x100/?design",
      },
      {
        id: 2,
        name: "IT",
        image: "https://source.unsplash.com/100x100/?technology",
      },
      {
        id: 3,
        name: "Marketing",
        image: "https://source.unsplash.com/100x100/?marketing",
      },
      {
        id: 4,
        name: "Volunteering",
        image: "https://source.unsplash.com/100x100/?volunteer",
      },
      {
        id: 5,
        name: "Teaching",
        image: "https://source.unsplash.com/100x100/?teaching",
      },
      {
        id: 6,
        name: "Part Time",
        image: "https://source.unsplash.com/100x100/?parttime",
      },
      {
        id: 7,
        name: "Engineering",
        image: "https://source.unsplash.com/100x100/?engineering",
      },
      {
        id: 8,
        name: "Medical",
        image: "https://source.unsplash.com/100x100/?medical",
      },
      {
        id: 9,
        name: "Video Editing",
        image: "https://source.unsplash.com/100x100/?videoediting",
      },
      {
        id: 10,
        name: "Plumber",
        image: "https://source.unsplash.com/100x100/?plumber",
      },
    ],
    recentJobs: [
      {
        id: 1,
        title: "Software Engineer",
        company: "ABC Company",
        location: "New York, NY",
        description: "Job description for Software Engineer at ABC Company.",
      },
      {
        id: 2,
        title: "Web Developer",
        company: "XYZ Tech",
        location: "San Francisco, CA",
        description: "Job description for Web Developer at XYZ Tech.",
      },
      {
        id: 3,
        title: "Data Analyst",
        company: "PQR Inc.",
        location: "Austin, TX",
        description: "Job description for Data Analyst at PQR Inc.",
      },
      {
        id: 4,
        title: "Marketing Manager",
        company: "LMN Corp.",
        location: "Seattle, WA",
        description: "Job description for Marketing Manager at LMN Corp.",
      },
      {
        id: 5,
        title: "Sales Associate",
        company: "OPQ Retail",
        location: "Los Angeles, CA",
        description: "Job description for Sales Associate at OPQ Retail.",
      },
      {
        id: 6,
        title: "Product Manager",
        company: "GHI Industries",
        location: "Boston, MA",
        description: "Job description for Product Manager at GHI Industries.",
      },
      {
        id: 7,
        title: "Graphic Designer",
        company: "JKL Media",
        location: "Chicago, IL",
        description: "Job description for Graphic Designer at JKL Media.",
      },
      {
        id: 8,
        title: "Customer Service Rep",
        company: "MNO Services",
        location: "Miami, FL",
        description:
          "Job description for Customer Service Rep at MNO Services.",
      },
      {
        id: 9,
        title: "HR Specialist",
        company: "EFG Solutions",
        location: "Dallas, TX",
        description: "Job description for HR Specialist at EFG Solutions.",
      },
      {
        id: 10,
        title: "IT Support",
        company: "UVW Corp.",
        location: "Denver, CO",
        description: "Job description for IT Support at UVW Corp.",
      },
    ],
    selectedCategory: null,
  };

  handleCategoryPress = (category) => {
    this.setState({ selectedCategory: category });
  };

  filterJobsByCategory = (category) => {
    return this.state.recentJobs.filter((job) =>
      job.title.toLowerCase().includes(category.toLowerCase())
    );
  };

  render() {
    const { navigation } = this.props;
    const { categories, recentJobs, selectedCategory } = this.state;
    const jobsToShow =
      selectedCategory === null
        ? recentJobs
        : this.filterJobsByCategory(selectedCategory);

    return (
      <ScrollView style={styles.container}>
        <View>
          <Image
            source={{
              uri: "https://source.unsplash.com/1024x400/?job,office",
            }}
            style={styles.banner}
          />
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.category}
                onPress={() => this.handleCategoryPress(category.name)}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.categoryButtons}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => this.setState({ selectedCategory: null })}
          >
            <Text style={styles.categoryButtonText}>Most Recent</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `${selectedCategory} Jobs` : "Most Recent Jobs"}
          </Text>
          {jobsToShow.map((job) => (
            <View key={job.id} style={styles.jobContainer}>
              <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
                <Text style={styles.jobLocation}>{job.location}</Text>
              </View>
              <View style={styles.jobActions}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate("JobDetails", { job })}
                >
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={24} color="#39B68D" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  banner: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  content: {
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
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  category: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: "#666666",
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#39B68D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  jobContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobDetails: {
    flex: 1,
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
  jobActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#007260",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  viewButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  favoriteButton: {
    padding: 5,
  },
});
