import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import SERVER from "../../constants/server";

// Function to generate a random image URL from Lorem Picsum
const getRandomImage = () => {
  const width = 50;
  const height = 50;
  const randomImageId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/id/${randomImageId}/${width}/${height}`;
};

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(8);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverUrl = SERVER.primaryUrl + "/job-api";
        const response = await axios.get(serverUrl);
        const jobsWithImages = response.data.map((job) => ({
          ...job,
          image: getRandomImage(), // Add random image URL
          isFavorite: false, // Add isFavorite property
        }));
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

  const toggleFavorite = (id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
      )
    );
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.jobDetails}>
        <Text style={styles.title}>{item.job_title}</Text>
        <Text style={styles.company}>{item.job_company_name}</Text>
        <Text style={styles.location}>{item.job_address}</Text>
        <Text style={styles.salary}>{item.salary}</Text>
        <Text style={styles.details}>{item.details}</Text>
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
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
