import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SERVER from "../../constants/server";

const windowWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [header, setHeader] = useState("Popular Jobs");
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const images = [
    "https://img.freepik.com/premium-psd/business-we-are-hiring-employee-job-web-banner-youtube-thumbnail-template_364164-429.jpg",
    "https://static.vecteezy.com/system/resources/previews/011/779/507/original/modern-job-hiring-cover-banner-design-template-for-company-corporate-business-vector.jpg",
    "https://scontent.fpkr1-1.fna.fbcdn.net/v/t39.30808-6/379736870_10211164406064053_8252452471977935330_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sFZC3v84beMQ7kNvgF3HL1U&_nc_ht=scontent.fpkr1-1.fna&oh=00_AYDKtfEZIZbfkOhAWXd6CPBMai2XaqAKlhntye6075Oegw&oe=66853F67",
    "https://scontent.fpkr1-1.fna.fbcdn.net/v/t39.30808-6/306522810_772068317476400_8046709574095023760_n.png?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=TRqCXUaVhdYQ7kNvgEXiCsr&_nc_ht=scontent.fpkr1-1.fna&oh=00_AYA4f-988q4GfTF-tiPQEYf7jhtlZrZN7spJuY52rKhuZQ&oe=66854AB9",
    "https://scontent.fpkr1-1.fna.fbcdn.net/v/t39.30808-6/278169784_655866435763256_8112774658174511941_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=SxVAEoHLjGwQ7kNvgHc5P-Y&_nc_ht=scontent.fpkr1-1.fna&oh=00_AYDZc5jBvmdvh-3FjiB7f8IlWMS-Q0rTt1b4U2vpcxMPqg&oe=6685382C",
  ];

  useEffect(() => {
    fetchCategories();
    fetchJobs();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex]);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    await fetchJobs();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.bannerContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.banner} />
          )}
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
    marginTop: 10,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bannerContainer: {
    height: 250,
  },
  banner: {
    width: windowWidth,
    height: 250,
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
