import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SERVER from "../../constants/server";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [header, setHeader] = useState("Popular Jobs");

  useEffect(() => {
    fetchCategories();
    fetchJobs();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(SERVER.primaryUrl + "/category");
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchJobs = async (categoryTitle = "") => {
    setLoadingJobs(true);
    const endpoint = categoryTitle
      ? SERVER.primaryUrl + `/jobs?job_category=${categoryTitle}`
      : SERVER.primaryUrl + "/job-api";

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setJobs(data);
      setLoadingJobs(false);
    } catch (error) {
      setError(error.message);
      setLoadingJobs(false);
    }
  };

  const handleCategoryPress = (category) => {
    setHeader(category.category_title + " Jobs");
    fetchJobs(category.category_title);
  };
  // const handlePopular = () => {
  //   setHeader("Popular Jobs");
  //   // fetchJobs();
  // };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://imagehost9.online-image-editor.com/oie_upload/images/301715538Hi5XVX/jvPeCLteislY.jpg",
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
              onPress={() => handleCategoryPress(category)}
            >
              <Image
                source={{
                  uri:
                    SERVER.imageUrl +
                    "/images/category/" +
                    category.category_image,
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.category_title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={styles.categoryButton}
          // onPress={handlePopular()}
        >
          <Text style={styles.categoryButtonText}>Most Recent</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>{header}</Text>
        {loadingJobs ? (
          <ActivityIndicator size="large" color="#39B68D" />
        ) : (
          jobs.map((job) => (
            <View key={job.id} style={styles.jobContainer}>
              <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{job.job_title}</Text>
                <Text style={styles.jobCompany}>{job.job_company_name}</Text>
                <Text style={styles.jobLocation}>{job.job_address}</Text>
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
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

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
    color: "#ffffff",
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
    color: "#333333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#39B68D",
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
