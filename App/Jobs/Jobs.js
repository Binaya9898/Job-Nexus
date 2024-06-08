import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SERVER from "../../constants/server";

export default function Jobs({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(8);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverUrl = `${SERVER.primaryUrl}/job/all`;
        const response = await fetch(serverUrl);

        // Log the response text to see what's being returned
        const responseText = await response.text();
        console.log("Response Text:", responseText);

        // Try to parse the response text as JSON
        const data = JSON.parse(responseText);
        const jobsWithImages = data.map((job) => {
          return {
            ...job,
            image: job.employer ? job.employer.employer_image : "", // Use category image URL if available
            isFavorite: false, // Add isFavorite property
            empName: job.employer
              ? job.employer.employer_first_name
              : "Company Representative",
            empID: job.employer ? job.employer.id : "Noid",
          };
        });

        setJobs(jobsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const loadMoreJobs = () => {
    if (visibleJobs + 8 >= jobs.length) {
      setVisibleJobs(jobs.length);
      setAllJobsLoaded(true);
    } else {
      setVisibleJobs(visibleJobs + 8);
    }
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
    navigation.navigate("Jobdetail", { job });
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
        <Text style={styles.details}>{item.job_description}</Text>
      </View>

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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Featured Jobs</Text>
      </View>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  headerTitle: {
    paddingBottom: 25,
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  jobItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  jobDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
  favoriteButton: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
  },
  loadMoreButton: {
    backgroundColor: "#39B68D",
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
    marginTop: 5,
    backgroundColor: "#39B68D",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  detailsButtonText: {
    color: "#fff",
  },
});
