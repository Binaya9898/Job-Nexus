import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SERVER from "../../constants/server";

export default function Jobs({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(8);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const serverUrl = `${SERVER.primaryUrl}/job/all`;
      const response = await fetch(serverUrl);

      // Log the response text to see what's being returned
      const responseText = await response.text();
      // console.log("Response Text:", responseText);

      // Try to parse the response text as JSON
      const data = JSON.parse(responseText);
      const jobsWithImages = data.map((job) => ({
        ...job,
        image: job.employer ? job.employer.employer_image : "",
        isFavorite: false, // Add isFavorite property
        empName: job.employer
          ? job.employer.employer_first_name
          : "Company Representative",
        empID: job.employer ? job.employer.id : "Noid",
      }));

      setJobs(jobsWithImages);
      setAllJobsLoaded(jobsWithImages.length <= visibleJobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [visibleJobs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMoreJobs = () => {
    if (visibleJobs + 3 >= jobs.length) {
      setVisibleJobs(jobs.length);
      setAllJobsLoaded(true);
    } else {
      setVisibleJobs(visibleJobs + 3);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const toggleFavorite = async (id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
      )
    );
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/wishlist/save/${id}/${2}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to wishlist");
      }
      Alert.alert("Success", "Job added to favorites"); // Use correct method to show success

      return await response.json();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDetail = (job) => {
    console.log(job);
    navigation.navigate("Jobdetail", { job });
    // navigation.navigate("JobDetail", { job });
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Image
        source={{
          uri: `${SERVER.imageUrl}/images/employer/profile/${item.image}`,
        }}
        style={styles.image}
      />
      <View style={styles.jobDetails}>
        <Text style={styles.title}>{item.job_title}</Text>
        <Text style={styles.company}>{item.job_company_name}</Text>
        <Text style={styles.location}>{item.job_address}</Text>
        <Text style={styles.salary}>
          {item.job_min_salary} - {item.job_max_salary}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <FontAwesome
            name={item.isFavorite ? "heart" : "heart-o"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handleDetail(item)}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Featured Jobs</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007260" />
      ) : (
        <FlatList
          data={jobs.slice(0, visibleJobs)}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            !allJobsLoaded ? (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMoreJobs}
              >
                <Text style={styles.loadMoreButtonText}>Load More</Text>
              </TouchableOpacity>
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
    backgroundColor: "#f9f9f9",
  },
  header: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007260",
    textAlign: "center",
  },
  jobItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  jobDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  company: {
    color: "#555",
    marginBottom: 5,
  },
  location: {
    color: "#555",
  },
  salary: {
    marginTop: 5,
    color: "#007bff",
  },
  details: {
    marginTop: 5,
    color: "#666",
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    marginBottom: 10,
  },
  loadMoreButton: {
    backgroundColor: "#007260",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  loadMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#007260",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
